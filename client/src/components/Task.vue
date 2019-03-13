<template>
  <div class="Tasks">
    <div class="card" id="task">
      {{task.title}}
      {{task.description}}
      <button @click="deleteTask" class="btn btn-secondary">Delete Task</button>
    </div>
    <comment-form :task="task"></comment-form>
    <comment v-for="comment in comments" :task="task" :comment="comment"></comment>
  </div>
</template>

<script>
  import Comment from "@/components/Comment.vue"
  import CommentForm from '@/components/commentForm.vue'
  export default {
    name: 'Tasks',
    props: ['task', 'boardId'],
    mounted() {
      this.task.boardId = this.boardId
      this.$store.dispatch('getComments', this.task)
    },
    computed: {
      comments() {
        return this.$store.state.comments[this.task._id]
      }
    },
    components: {
      Comment,
      CommentForm
    },
    methods: {
      deleteTask() {
        let payload = {
          boardId: this.boardId,
          task: this.task
        }
        this.$store.dispatch('deleteTask', payload)
      }
    }
  }
</script>

<style scoped>


</style>