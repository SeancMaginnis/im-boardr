<template>
  <div class="taskForm">
    <form @submit.prevent="createTask">
      <input v-model="makeTask.title" type="text" placeholder="Title" />
      <input v-model="makeTask.description" type="text" placeholder="Description" />
      <button type="submit">Create Task</button>
    </form>
  </div>
</template>


<script>
  export default {
    name: 'taskForm',
    props: ['list'],
    data() {
      return {
        makeTask: {},
      }
    },
    computed: {
    },
    methods: {
      createTask() {
        let payload = {
          list: this.list,
          content: this.makeTask
        }
        this.makeTask.listId = payload.list._id
        this.makeTask.boardId = payload.list.boardId
        this.$store.dispatch('createTask', payload)
      }
    },
  }
</script>


<style scoped>

</style>