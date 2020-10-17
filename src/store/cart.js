import { v4 as uuidv4 } from 'uuid'
import { db, FieldValue } from '@/plugins/firebase'

export const state = () => ({
  cart: {}
})

export const getters = {
  getCart: (state) => state.cart
}

export const actions = {
  async CREATE_CART(userId) {
    const cartData = {
      id: uuidv4(),
      userId,
      products: []
    }
    await db
      .collection('cart')
      .doc(userId)
      .set(cartData)
  },
  async GET_CART({ commit }, user) {
    if (user) {
      const cartRef = await db.collection('cart').doc(user.uid)
      const cart = await cartRef.get()
      commit('SET_CART', cart.data())
    } else {
      commit('SET_CART', {})
    }
  },
  async ADD_CART_PRODUCT({ state, commit }, data) {
    const cartRef = await db.collection('cart').doc(state.cart.userId)
    await cartRef.update({ products: FieldValue.arrayUnion(data) })

    const cart = await cartRef.get()
    const cartData = await cart.data()
    commit('SET_CART', cartData)
  },
  async REMOVE_CART_PRODUCT({ state, commit }, productId) {
    const cartRef = await db.collection('cart').doc(state.cart.userId)
    await cartRef.update({
      products: state.cart.products.filter((v) => v.id !== productId)
    })

    const cart = await cartRef.get()
    const cartData = await cart.data()
    commit('SET_CART', cartData)
  }
}

export const mutations = {
  SET_CART(state, data) {
    state.cart = data
  }
}
