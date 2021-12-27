import Vue from 'vue'
import Vuex from 'vuex'
//import products from '../data/products'
import axios from 'axios'
import { API_URL } from "@/config";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cardProducts: [],
    userAccessKey: null,
    cardProductsData: [],
    orderInfo: null
  },
  mutations: {
    updateOrderInfo(state, orderInfo) {
      state.orderInfo = orderInfo
    },
    resetCard(state) {
      state.cardProducts = []
      state.cardProductsData = []
    },
    updateAmount(state, {productId, amount}) {
      const item = state.cardProducts.find(item => item.productId === productId)
      if(item) {
        item.amount = amount
      } 
    },
    deleteCardProduct(state, productId) {
      state.cardProducts = state.cardProducts.filter(item => item.productId !== productId)
    },
    updateUserAccessKey(state, accessKey) {
      state.userAccessKey = accessKey;
    },
    updateCardProductsData(state, items) {
      state.cardProductsData = items;
    },
    syncCardProducts(state) {
      state.cardProducts = state.cardProductsData.map((item) => {
        return {
          productId: item.product.id,
          amount: item.quantity
        }
      })
    },
  },
  getters: {
    cardInfo(state) {
      return state.orderInfo
    },
    cardDetailProduct(state) {
      return state.cardProducts.map((item) => {
        const product = state.cardProductsData.find((p) => p.product.id === item.productId).product
        return {
          ...item,
          product: {
            ...product,
            image: product.image.file.url
          }
        }
      })
    },
    cardTotalPrice(state, getters) {
      return getters.cardDetailProduct.reduce((acc, {amount, product}) => acc + amount * product.price, 0)
    },
  },
  actions: {
    loadOrderInfo(context, orderId) {
      return axios.get(`${API_URL}/api/orders/${orderId}`, {
        params: {
          userAccessKey: context.state.userAccessKey
        }
      })
      .then(res => context.commit('updateOrderInfo', res.data))
    },
    loadCard(context) {
      return axios.get(`${API_URL}/api/baskets`, {
        params: {
          userAccessKey: context.state.userAccessKey
        }
      })
      .then(response => {
        if (!context.state.userAccessKey) {
          localStorage.setItem('userAccessKey', response.data.user.accessKey)
          context.commit('updateUserAccessKey', response.data.user.accessKey)
        }
        context.commit('updateCardProductsData', response.data.items);
        context.commit('syncCardProducts')
      })
    },
    addProductToCard(context, {productId, amount}) {
      return axios.post(`${API_URL}/api/baskets/products`, {
        productId: productId,
        quantity: amount
      },
      {
        params: {
          userAccessKey: context.state.userAccessKey
        },
      })
      .then(response => {
        context.commit('updateCardProductsData', response.data.items);
        context.commit('syncCardProducts')
      })
    },
    updateCardProductAmount(context, {productId, amount}) {
      context.commit('updateAmount', {productId, amount})

      if (amount < 1) {
        return;
      }

      return axios.put(`${API_URL}/api/baskets/products`, {
        productId: productId,
        quantity: amount
      },
      {
        params: {
          userAccessKey: context.state.userAccessKey
        },
      })
      .then(response => {
        context.commit('updateCardProductsData', response.data.items);
      })
      .catch(() => {
        context.commit('syncCardProducts');
      })
    },
    removeCardProduct(context, productId) {
      context.commit('deleteCardProduct', productId)

      return axios.delete(`${API_URL}/api/baskets/products`, 
      { 
        data: {
          productId: productId,
        },
        params: {
          userAccessKey: context.state.userAccessKey
        }
      })
      .then(response => {
        context.commit('updateCardProductsData', response.data.items);
      })
    }
  }
})
