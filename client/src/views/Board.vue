<template>
  <div class="board">
    <div class="container-fluid">
      <div class="row my-3 justify-content-center">
        <div class="card col-3 d-flex bg-light">
          <b>Board Title:</b> {{board.title}}
          <br>
          <b>Board Description:</b> {{board.description}}
        </div>
      </div>
      <list-form></list-form>
      <list></list>
    </div>
  </div>
</template>

<script>
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
        return this.$store.state.list
      }
    },
    components: {
      ListForm,
      List
    },
    props: ["boardId"]
  };
</script>