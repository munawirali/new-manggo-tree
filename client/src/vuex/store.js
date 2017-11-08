import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const http = axios.create({
  baseURL: 'http://localhost:3000'
})

const state = {
  growth: ''
}

const mutations = {
  manggoTree (state, payload) {
    state.growth = payload
  }
}

const actions = {
  start ({commit}) {
    http.get('/start')
    .then(response => {
      console.log(response)
      commit('manggoTree', response)
    })
    .catch((err) => {
      console.log(err)
    })
  }
}

const store = new Vuex.Store({
  state,
  mutations,
  actions
})

export default store
