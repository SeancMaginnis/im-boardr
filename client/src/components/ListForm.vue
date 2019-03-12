<template>
  <div class="listForm">
    <form @submit.prevent="createList">
      <input v-model="makeList.title" type="text" placeholder="List Title" />
      <button type="submit">Create List</button>
    </form>

  </div>
</template>


<script>
  export default {
    name: 'listForm',
    data() {
      return {
        makeList: {},
      }
    },
    computed: {
    },
    methods: {
      createList() {
        let id = this.$store.state.activeBoard
        let payload = {
          boardId: id,
          title: this.makeList.title
        }
        this.$store.dispatch('createList', payload)
      }
    },
  }
</script>


<style scoped>

</style>