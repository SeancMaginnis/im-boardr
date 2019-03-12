<template>
  <div class="Tasks">
    <div>
      {{task.title}}
      {{task.description}}
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Tasks',
    props: ['task'],
    data() {
      return {}
    },
    computed: {
    },
    methods: {},
    components: {}
  }
</script>


<style>

</style>