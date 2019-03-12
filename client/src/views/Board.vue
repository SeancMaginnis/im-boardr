<template>
  <div class="board">
    {{board.title}}
    <list-form></list-form>
    <list v-for="list in lists" :listData='list'></list>
  </div>
</template>

<script>
  import ListForm from "@/components/ListForm.vue"
  export default {
    name: "board",
    mounted() {
      let id = this.boardId
      this.$store.dispatch('getLists', id)
    },
    computed: {
      board() {
        return this.$store.state.boards.find(b => b._id == this.boardId) || { title: 'Loading...' }
      }
    },
    components: {
      ListForm
    },
    props: ["boardId"]
  };
</script>