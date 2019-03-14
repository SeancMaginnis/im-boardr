<template>
  <div class="Tasks">
    <drag :transfer-data="task" class="card shadow col-10 offset-1 my-1" @mouseover="showButtons = 5"
      @mouseout="showButtons = null" id="task">
      <h4 class="card-title text-muted">{{task.title}}</h4>
      <p class="card-body">{{task.description}}</p>
      <form>
        <button class="btn btn-delete col-3 mb-2" @click="deleteTask">Delete</button>
        <comment-form :task="task"></comment-form>
      </form>
    </drag>
    <comment v-for="comment in comments" :task="task" :comment="comment"></comment>
  </div>
</template>

<script>
  import Comment from "@/components/Comment.vue"
  import CommentForm from '@/components/commentForm.vue'
  import Drag from '@/components/dragDrop/Drag.vue'
  import Drop from '@/components/dragDrop/Drop.vue'
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
      CommentForm,
      Drag,
      Drop
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

  .hover {
    transition-delay: 1s;
    transition: all 0.5s linear;
  }

  .drop.over {
    border-color: #aaa;
    background: #ccc;
  }
</style>