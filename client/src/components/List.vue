<template>
  <drop class="col-3 mt-4" @drop="handleDrop" id="cursor">
    <div class="rounded card-horizontal1 card-vertical">
      <div class="text-white" style="font-size: 30px">{{list.title}}<button
          class="mb-3 ml-5 mt-4 card-border1 text-white" @click="listClick = !listClick" style="font-size:20px;"><i
            class="fas fa-plus text-white"></i>
          Task</button></div>

      <img class="ml-2 mb-4" style=" height: 10px; width: 100%;" src="../assets/backgrounds/horizontal.png" />
      <task-form v-if="listClick" :list="list"></task-form>
      <task v-for="task in tasks" :task="task" :boardId='list.boardId'></task>
    </div>
    <button class="card-border1 text-white w-25 mt-3" @click="deleteList(list)">Delete List</button>
  </drop>
</template>
<script>
  import Task from "@/components/Task.vue"
  import TaskForm from "@/components/taskForm.vue"
  export default {
    name: 'list',
    props: ['list', 'task'],
    data() {
      return {
        over: false,
        listClick: null
      };
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

    }
  }
</script>

<style scoped>
  #cursor {
    cursor: default;
  }

  #list-card {
    background-color: transparent;
    min-height: 60vh;
  }

  .btn {
    display: flex;
    align-items: flex-end;
    justify-content: center
  }

  .card-horizontal1 {
    border-image: url('../assets/backgrounds/border.png');
    background-color: transparent;
    border-top: 10px solid;
    border-right: 10px solid;
    border-left: 10px solid;
    border-bottom: 15px solid;
    border-image-slice: 3%;
  }

  .card-border1 {
    border-image: url('../assets/backgrounds/border.png');
    background-color: transparent;
    border-top: 3px solid;
    border-right: 3px solid;
    border-left: 3px solid;
    border-bottom: 3px solid;
    border-image-slice: 3%;
  }
</style>