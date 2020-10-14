import { v4 as uuidv4 } from 'uuid'
// import { FieldValue } from 'firebase-admin'
import { db } from '~/plugins/firebase'

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
  async UPDATE_PROFILE({ state }, data) {
    if (Object.entries(data).length < 1) return
    const profileRef = await db.collection('profiles').doc(state.user.data.uid)
    // if (data.city) {
    //   profileRef.update({ addresses: FieldValue.arrayUnion(data) })
    // }
    profileRef.update(...data)
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async CREATE_USER_INSTANCE({ commit }, userData) {
    await db
      .collection('users')
      .doc(userData.uid)
      .set(userData)
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async CREATE_PROFILE({ state }, userId) {
    const profileData = {
      id: uuidv4(),
      userId,
      sex: null,
      speakingLanguage: null,
      addresses: []
    }
    await db
      .collection('profiles')
      .doc(state.user.data.uid)
      .set(profileData)
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
  },
  ADD_ADDRESS(state, data) {
    state.profile.addresses.push(data)
  }
}
