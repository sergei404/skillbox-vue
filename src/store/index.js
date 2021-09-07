import Vue from 'vue'
import Vuex from 'vuex'
import products from '../data/products'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cardProducts: [
      {
        productId: 1,
        amount: 2
    }
  ]
  },
  mutations: {
    addProductToCard(state, {productId, amount}) {
      const item = state.cardProducts.find(item => item.productId === productId)
      if(item) {
        item.amount += amount
      } else {
        state.cardProducts.push({
        productId,
        amount
      })
      }
    },
    updateAmount(state, {productId, amount}) {
      const item = state.cardProducts.find(item => item.productId === productId)
      if(item) {
        item.amount = amount
      } 
    },
    deleteCardProduct(state, productId) {
      state.cardProducts = state.cardProducts.filter(item => item.productId !== productId)
    }
  },
  getters: {
    cardDetailProduct(state) {
      return state.cardProducts.map((item) => {
        return {
          ...item,
          product: products.find(el => el.id === item.productId)
        }
      })
    },
    cardTotalPrice(state, getters) {
      return getters.cardDetailProduct.reduce((acc, {amount, product}) => acc + amount * product.price, 0)
    }
  }
})
