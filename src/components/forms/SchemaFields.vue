<template>
  <ValidationObserver ref="validator" mode="eager" v-slot="{ invalid }">
    <ValidationProvider
      v-slot="{ errors }"
      v-for="(item, key) in data"
      :key="key"
      :rules="{ required: attributes[key].required }"
      :name="attributes[key].title">
        <label>{{attributes[key].title}}</label>
        <b-form-group v-if="attributes[key].enum">
          <b-form-radio-group v-model="data[key]">
            <b-form-radio v-for="item in attributes[key].enum"
              :key="item"
              :value="item">
              {{ item }}
            </b-form-radio>
          </b-form-radio-group>
        </b-form-group>
        <datetime
          v-else-if="attributes[key].format && attributes[key].format.includes('date')"
          :auto="true"
          :format="format(attributes[key].format)"
          :type="attributes[key].format.replace('-', '')"
          input-class="form-control"
          v-model="data[key]" />
        <b-form-textarea
          v-else-if="attributes[key].inputType === 'textarea'"
          class="form-control word-break" spellcheck="false"
          v-model="data[key]"
          :name="attributes[key].title"
          :state="!data[key] ? null : !errors[0]"
          size="sm" rows="3" />
        <b-form-input
          v-else
          class="form-control"
          size="sm"
          :type="attributes[key].type | typed"
          :value="data[key]" @input="value => format(key, value)"
          :name="attributes[key].title"
          :state="!data[key] ? null : !errors[0]" />
        <b-form-invalid-feedback>
          {{ errors[0] }}
        </b-form-invalid-feedback>
    </ValidationProvider>
    <b-button @click="submit" :disabled="invalid" variant="primary">
      Send
    </b-button>
  </ValidationObserver>
</template>

<script>
import DateFormatMixin from '@/mixins/date-format'
import { DATA_SEND } from '@/constants/inbox'
import { extract } from '@/helpers/NameModifier'
import Verida from '@verida/datastore'

import { createNamespacedHelpers } from 'vuex'
const {
  mapState: mapSystemState,
  mapMutations: mapSystemMutations
} = createNamespacedHelpers('system')

export default {
  name: 'SchemaFields',
  filters: {
    typed (str) {
      if (str === 'string') return 'text'
      if (str === 'number') return 'number'
      return 'text'
    }
  },
  props: [
    'data',
    'attributes',
    'entity'
  ],
  mixins: [
    DateFormatMixin
  ],
  computed: {
    ...mapSystemState([
      'recipient'
    ])
  },
  methods: {
    ...mapSystemMutations([
      'setProcessing'
    ]),
    async submit () {
      this.setProcessing(true)
      const message = []

      if (this.entity.properties.didJwtVc) {
        await this.createCredential()
      }

      const store = await window.veridaApp.openDatastore(this.entity.path)
      const payload = {
        name: extract(this.data, this.entity.schema),
        ...this.data
      }

      message.push(payload)
      const saved = await store.save(payload)

      if (!saved) {
        this.setProcessing(false)
        return false
      }

      await this.sendInbox(message, payload.name)
    },
    format (key, value) {
      this.data[key] = this.attributes[key].type === 'number' ? Number(value) : value
    },
    async sendInbox (message, name) {
      const { outbox } = window.veridaApp

      const inboxType = DATA_SEND
      const outboxItem = { data: message }
      const text = `Sending you ${this.entity.title} called "${name}"`

      try {
        await outbox.send(this.recipient, inboxType, outboxItem, text, {})
        this.$emit('reset')
        this.setProcessing(false)

        this.$bvToast.toast(`Created ${this.entity.title} is sent to ${this.recipient}`, {
          title: 'Inbox sent',
          autoHideDelay: 3000,
          variant: 'success'
        })
      } catch (e) {
        this.setProcessing(false)
        console.info(e)
        this.$bvToast.toast(`An error occurred, when sending ${this.entity.title}`, {
          title: 'Inbox hasn\'t been sent',
          autoHideDelay: 3000,
          variant: 'danger'
        })
      }
    },
    async createCredential () {
      const now = new Date()
      const credential = {
        "@context": [
            "https://www.w3.org/2018/credentials/v1",
            "https://www.w3.org/2018/credentials/examples/v1"
        ],
        "id": this.entity.path,
        "type": ["VerifiableCredential"],
        "issuer": window.veridaApp.user.did,
        "issuanceDate": now.toISOString(),
        "credentialSubject": {
            "id": this.recipient,
            ...this.data
        }
      };

      const issuer = await Verida.Helpers.credentials.createIssuer(window.veridaApp.user)
      this.data.didJwtVc = await Verida.Helpers.credentials.createVerifiableCredential(credential, issuer)
    }
  }
}
</script>
