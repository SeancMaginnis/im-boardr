<template>
  <div class="board">
    <div class="container-fluid bg1">
      <navbar></navbar>
      <div class="row justify-content-center">
        <div class="col-5  box text-white">
          <h1>{{board.title}}
            <hr class="underline">
          </h1>

        </div>
      </div>
      <div class="row justify-content-center">
        <div class="mt-3 text-white">
          <h2>What's on the Board</h2>
        </div>
      </div>
      <div class="row justify-content-center">
        <div class="col-4 text-white card-horizontal">
          <h3>{{board.description}}</h3>
        </div>
        <div>
          <h3 class="text-white">Instructions:</h3>
        </div>
      </div>
      <div class="row justify-content-center">
        <list-form></list-form>
      </div>
      <div class="row justify-content-around">
        <list v-for="list in lists" :list="list"></list>
      </div>
    </div>
  </div>
  </div>
</template>


<script>
  import Navbar from "@/components/NavBar.vue"
  import ListForm from "@/components/ListForm.vue"
  import List from '@/components/List.vue'
  export default {
    name: "board",
    mounted() {
      let id = this.boardId
      this.$store.dispatch('getLists', id)
      let id1 = this.$route.params.boardId
      this.$store.dispatch('activeBoard', id1)
    },
    computed: {
      board() {
        return this.$store.state.boards.find(b => b._id == this.boardId) || { title: 'Loading...' }
      },
      lists() {
        return this.$store.state.lists
      }
    },
    components: {
      ListForm,
      List,
      Navbar
    },
    props: ["boardId"]
  };
</script>

<style>
  .top-margin {
    margin-top: 10vh;
  }

  .card-border1 {
    border-image: url('../assets/backgrounds/border.png');
    background-color: transparent;
    border-top: 10px solid;
    border-right: 10px solid;
    border-left: 10px solid;
    border-bottom: 15px solid;
    border-image-slice: 3%;
  }

  .underline {
    min-width: 15%;
    background-image: url('../assets/backgrounds/horizontal.png');
    height: 10px;
  }
</style>