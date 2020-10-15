import { find, clone } from 'lodash'
import { db, FieldValue } from '@/plugins/firebase'

export const state = () => ({
  categoryName: 'nuts',
  items: {},
  item: null
})

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
  async VIEW_ITEM({ commit, state }, itemId) {
    const itemRef = db.collection(state.categoryName).doc(itemId)

    // LISTENING TO COMMENT COLLECTION CHANGE WONT WORK HERE
    // THIS IS CALLED BY SERVER SIDE RENDERING

    const item = await itemRef.get()
    commit('SET_ITEM', item.data())
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async POST_COMMENT({ state, commit }, commentData) {
    try {
      const itemRef = await db
        .collection(state.categoryName)
        .doc(commentData.itemId)
      await itemRef.update({
        reviews: FieldValue.arrayUnion(commentData)
      })
      const item = await itemRef.get()
      const itemData = await item.data()
      commit('SET_ITEM', itemData)
    } catch (e) {
      console.log(e)
    }
  },
  LEAVE_ITEM({ commit }) {
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
  SET_SCORE(state, score) {
    state.deal = { ...state.deal, score }
  }
}
