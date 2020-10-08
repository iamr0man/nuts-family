import { db } from '~/plugins/firebase'

export const state = () => ({
  user: {
    loggedIn: false,
    data: null
  }
})

export const getters = {
  getUser: (state) => state.user
}

export const actions = {
  fetchUser({ commit }, user) {
    commit('SET_LOGGED_IN', user !== null)
    if (user) {
      commit('SET_USER_DATA', user)
    } else {
      commit('SET_USER_DATA', null)
    }
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async CREATE_USER_INSTANCE({ commit }, userData) {
    await db
      .collection('users')
      .doc(userData.uid)
      .set(userData)
  }
}

export const mutations = {
  SET_LOGGED_IN(state, value) {
    state.user.loggedIn = value
  },
  SET_USER_DATA(state, data) {
    state.user.data = data
  }
}
