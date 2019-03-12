<template>
  <div class="Tasks">
    <div v-for="task in tasks">
      {{task.title}}
      {{task.description}}
    </div>
  </div>
</template>


<script>
  export default {
    name: 'Tasks',
    props: ['listId'],
    data() {
      return {}
    },
    computed: {
      tasks() {
        return this.$store.state.tasks.filter(task => task.listId == this.listId)
      }
    },
    methods: {},
    components: {}
  }
</script>


<style>

</style>