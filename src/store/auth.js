import { db } from '~/plugins/firebase'
import { slugify, randomString } from '~/plugins/utility'

export const state = () => ({
  user: {
    loggedIn: false,
    data: null
  },
  profile: {}
})

export const getters = {
  getUser: (state) => state.user,
  getProfile: (state) => state.profile
}

export const actions = {
  FETCH_USER({ commit }, user) {
    commit('SET_LOGGED_IN', user !== null)
    if (user) {
      commit('SET_USER_DATA', {
        email: user.email,
        displayName: user.displayName,
        uid: user.uid
      })
    } else {
      commit('SET_USER_DATA', null)
    }
  },
  async GET_PROFILE({ state, commit }) {
    const profile = await db
      .collection('profiles')
      .doc(state.user.data.uid)
      .get()
    const profileData = await profile.data()
    if (profile.exists) {
      commit('SET_PROFILE', profileData)
    }
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async CREATE_PROFILE({ commit, state, rootGetters }, profile) {
    if (profile === null) {
      return
    }
    const profileId = `${slugify(new Date())}-${randomString()}`
    const profileData = {
      id: profileId,
      userId: rootGetters['auth/getUser'].data.uid,
      ...profile
    }

    await db
      .collection('profiles')
      .doc(state.user.data.uid)
      .set(profileData)
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
  },
  SET_PROFILE(state, data) {
    state.profile = data
  }
}
