// export default ({ app, store }) => {
//   // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   app.router.beforeEach((to, from, next) => {
//     const publicPages = ['Index', 'Authentication', 'Terms', 'Me']
//     const authRequired = !publicPages.includes(to.name)
//     const loggedIn = !store.getters['auth/getUser'].loggedIn
//
//     if (authRequired && !loggedIn) {
//       next('/authentication')
//     } else {
//       next()
//     }
//   })
// }
