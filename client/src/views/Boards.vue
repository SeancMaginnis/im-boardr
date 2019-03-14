<template>
  <div class="boards bg1">
    <navbar></navbar>
    <div class="row log">
      <h1>WELCOME TO THE BOARDS!!!</h1>
    </div>

    <form @submit.prevent="addBoard">
      <input type="text" placeholder="title" v-model="newBoard.title" required>
      <input type="text" placeholder="description" v-model="newBoard.description">
      <button class="btn btn-outline-success" type="submit">Create Board</button>
    </form>
    <div v-for="board in boards" :key="board._id" :boardId="board._id">
      <router-link :to="{name: 'board', params: {boardId: board._id}}">{{board.title}}</router-link>
      <button class="btn btn-outline-dark" @click="deleteBoard(board._id)">DELETE BOARD</button>
    </div>
  </div>
</template>

<script>
  import Navbar from '@/components/NavBar.vue'
  export default {
    name: "boards",
    created() {
      //blocks users not logged in
      if (!this.$store.state.user._id) {
        this.$router.push({ name: "login" });
      }
    },
    mounted() {
      this.$store.dispatch("getBoards");
    },
    data() {
      return {
        newBoard: {
          title: "",
          description: ""
        }
      };
    },
    computed: {
      boards() {
        return this.$store.state.boards;
      }
    },
    methods: {
      addBoard() {
        this.$store.dispatch("addBoard", this.newBoard);
        this.newBoard = { title: "", description: "" };
      },
      deleteBoard(boardId) {
        this.$store.dispatch("deleteBoard", boardId);
      },
      logout() {
        this.$store.dispatch('logout')
      }
    },
    components: {
      Navbar
    }
  };
</script>

<style>
  .bg1 {
    min-height: 100vh;
    background-image: url('../assets/backgrounds/black-chalkboard.jpg');
    background-size: cover;
    background-repeat: no-repeat;
    overflow: hidden;
    min-width: 100vw;
    height: auto;
  }

  .log {
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    color: white
  }
</style>