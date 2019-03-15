<template>
  <div class=" container-fluid boards bg1">
    <navbar></navbar>
    <div class="row log mt-5">
      <h1>Welcome to your <span class="card-bottom">ChalkBoard.</span>
      </h1>
    </div>
    <form class="mt-4" @submit.prevent="addBoard">
      <input class="mx-2 p-3 px-5 rounded" type="text" placeholder="title" v-model="newBoard.title" required>
      <input class="mx-2 p-3 px-5 rounded" type="text" placeholder="description" v-model="newBoard.description">
      <button class="point chalk-border1 text-white ml-2 p-3" type="submit">Create Board</button>
    </form>
    <div class="row jc">
      <div class=" col-4 mt-2" v-for="board in boards" :key="board._id" :boardId="board._id">
        <h1 class="card-horizontal curs2 box text-white" @click="boardDetails(board._id)">{{board.title}}
        </h1>
        <button id="curs" class="point btn-outline-dark" @click="deleteBoard(board._id)">DELETE BOARD</button>
      </div>
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
  }
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
    border-right: 5px solid;
    border-left: 5px solid;
    border-bottom: 15px solid;
    border-image-slice: 3%;
    <<<<<<< HEAD cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center=======
  }

  #curs {
    cursor: url('../assets/backgrounds/eraser2.png'), pointer
  }

  .curs2 {
    cursor: url('../assets/backgrounds/Board.png'), pointer >>>>>>> ebfeb9805c5335c59194ddced51e2b557d92acbf
  }

  .point {
    cursor: pointer;
  }

  .card-bottom {
    border-image: url('../assets/backgrounds/border.png');
    background-color: transparent;
    border-bottom: 15px solid;
    border-image-slice: 3%;
  }

  <<<<<<< HEAD .chalk-border1 {
    border-image: url('../assets/backgrounds/border.png');
    background-color: transparent;
    border-top: 4px solid;
    border-right: 4px solid;
    border-left: 4px solid;
    border-bottom: 4px solid;
    border-image-slice: 3%;
    cursor: pointer;
  }

  #curs {
    cursor: url('../assets/backgrounds/eraser2.png'), pointer
  }

  =======>>>>>>>ebfeb9805c5335c59194ddced51e2b557d92acbf .box {
    min-width: 5em;
    min-height: 5em
  }
</style>