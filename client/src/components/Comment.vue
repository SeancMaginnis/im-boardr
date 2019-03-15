<template>
  <div>
    <ol>
      <li class="Comments text-white text-left offset-3" id="commentHover"
        @click="isClicked = !isClicked, subClicked = null">
        {{comment.description}}
      </li>
    </ol>
    <div v-if="isClicked">
      <button class="chalk-border1 mb-2" @click="deleteComment">Delete Comment</button>
      <subcomment-form :comment="comment" :task="task"></subcomment-form>
    </div>
    <ul v-for="subcomment in comment.subComments">
      <li class="text-white text-left offset-4" @click="subClicked = !subClicked, isClicked = null">
        {{subcomment.description}}</li>
      <button v-if="subClicked" class="chalk-border1" @click="deleteSubcomment(subcomment._id)">Delete</button>
    </ul>

  </div>
</template>

<script>
  import SubcommentForm from "@/components/subcommentForm.vue"
  export default {
    name: 'Comments',
    props: ['comment', 'task', 'boardId'],
    data() {
      return {
        isClicked: null,
        subClicked: null
      }
    },
    computed: {
    },
    methods: {
      deleteComment() {
        let payload = {
          boardId: this.boardId,
          comment: this.comment,
          task: this.task
        }
        this.$store.dispatch('deleteComment', payload)
      },
      deleteSubcomment(subId) {
        let payload = {
          boardId: this.boardId,
          comment: this.comment,
          task: this.task,
          Id: subId
        }
        this.$store.dispatch('deleteSubcomment', payload)
      }
    },
    components: {
      SubcommentForm
    }
  }
</script>


<style scoped>
  #comment {
    transition: all 0.3s linear;
  }

  #comment:hover {
    transform: scale(1.1);
    font-weight: bold
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