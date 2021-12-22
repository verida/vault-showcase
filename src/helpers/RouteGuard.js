import veridaHelper from './VeridaHelper'


const redirect = async (to, next) => {
  const { guest, authorized } = to.meta
  const connected = veridaHelper.hasSession()

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
