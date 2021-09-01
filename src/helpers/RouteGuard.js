import store from 'store'

const {
  VUE_APP_VERIDA_USER_SESSION
} = process.env

const redirect = async (to, next) => {
  const { guest, authorized } = to.meta
  const connected = store.get(VUE_APP_VERIDA_USER_SESSION)

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
