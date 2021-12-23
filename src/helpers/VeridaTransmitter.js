// import { veridaVaultLogin } from '@verida/vault-auth-client'
import Verida from '@verida/datastore'
import store from 'store'
import ProfileManager from './ProfileManager'
import InboxManager from './InboxManager'

const {
  VUE_APP_LOGO_URL,
  VUE_APP_LOGIN_URI,
  VUE_APP_SERVER_URI,
  VUE_APP_VERIDA_APP_NAME,
  VUE_APP_VERIDA_ENVIRONMENT,
  VUE_APP_VERIDA_USER_SESSION
} = process.env

const CHAIN = 'ethr'
const callbacks = {}

/**
 * Connect the user to their Verida Datastore Application
 *
 *
 * @param {function} callback function to completed user connect action
 */
export function connectVerida(cb = () => { }) {
  Verida.setConfig({
    appName: VUE_APP_VERIDA_APP_NAME,
    environment: VUE_APP_VERIDA_ENVIRONMENT
  })

  veridaVaultLogin({
    loginUri: VUE_APP_LOGIN_URI,
    serverUri: VUE_APP_SERVER_URI,
    appName: VUE_APP_VERIDA_APP_NAME,
    logoUrl: VUE_APP_LOGO_URL,
    callback: async (response) => {
      try {
        const veridaApp = new Verida({
          did: response.did,
          signature: response.signature,
          appName: VUE_APP_VERIDA_APP_NAME
        })
        window.veridaApp = veridaApp
        const connected = await veridaApp.connect(true)

        window.profileManager = new ProfileManager(window.veridaApp)
        window.inboxManager = new InboxManager(window.veridaApp)

        await window.profileManager.init()

        if (connected) {
          store.set(VUE_APP_VERIDA_USER_SESSION, true)
          cb()
        }
      } catch (error) {
        cb()
      }
    }
  })
}

// this needs cleaning up
export async function getAccounts() {
  const address = await getAddress()
  if (address) {
    return [address]
  }

  return []
}

/**
 * Bind callbacks to fire when the user is authenticated / deauthenticated
 *
 * @param {*} auth Callback to fire when the user is authenticated
 * @param {*} unauth Callback to fire when the user is unauthenticated
 */
export async function bind(auth = () => { }, unauth = () => { }) {
  callbacks.auth = auth
  callbacks.unauth = unauth

  window.ethereum.on('accountsChanged', async (accounts) => {
    if (!accounts.length) {
      await logout()
      return unauth()
    }

    const webSessionExists = await Verida.webSessionExists('did:' + CHAIN + ':' + accounts[0], VUE_APP_VERIDA_APP_NAME)
    const connected = accounts.length && webSessionExists

    if (connected) {
      return auth()
    }
  })
}

export async function bindInbox(cb) {
  if (window.veridaApp) {
    window.veridaApp.inbox.on('newMessage', cb)
  }
}

export async function logout(cb) {
  if (window.veridaApp) {
    await window.veridaApp.disconnect()
    window.veridaApp = null
    store.remove(VUE_APP_VERIDA_USER_SESSION)
    store.remove('_verida_auth_user_signature')
    if (cb) {
      cb()
    }
  }
}

export async function fetchInbox(filter = {}) {
  if (!window.veridaApp) {
    return []
  }
  const inbox = await window.veridaApp.inbox.getInbox()
  return inbox.getMany(filter, {
    sort: [{ sentAt: 'desc' }]
  })
}

export async function getAddress() {
  if (window.veridaApp) {
    const address = await window.veridaApp.user.did
    return address
  }

  return null
}
