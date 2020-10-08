export default function(ctx) {
  if (!ctx.store.getters['auth/getUser'].loggedIn) {
    return ctx.redirect('/authentication')
  }
}
