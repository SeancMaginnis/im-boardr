<template>
  <div class="Tasks">
    <div class="card" id="task">
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
  #task {
    transition: all 0.3s linear
  }

  #task:hover {
    transform: rotate(360deg) scale(4);
  }
</style>