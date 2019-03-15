<template>
  <div class="commentForm">
    <form class="my-3" @submit.prevent="createComment">
      <input class="p-1 rounded mx-2" v-model="makeComment.description" type="text" placeholder="Description" />
      <button class="chalk-border2 p-1 mx-1" type="submit">Comment</button>
    </form>
  </div>
</template>


<script>
  export default {
    name: 'commentForm',
    props: ['task'],
    data() {
      return {
        makeComment: {},
      }
    },
    computed: {
    },
    methods: {
      createComment() {
        let payload = {
          boardId: this.$store.state.activeBoard,
          task: this.task,
          content: this.makeComment
        }
        payload.content.taskId = payload.task._id
        this.$store.dispatch('createComment', payload)
      }
    },
  }
</script>


<style>
  .chalk-border2 {
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

  .chalk-border2:hover {
    background-color: white;
    color: black;
  }
</style>