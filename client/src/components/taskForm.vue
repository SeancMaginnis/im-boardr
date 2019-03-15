<template>
  <div class="taskForm">
    <form @submit.prevent=" createTask">
      <input class="mx-2 rounded p-2 mt-1" v-model="makeTask.title" type="text" placeholder="Title" />
      <input class="mx-2 rounded p-2 mt-1" v-model="makeTask.description" type="text" placeholder="Description" />
      <button class="chalk-border1 p-2 mx-2 my-2 point" type="submit" @click="listClick = !listClick">Create
        Task</button>
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
  .chalk-border1 {
    border-image: url('../assets/backgrounds/border.png');
    background-color: transparent;
    border-top: 4px solid;
    border-right: 4px solid;
    border-left: 4px solid;
    border-bottom: 4px solid;
    border-image-slice: 3%;
    cursor: pointer;
    color: white;
    border-radius: 5%;
  }

  .chalk-border1:hover {
    background-color: white;
    color: black;
  }
</style>