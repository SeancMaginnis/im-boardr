<template>
  <div class="boards bg1">
    <navbar></navbar>
    <div class="row log mt-5">
      <h1>Welcome to your <span class="card-bottom">ChalkBoard.</span>
      </h1>
    </div>
    <form class="mt-4" @submit.prevent="addBoard">
      <input type="text" placeholder="title" v-model="newBoard.title" required>
      <input type="text" placeholder="description" v-model="newBoard.description">
      <button class="btn btn-outline-success" type="submit">Create Board</button>
    </form>
    <div class="row d-flex justify-content-center my-5" v-for="board in boards" :key="board._id" :boardId="board._id">
      <h1 class="card-horizontal col-2 text-white" @click="boardDetails(board._id)">{{board.title}}
      </h1>
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
      },
      boardDetails(id) {
        this.$router.push('/board/' + id)
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

  .card-horizontal {
    border-image: url('../assets/backgrounds/border.png');
    background-color: transparent;
    border-top: 10px solid;
    border-right: 10px solid;
    border-left: 10px solid;
    border-bottom: 15px solid;
    border-image-slice: 3%;
  }

  .card-bottom {
    border-image: url('../assets/backgrounds/border.png');
    background-color: transparent;
    border-bottom: 15px solid;
    border-image-slice: 3%;
  }
</style>