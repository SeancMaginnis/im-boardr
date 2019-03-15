<template>
  <div class="SubcommentForm">
    <form @submit.prevent="createSubcomment">
      <input class="rounded p-1" v-model="makeSubcomment.description" type="text" placeholder="Description" />
      <button class="chalk-border2 mx-2" type="submit">Reply to comment</button>
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
</style>