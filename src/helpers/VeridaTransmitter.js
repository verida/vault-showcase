import Verida from '@verida/datastore'
import ProfileManager from './ProfileManager'
import InboxManager from './InboxManager'

const {
  VUE_APP_VERIDA_APP_NAME,
  VUE_APP_VERIDA_ENVIRONMENT
} = process.env

const CHAIN = 'ethr'
const callbacks = {}

/**
 * Connect the user to their Verida Datastore Application
 *
 * @param {boolean} force True if the connection should be forced (open a Metamask dialog to login to their app)
 * @param {function} canceled if sign up is cancelled by user
 */
export async function connectVerida (force, canceled = () => {}) {
  const web3Provider = await Verida.Helpers.wallet.connectWeb3(CHAIN, {})
  window.web3Provider = web3Provider
  const address = await window.web3Provider.getAddress()

  Verida.setConfig({
    appName: VUE_APP_VERIDA_APP_NAME,
    environment: VUE_APP_VERIDA_ENVIRONMENT
    /*
  servers: {
      testnet: {
        schemaPaths: {
          'https://schemas.testnet.verida.io/': VUE_APP_SCHEMA_PATHS
        }
      }
    }
  */
  })

  if (!window.veridaApp) {
    window.veridaApp = new Verida({
      address: address,
      chain: CHAIN,
      web3Provider: web3Provider
    })
    window.profileManager = new ProfileManager(window.veridaApp)
    window.inboxManager = new InboxManager(window.veridaApp)

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

// this needs cleaning up
export async function getAccounts () {
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
  if (window.web3Provider) {
    return window.web3Provider.getAddress()
  }
}
