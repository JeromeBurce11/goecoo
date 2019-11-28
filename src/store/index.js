import Vue from "vue";
import Vuex from "vuex";
import axios from 'axios'
import VueAxios from 'vue-axios'
import { response } from "express";

Vue.use(VueAxios, axios)
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    status: '',
        token: localStorage.getItem('token') || '',
        user: {}
  },
  mutations: {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,

    auth_request(state) {
      state.status = 'loading'
    },
    auth_success(state, token, user) {
      state.status = 'success'
      state.token = token
      state.user = user
    },
    auth_error(state) {
      state.status = 'error'
    },
    logout(state) {
      state.status = ''
      state.token = ''
    },
  },
  actions: {
    login({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios({ url: 'http://localhost:3000/admin/login', data: user, method: 'POST' })
          .then(resp => {
            alert(resp.data.token)
            const token = resp.data.token
            fetch('http://localhost:3000/verify', {
              method: 'GET',
              headers: {
                'Authorization': 'Bearer' + token
              }
            })
              .then(response => {
                alert(response)
                const user = resp.data.user
                localStorage.setItem('token', token)
                // Add the following line:
                axios.defaults.headers.common['Authorization'] = token
                commit('auth_success', token, user)
                resolve(resp)
              })
            
          })
          .catch(err => {
            commit('auth_error')
            localStorage.removeItem('token')
            reject(err)
          })
      })
    },
    logout({ commit }) {
      return new Promise((resolve) => {
        commit('logout')
        localStorage.removeItem('token')
        delete axios.defaults.headers.common['Authorization']
        resolve()
      })
    }
  },
  modules: {}
});