<template>
  <div class="col-3 mt-4">
    <div class="rounded card bg-light" id="list-card">
      <h3 class="p-2"><u>{{list.title}}</u></h3>
      <task v-for="task in tasks" :task="task"></task>
    </div>
    <button class="btn btn-danger w-25 mt-3" @click="deleteList(list)">Delete</button>
  </div>
</template>
<script>
  import Task from "@/components/Task.vue"
  export default {
    name: 'list',
    props: ['list'],
    mounted() {
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
      Task
    }
  }
</script>

<style>
  #list-card {
    height: 60vh
  }
</style>