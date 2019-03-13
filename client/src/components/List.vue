<template>
  <div class="col-3 mt-4">
    <div class="rounded card bg-light" id="list-card">
      <h3 class="p-2"><u>{{list.title}}</u></h3>
      <task-form :list="list"></task-form>
      <task v-for="task in tasks" :task="task" :boardId='list.boardId'></task>
    </div>
    <button class="btn btn-danger w-25 mt-3" @click="deleteList(list)">Delete</button>
  </div>
</template>
<script>
  import Task from "@/components/Task.vue"
  import TaskForm from "@/components/taskForm.vue"
  export default {
    name: 'list',
    props: ['list'],
    mounted() {
      let payload = {
        lists: this.$store.state.lists,
        tasks: this.$store.state.tasks
      }
      this.$store.dispatch('getTasks', this.list)
    },
    computed: {
      tasks() {
        return this.$store.state.tasks[this.list._id]
      }
    },
    methods: {
      deleteList(list) {
        this.$store.dispatch('deleteList', list)
      }
    },
    components: {
      TaskForm,
      Task
    }
  }
</script>

<style scoped>
  #list-card {
    min-height: 60vh;
  }

  .btn {
    display: flex;
    align-items: flex-end;
    justify-content: center
  }
</style>