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
        formData: {}
      }
    },
    computed: {
      formData() {
        let id = this.$store.state.activeBoard
        return payload = {
          makeList: {
            title: this.makeList.title,
            boardId: id
          }
        }
      }
    },
    methods: {
      createList() {
        this.$store.dispatch('createList', this.formData)
      }
    },
  }
</script>


<style scoped>

</style>