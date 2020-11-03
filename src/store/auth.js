import { v4 as uuidv4 } from 'uuid'
import { db, FieldValue } from '~/plugins/firebase'

export const state = () => ({
  user: {
    loggedIn: false,
    data: null
  },
  profile: {}
})

export const getters = {
  getUser: (state) => state.user,
  getProfile: (state) => state.profile,
  getWarehouses: (state) => {
    if (state.profile.addresses) {
      return state.profile.addresses.filter(
        (v) => v.addressType === 'Відділення'
      )[0]
    }
  },
  getAddresses: (state) => {
    if (state.profile.addresses) {
      return state.profile.addresses.filter(
        (v) => v.addressType === 'Адреса'
      )[0]
    }
  }
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
  async GET_PROFILE({ commit }, user) {
    if (user) {
      const profile = await db
        .collection('profiles')
        .doc(user.uid)
        .get()
      const profileData = await profile.data()
      if (profile.exists) {
        commit('SET_PROFILE', profileData)
      }
    } else {
      commit('SET_PROFILE', {})
    }
  },
  async UPDATE_PROFILE({ state, commit }, data) {
    if (Object.entries(data).length < 1) return
    const profileRef = await db.collection('profiles').doc(state.user.data.uid)
    if (data.city) {
      await profileRef.update({ addresses: FieldValue.arrayUnion(data) })
    } else if (data.sex || data.speakingLanguage) {
      await profileRef.update({ ...data })
    }
    const profile = await profileRef.get()
    const profileData = await profile.data()
    commit('SET_PROFILE', profileData)
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async CREATE_USER_INSTANCE({ commit }, userData) {
    try {
      await db
        .collection('users')
        .doc(userData.uid)
        .set(userData)
    } catch (e) {
      console.log(e)
    }
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async CREATE_PROFILE({ state }, userId) {
    try {
      const profileData = {
        id: uuidv4(),
        userId,
        sex: null,
        speakingLanguage: null,
        addresses: []
      }
      await db
        .collection('profiles')
        .doc(userId)
        .set(profileData)
    } catch (e) {
      console.log(e)
    }
  },
  async REMOVE_PROFILE_ADDRESS({ state, commit }, addressId) {
    const profileRef = await db.collection('profiles').doc(state.user.data.uid)
    await profileRef.update({
      addresses: state.profile.addresses.filter((v) => v.id !== addressId)
    })

    const profile = await profileRef.get()
    const profileData = await profile.data()
    commit('SET_PROFILE', profileData)
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async CREATE_ORDER(ctx, order) {
    await db
      .collection('orders')
      .doc(order.id)
      .set(order)
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
