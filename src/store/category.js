import { isFunction, find, clone } from 'lodash'
import { db } from '@/plugins/firebase'

export const state = () => ({
  categoryName: 'nuts',
  items: {},
  item: null,
  comments: null
})

let unsubscribeComments = null

export const getters = {
  getItems: (state) => (searchedItems) => {
    if (searchedItems) {
      const lowerSearchText = searchedItems.toLowerCase()
      return state.items.filter(
        (item) =>
          item.name.toLowerCase().includes(lowerSearchText) ||
          item.description.shortDetails.toLowerCase().includes(lowerSearchText)
      )
    } else {
      return state.items
    }
  },
  getComments: (state) => state.comments,
  getItem: (state) => state.item
}

export const actions = {
  async GET_DEALS({ commit, state }) {
    const items = await db.collection(state.categoryName).get()
    commit(
      'SET_DEALS',
      items.docs.map((deal) => ({ id: deal.id, ...deal.data() }))
    )
  },
  async VIEW_DEAL({ commit, state }, dealId) {
    const dealRef = db.collection(state.categoryName).doc(dealId)

    // LISTENING TO COMMENT COLLECTION CHANGE WONT WORK HERE
    // THIS IS CALLED BY SERVER SIDE RENDERING

    const deal = await dealRef.get()
    commit('SET_ITEM', deal.data())
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
    commit('SET_ITEM', null)
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
  SET_CATEGORY(state, data) {
    state.categoryName = data
  },
  SET_DEALS(state, data) {
    state.items = data
  },
  ADD_DEAL(state, data) {
    const { id, deal } = data
    state.items[id] = deal
  },
  SET_ITEM(state, data) {
    state.item = data
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
