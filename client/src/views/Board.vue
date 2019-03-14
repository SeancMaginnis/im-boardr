<template>
  <div class="board">
    <div class="container-fluid bg1">
      <navbar></navbar>
      <div class="row my-3 justify-content-center">
        <div class="col-4 offset-1 d-flex text-white">
          <h3><b>Title:</b> {{board.title}}</h3>
        </div>
      </div>
      <img style="height: 18px; width: auto;" src="../assets/backgrounds/05.png" />
      <div class="row my-3 justify-content-center">
        <div class="col-4 offset-1 d-flex text-white">
          <h3><b>Description:</b> {{board.description}}</h3>
          <br>
        </div>
      </div>
      <list-form></list-form>
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