<template>
  <div class="Tasks">
    <drag :transfer-data="task" class="text-white shadow col-10 offset-1 my-1 point" id="task">
      <img style="height: 10px; width: 100%;" src="../assets/backgrounds/horizontal.png" />
<<<<<<< HEAD
      <div @click="taskClick = !taskClick">
        <h4 class="card-title">{{task.title}}: {{task.description}}</h4><span class="chalk-border1 col-3 mb-2"
          @click="deleteTask">Delete</span>
        <img style="height: 10px; width: 100%;" src="../assets/backgrounds/horizontal.png" />
      </div>
=======
      <h4 class="card-title">{{task.title}}: {{task.description}}</h4>
      <img src="../assets/backgrounds/eraser2.png" class="col-3 del" @click="deleteTask">
      <img style="height: 10px; width: 100%;" src="../assets/backgrounds/horizontal.png" />
      <form>
        <comment-form :task="task"></comment-form>
      </form>

>>>>>>> ebfeb9805c5335c59194ddced51e2b557d92acbf
    </drag>
    <comment-form v-if="taskClick" :task="task"></comment-form>
    <comment v-for="comment in comments" :task="task" :comment="comment"></comment>
  </div>
</template>

<script>
  import Comment from "@/components/Comment.vue"
  import CommentForm from '@/components/commentForm.vue'
  export default {
    name: 'Tasks',
    props: ['task', 'boardId'],
    data() {
      return {
        taskClick: null
      }
    },
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
</style>