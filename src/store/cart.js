import { v4 as uuidv4 } from 'uuid'
import { db, FieldValue } from '@/plugins/firebase'

async function handleResponse(data) {
  let products = []
  try {
    products = (
      await Promise.all(
        data.products.map(async (v) => {
          const categoryRef = db.collection(v.categoryName)
          return { doc: await categoryRef.doc(v.productId).get(), v }
        })
      )
    )
      .filter((elem) => elem.doc.exists)
      .map((elem) => ({ id: elem.doc.id, product: elem.doc.data(), ...elem.v }))
    data.products = products
    return data
  } catch (error) {}
}

export const state = () => ({
  cart: {}
})

export const getters = {
  getCart: (state) => state.cart
}

export const actions = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async CREATE_CART(ctx, userId) {
    try {
      const cartData = {
        id: uuidv4(),
        userId,
        products: []
      }
      await db
        .collection('cart')
        .doc(userId)
        .set(cartData)
    } catch (e) {
      console.log(e)
    }
  },
  async GET_CART({ commit }, user) {
    if (user) {
      const cartRef = await db.collection('cart').doc(user.uid)
      const cart = await cartRef.get()
      const cartData = await cart.data()
      commit('SET_CART', await handleResponse(cartData))
    } else {
      let localCart = JSON.parse(localStorage.getItem('localCart'))
      if (!localCart) {
        localStorage.setItem(
          'localCart',
          JSON.stringify({
            products: []
          })
        )
      } else {
        localStorage.setItem(
          'localCart',
          JSON.stringify(await handleResponse(localCart))
        )
      }
      localCart = JSON.parse(localStorage.getItem('localCart'))
      commit('SET_CART', localCart)
    }
  },
  async ADD_CART_PRODUCT({ state, commit }, data) {
    if (state.cart.userId) {
      const cartRef = await db.collection('cart').doc(state.cart.userId)
      await cartRef.update({ products: FieldValue.arrayUnion(data) })

      const cart = await cartRef.get()
      const cartData = await cart.data()
      commit('SET_CART', await handleResponse(cartData))
    } else {
      let localCart = JSON.parse(localStorage.getItem('localCart'))
      localCart.products.push(data)

      localStorage.setItem('localCart', JSON.stringify(localCart))
      localCart = JSON.parse(localStorage.getItem('localCart'))
      commit('SET_CART', await handleResponse(localCart))
    }
  },
  async UPDATE_CART_PRODUCT({ state, commit }, item) {
    if (state.cart.userId) {
      const cartRef = await db.collection('cart').doc(state.cart.userId)
      const newDate = {
        index: state.cart.products.findIndex((v) => v.id === item.id),
        amount: item.amount
      }
      commit('SET_PRODUCT_AMOUNT', newDate)
      await cartRef.update({
        products: state.cart.products
      })

      const cart = await cartRef.get()
      const cartData = await cart.data()
      commit('SET_CART', await handleResponse(cartData))
    } else {
      let localCart = JSON.parse(localStorage.getItem('localCart'))
      const index = localCart.products.findIndex((v) => v.id === item.id)
      localCart.products[index].amount = +item.amount
      localStorage.setItem('localCart', JSON.stringify(localCart))
      localCart = JSON.parse(localStorage.getItem('localCart'))
      commit('SET_CART', await handleResponse(localCart))
    }
  },
  async REMOVE_CART_PRODUCT({ state, commit }, productId) {
    if (state.cart.userId) {
      const cartRef = await db.collection('cart').doc(state.cart.userId)
      await cartRef.update({
        products: state.cart.products.filter((v) => v.id !== productId)
      })

      const cart = await cartRef.get()
      const cartData = await cart.data()
      commit('SET_CART', await handleResponse(cartData))
    } else {
      let localCart = JSON.parse(localStorage.getItem('localCart'))
      localCart.products = localCart.products.filter((v) => v.id !== productId)

      localStorage.setItem('localCart', JSON.stringify(localCart))
      localCart = JSON.parse(localStorage.getItem('localCart'))
      commit('SET_CART', await handleResponse(localCart))
    }
  },
  async CLEAR_CART_PRODUCTS({ state, commit }) {
    if (state.cart.userId) {
      const cartRef = await db.collection('cart').doc(state.cart.userId)
      await cartRef.update({
        products: []
      })

      const cart = await cartRef.get()
      const cartData = await cart.data()
      commit('SET_CART', await handleResponse(cartData))
    } else {
      let localCart = JSON.parse(localStorage.getItem('localCart'))
      localCart.products = []

      localStorage.setItem('localCart', JSON.stringify(localCart))
      localCart = JSON.parse(localStorage.getItem('localCart'))
      commit('SET_CART', await handleResponse(localCart))
    }
  }
}

export const mutations = {
  SET_CART(state, data) {
    state.cart = data
  },
  SET_PRODUCT_AMOUNT(state, data) {
    state.cart.products[data.index].amount = +data.amount
  }
}
