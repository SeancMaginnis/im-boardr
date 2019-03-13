<template>
  <div class="commentForm">
    <form @submit.prevent="createComment">
      <input v-model="makeComment.description" type="text" placeholder="Description" />
      <button type="submit">Create Comment</button>
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
</style>