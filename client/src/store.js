import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import router from './router'
import { stat } from 'fs';

Vue.use(Vuex)

let auth = Axios.create({
  baseURL: "//localhost:3000/auth/",
  timeout: 3000,
  withCredentials: true
})

let api = Axios.create({
  baseURL: "//localhost:3000/api/",
  timeout: 3000,
  withCredentials: true
})

export default new Vuex.Store({
  state: {
    user: {},
    boards: [],
    activeBoard: [],
    lists: [],
    tasks: {},
    comments: []
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },
    setBoards(state, boards) {
      state.boards = boards
    },
    setActive(state, data) {
      state.activeBoard = data
    },
    setLists(state, data) {
      state.lists = data
    },
    setTasks(state, data) {
      state.tasks[data.listId] = data.tasks
    }
  },
  actions: {
    //#region -- AUTH STUFF --
    register({ commit, dispatch }, newUser) {
      auth.post('register', newUser)
        .then(res => {
          commit('setUser', res.data)
          router.push({ name: 'boards' })
        })
    },
    authenticate({ commit, dispatch }) {
      auth.get('authenticate')
        .then(res => {
          commit('setUser', res.data)
          router.push({ name: 'boards' })
        })
        .catch(res => {
          router.push({ name: 'login' })
        })
    },
    login({ commit, dispatch }, creds) {
      auth.post('login', creds)
        .then(res => {
          commit('setUser', res.data)
          router.push({ name: 'boards' })
        })
    },
    logout({ commit, dispatch }) {
      auth.delete('logout')
        .then(user => {
          router.push({ path: '/login' })
          alert('logout successful. Please log back in immediately.')

        })
    },
    //#endregion

    //#region -- BOARDS --
    getBoards({ commit, dispatch }) {
      api.get('boards')
        .then(res => {
          commit('setBoards', res.data)
        })
    },
    addBoard({ commit, dispatch }, boardData) {
      api.post('boards', boardData)
        .then(serverBoard => {
          dispatch('getBoards')
        })
    },
    deleteBoard({ commit, dispatch }, boardId) {
      api.delete('boards/' + boardId)
        .then(res => {
          dispatch('getBoards')
        })
    },
    activeBoard({ commit, dispatch }, payload) {
      commit('setActive', payload)
    },
    //#endregion

    //#region -- LISTS --
    getLists({ commit, dispatch }, boardId) {
      api.get('boards/' + boardId + '/lists/')
        .then(res => {
          let payload = {
            board_id: boardId,
            lists: res.data
          }
          commit('setLists', res.data)
        })
    },
    createList({ commit, dispatch }, payload) {
      api.post('/boards/' + payload.boardId + '/lists', payload)
        .then(res => {
          dispatch('getLists', payload.boardId)
        })
    },
    deleteList({ commit, dispatch }, payload) {
      api.delete('/boards/' + payload.boardId + '/lists/' + payload._id)
        .then(res => {
          dispatch('getLists', payload.boardId)
        })
    },
    getTasks({ commit, dispatch }, payload) {
      api.get('/boards/' + payload.boardId + '/lists/' + payload._id + '/tasks')
        .then(res => {
          let data = {
            listId: payload._id,
            tasks: res.data
          }
          commit('setTasks', data)
        })
    }
  }
})
