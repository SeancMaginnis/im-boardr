<template>
  <div class="Tasks">
    <div class="card d-flex justify-content-center" id="task">
      <h4 class="card-title">{{task.title}}</h4>
      <p class="card-body">{{task.description}}</p>
      <button class="btn btn-delete col-4 offset-4 mb-2" @click="deleteTask">Delete</button>
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
  .btn-delete {
    background-color: rgb(249, 60, 60);
    color: white;
  }
</style>