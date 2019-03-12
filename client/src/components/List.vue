<template>
  <div class="List">
    <div class="row justify-content-around">
      <div class="col-3 mt-4" v-for="list in lists">
        <div class="rounded card bg-light" id="list-card">
          <h3 class="p-2"><u>{{list.title}}</u></h3>
        </div>
        <tasks :listId="list._id"></tasks>
        <button class="btn btn-danger w-25 mt-3" @click="deleteList(list)">Delete</button>
      </div>
    </div>
  </div>
</template>
<script>
  import Tasks from "@/components/Task.vue"
  export default {
    name: 'list',
    computed: {
      lists() {
        return this.$store.state.lists
      }
    },
    methods: {
      deleteList(list) {
        this.$store.dispatch('deleteList', list)
      }
    },
    components: {
      Tasks
    }
  }
</script>

<style>
  #list-card {
    height: 60vh
  }
</style>