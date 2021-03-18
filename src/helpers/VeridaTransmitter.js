import Verida from '@verida/datastore'
import ProfileManager from './ProfileManager'
import InboxManager from './InboxManager'

const {
  VUE_APP_VERIDA_APP_NAME,
  VUE_APP_VERIDA_ENVIRONMENT,
  VUE_APP_VERIDA_SCHEMAS_BASE_PATH
} = process.env

const CHAIN = 'ethr'

const callbacks = {}

Verida.setConfig({
  appName: VUE_APP_VERIDA_APP_NAME,
  environment: VUE_APP_VERIDA_ENVIRONMENT,
  baseSchemasPath: VUE_APP_VERIDA_SCHEMAS_BASE_PATH,
  /*servers: {
    testnet: {
      schemaPaths: {
        'https://schemas.verida.io/': 'http://localhost:5010/',
        'https://schemas.testnet.verida.io/': 'http://localhost:5010/'
      }
    }
  }*/
})

/**
 * Connect the user to their Verida Datastore Application
 *
 * @param {boolean} force True if the connection should be forced (open a Metamask dialog to login to their app)
 * @param {function} canceled if sign up is cancelled by user
 */
export async function connectVerida (force, canceled = () => {}) {
  let web3Provider = await Verida.Helpers.wallet.connectWeb3(CHAIN)
  window.web3Provider = web3Provider
  const address = await window.web3Provider.getAddress()

  if (!window.veridaApp) {
    window.veridaApp = new Verida({
      address: address,
      chain: CHAIN,
      web3Provider: web3Provider
    })
    window.profileManager = new ProfileManager(window.veridaApp)
    window.inboxManager = new InboxManager(window.veridaApp)
    window.Verida = Verida

    await window.profileManager.init()
  }

  try {
    const connected = await window.veridaApp.connect(force)
    if (connected) {
      callbacks.auth()
    }
  } catch (e) {
    canceled()
  }
}

export async function getAccounts () {
  return new Promise((resolve, reject) => {
    const handler = (err, accounts) => err ? reject(err) : resolve(accounts)
    window.web3.eth.getAccounts(handler)
  })
}

/**
 * Bind callbacks to fire when the user is authenticated / deauthenticated
 *
 * @param {*} auth Callback to fire when the user is authenticated
 * @param {*} unauth Callback to fire when the user is unauthenticated
 */
export async function bind (auth = () => {}, unauth = () => {}) {
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

export async function bindInbox (cb) {
  if (window.veridaApp) {
    window.veridaApp.inbox.on('newMessage', cb)
  }
}

export async function logout () {
  if (window.veridaApp) {
    window.veridaApp.disconnect()
    window.veridaApp = null
  }
}

export async function fetchInbox (filter = {}) {
  if (!window.veridaApp) {
    return []
  }
  const inbox = await window.veridaApp.inbox.getInbox()
  return inbox.getMany(filter, {
    sort: [{ sentAt: 'desc' }]
  })
}

export async function getAddress () {
  return window.web3Provider.getAddress(CHAIN)
}

export function getVerida() {
  return Verida
}