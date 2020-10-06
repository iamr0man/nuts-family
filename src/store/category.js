import { isFunction, isNil, find, clone } from 'lodash'
import { db } from '@/plugins/firebase'

export const state = () => ({
  deals: {},
  deal: null,
  comments: null
})

let unsubscribeComments = null

export const getters = {
  getDeals: (state) => (searchText) => {
    if (searchText !== '' && !isNil(searchText)) {
      const lowerSearchText = searchText.toLowerCase()
      return state.deals.filter(
        (item) =>
          item.title.toLowerCase().includes(lowerSearchText) ||
          item.description.toLowerCase().includes(lowerSearchText)
      )
    } else {
      return state.deals
    }
  },
  getComments: (state) => state.comments,
  getDeal: (state) => state.deal
}

export const actions = {
  async GET_DEALS({ commit }) {
    const deals = await db.collection('nuts').get()
    commit(
      'SET_DEALS',
      deals.docs.map((deal) => ({ id: deal.id, ...deal.data() }))
    )
  },
  async VIEW_DEAL({ commit }, dealId) {
    const dealRef = db.collection('nuts').doc(dealId)

    // LISTENING TO COMMENT COLLECTION CHANGE WONT WORK HERE
    // THIS IS CALLED BY SERVER SIDE RENDERING

    const deal = await dealRef.get()
    commit('SET_DEAL', deal.data())
  },
  INITIATE_LISTENING_TO_COMMENTS({ commit }, dealId) {
    const dealRef = db.collection('deals').doc(dealId)
    // THIS WILL NOT WORK AS ITS BEING RENDERED IN SERVER SIDE
    unsubscribeComments = dealRef
      .collection('comments')
      .orderBy('timestamp', 'desc')
      .limit(10)
      .onSnapshot((snapshot) => {
        const comments = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }))
        commit('SET_COMMENTS', comments)
      })
  },
  LEAVE_DEAL({ commit }) {
    if (isFunction(unsubscribeComments)) unsubscribeComments()
    commit('SET_DEAL', null)
  },
  UPDATE_SCORE({ commit }, score) {
    commit('SET_SCORE', score)
  },
  UPDATE_DEAL_SCORE({ commit, state }, { dealId, score }) {
    const newDeal = clone(find(state.deals, (d) => d.id === dealId))
    newDeal.score = score
    const deals = [...state.deals.filter((item) => item.id !== dealId), newDeal]
    commit('SET_DEALS', deals)
  }
}

export const mutations = {
  SET_DEALS(state, data) {
    state.deals = data
  },
  ADD_DEAL(state, data) {
    const { id, deal } = data
    state.deals[id] = deal
  },
  SET_DEAL(state, data) {
    state.deal = data
  },
  SET_COMMENTS(state, data) {
    state.comments = data
  },
  ADD_COMMENTS(state, data) {
    state.comments = [...state.comments, ...data]
  },
  SET_SCORE(state, score) {
    state.deal = { ...state.deal, score }
  }
}
