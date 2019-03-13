<template>
  <div class="SubcommentForm">
    <form @submit.prevent="createSubcomment">
      <input v-model="makeSubcomment.description" type="text" placeholder="Description" />
      <button type="submit">Reply to comment</button>
    </form>
  </div>
</template>


<script>
  export default {
    name: 'SubcommentForm',
    props: ['task', 'comment'],
    data() {
      return {
        makeSubcomment: {},
      }
    },
    computed: {
    },
    methods: {
      createSubcomment() {
        let payload = {
          boardId: this.$store.state.activeBoard,
          task: this.task,
          comment: this.comment,
          content: {
            description: this.makeSubcomment.description,
            authorId: this.comment.authorId
          }
        }
        this.$store.dispatch('createSubcomment', payload)
      }
    },
  }
</script>


<style>
</style>