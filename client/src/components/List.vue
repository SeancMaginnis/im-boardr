<template>
  <drop class="col-3 mt-4" @drop="handleDrop">
    <div class="rounded card" id="list-card">
      <h3 class="p-2 d-flex text-white">{{list.title}}</h3>
      <task-form :list="list"></task-form>
      <task v-for="task in tasks" :task="task" :boardId='list.boardId'></task>
    </div>
    <button class="btn btn-danger w-25 mt-3" @click="deleteList(list)">Delete</button>
  </drop>
</template>
<script>
  import Task from "@/components/Task.vue"
  import TaskForm from "@/components/taskForm.vue"
  import Drag from '@/components/dragDrop/Drag.vue'
  import Drop from '@/components/dragDrop/Drop.vue'
  export default {
    name: 'list',
    props: ['list', 'task'],
    data() {
      return { over: false };
    },
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
      },
      handleDrop(task) {
        let payload = {
          list: this.list,
          oldTask: task,
          task: {
            listId: this.list._id
          }
        }
        this.$store.dispatch('editTask', payload)
      }
    },
    components: {
      TaskForm,
      Task,
      Drag,
      Drop
    }
  }
</script>

<style scoped>
  #list-card {
    background-color: transparent;
    min-height: 60vh;
  }

  .btn {
    display: flex;
    align-items: flex-end;
    justify-content: center
  }


  #list-card {
    border-image: url('../assets/backgrounds/05.png') 50;
    border-image-slice: 40%;
    border-width: 10px;
  }
</style>