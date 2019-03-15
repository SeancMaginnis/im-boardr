import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import router from './router'
import { Drag, Drop } from 'vue-drag-drop';

Vue.component('drag', Drag);
Vue.component('drop', Drop);
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
    comments: {}
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
      Vue.set(state.tasks, data.listId, data.tasks)
    },
    setComments(state, data) {
      Vue.set(state.comments, data.taskId, data.comments)
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
    editList({ commit, dispatch }, payload) {
      api.put('/boards/' + payload.boardId + '/lists/' + payload.list.listId, payload.content)
        .then(res => {
          console.log(res.data)
          let newPayload = {
            boardId: payload.boardId,
            _id: payload.list._id,
          }
          dispatch('getLists', newPayload)
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
    },
    createTask({ commit, dispatch }, payload) {
      api.post('/boards/' + payload.list.boardId + '/lists/' + payload.list._id + '/tasks', payload.content)
        .then(res => {
          dispatch('getTasks', payload.list)
        })
    },
    deleteTask({ commit, dispatch }, payload) {
      api.delete('/boards/' + payload.boardId + '/lists/' + payload.task.listId + '/tasks/' + payload.task._id)
        .then(res => {
          let payload1 = {
            boardId: payload.task.boardId,
            _id: payload.task.listId
          }
          dispatch('getTasks', payload1)
        })
    },
    editTask({ commit, dispatch }, payload) {
      api.put('/boards/' + payload.list.boardId + '/lists/' + payload.oldTask.listId + '/tasks/' + payload.oldTask._id, payload.task)
        .then(res => {
          let newPayload = {
            boardId: payload.list.boardId,
            _id: payload.oldTask.listId
          }
          let oldPayload = {
            boardId: payload.list.boardId,
            _id: payload.task.listId
          }
          dispatch('getTasks', newPayload)
          dispatch('getTasks', oldPayload)
        })

    },
    //#endregion

    //#region -- COMMENTS --
    getComments({ commit, dispatch }, payload) {
      api.get('/boards/' + payload.boardId + '/lists/' + payload.listId + '/tasks/' + payload._id + '/comments')
        .then(res => {
          let data = {
            taskId: payload._id,
            comments: res.data
          }
          commit('setComments', data)
        })
    },
    createComment({ commit, dispatch }, payload) {
      api.post('/boards/' + payload.boardId + '/lists/' + payload.task.listId + '/tasks/' + payload.task._id + '/comments', payload.content)
        .then(res => {
          dispatch('getComments', payload.task)
        })
    },
    deleteComment({ commit, dispatch }, payload) {
      api.delete('/boards/' + payload.boardId + '/lists/' + payload.task.listId + '/tasks/' + payload.task._id + '/comments/' + payload.comment._id)
        .then(res => {
          dispatch('getComments', payload.task)
        })
    },
    createSubcomment({ commit, dispatch }, payload) {
      console.log(payload)
      api.put('/boards/' + payload.boardId + '/lists/' + payload.task.listId + '/tasks/' + payload.task._id + '/comments/' + payload.comment._id + '/subcomments', payload.content)
        .then(res => {
          console.log(res.data)
          let newPayload = {
            boardId: payload.boardId,
            listId: payload.task.listId,
            _id: payload.task._id,
          }
          dispatch('getComments', newPayload)
        })
    },
    deleteSubcomment({ commit, dispatch }, payload) {
      // let payload = {
      //   boardId: this.boardId,
      //   comment: this.comment,
      //   task: this.task,
      //   Id: subId
      // }
      api.delete('/boards/' + payload.boardId + '/lists/' + payload.task.listId + '/tasks/' + payload.task._id + '/comments/' + payload.comment._id + '/subcomments/' + payload.Id)
        .then(res => {
          let newPayload = {
            boardId: payload.boardId,
            listId: payload.task.listId,
            _id: payload.task._id,
          }
          dispatch('getComments', newPayload)
        })
    }

  }
})
