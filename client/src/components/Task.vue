<template>
  <div class="Tasks">
    <drag :transfer-data="task" class="text-white shadow col-10 offset-1 my-1" @mouseover="showButtons = 5"
      @mouseout="showButtons = null" id="task">
      <img style="height: 10px; width: 100%;" src="../assets/backgrounds/horizontal.png" />
      <h4 class="card-title">{{task.title}}: {{task.description}}</h4>
      <img src="../assets/backgrounds/eraser2.png" class="col-3 del" @click="deleteTask">
      <img style="height: 10px; width: 100%;" src="../assets/backgrounds/horizontal.png" />
      <form>
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
  .del {
    display: flex;
    justify-content: flex-start;
    transition: all 0.5s ease;
  }

  .del:hover {
    transform: rotate(-10deg);
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