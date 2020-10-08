import { db } from '~/plugins/firebase'

const slugify = (textString) => {
  const a =
    'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;'
  const b =
    'aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------'
  const p = new RegExp(a.split('').join('|'), 'g')

  return (
    textString
      .toString()
      .toLowerCase()
      .replace(/\s+/g, '-') // Replace spaces with -
      .replace(p, (c) => b.charAt(a.indexOf(c))) // Replace special characters
      .replace(/&/g, '-and-') // Replace & with 'and'
      // eslint-disable-next-line no-useless-escape
      .replace(/[^\w\-]+/g, '') // Remove all non-word characters
      // eslint-disable-next-line no-useless-escape
      .replace(/\-\-+/g, '-') // Replace multiple - with single -
      .replace(/^-+/, '') // Trim - from start of text
      .replace(/-+$/, '')
  ) // Trim - from end of text
}

const randomString = (stringCount = 5) => {
  return Math.random()
    .toString(36)
    .substr(2, stringCount)
}

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
    const profile = await db.collection('profiles').doc(state.user.data.uid)
    if (profile) {
      commit('SET_PROFILE', profile)
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
