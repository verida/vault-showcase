import { getAccounts } from '@/helpers/VeridaTransmitter'
import Verida from '@verida/datastore'

const { VUE_APP_VERIDA_APP_NAME } = process.env

const redirect = async (to, next) => {
  const accounts = await getAccounts()
  const { guest, authorized } = to.meta
  const webSessionExists = await Verida.webSessionExists('did:ethr:' + accounts[0], VUE_APP_VERIDA_APP_NAME)
  const connected = accounts.length && webSessionExists

  switch (true) {
    case connected && guest:
      return next({ name: 'home' })
    case !connected && authorized:
      return next({ name: 'connect' })
    case !to.matched.length:
      return next('/')
    default: {
      return next()
    }
  }
}

export const RouteGuard = (to, from, next) => redirect(to, next)
