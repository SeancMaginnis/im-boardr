<template>
  <div class="Comments">
    <subcomment-form :comment="comment" :task="task"></subcomment-form>
    {{comment.description}}
    <div v-for="subcomment in comment.subComments">
      <div>{{subcomment.description}}</div>
      <button class="btn btn-info" @click="deleteSubcomment(subcomment._id)">delete SUBCOMMENTS</button>
    </div>
    <div>
      <button class="btn btn-danger" @click="deleteComment">Delete Comment</button>
    </div>

    <!-- <button class="btn btn-secondary">get Comments</button>
      -->

  </div>
  </div>
</template>

<script>
  import SubcommentForm from "@/components/subcommentForm.vue"
  export default {
    name: 'Comments',
    props: ['comment', 'task', 'boardId'],
    data() {
      return {}
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


<style>
</style>