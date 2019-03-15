<template>
  <div class="listForm col-10 offset-1">
    <form @submit.prevent="createList">
      <div class="col-12 justify-content-center">
        <span class="text-white listText float-left text-right col-5">Create List:</span>
        <input class="form-control col-2 form-text" v-model="makeList.title" type="text" placeholder="List Title" />
      </div>
      <img style="height: 12px; width: 100%;" src="../assets/backgrounds/horizontal.png" />
    </form>
  </div>
</template>


<script>
  export default {
    name: 'listForm',
    data() {
      return {
        makeList: {},
      }
    },
    computed: {
    },
    methods: {
      createList() {
        let id = this.$store.state.activeBoard
        let payload = {
          boardId: id,
          title: this.makeList.title
        }
        this.$store.dispatch('createList', payload)
      }
    },
  }
</script>


<style scoped>
  .chalk-border1 {
    border-image: url('../assets/backgrounds/border.png');
    background-color: transparent;
    border-bottom: 20px solid;
    border-image-slice: 3%;
    cursor: pointer;
  }

  .listText {
    font-size: 30px;
  }

  .form-text {
    font-size: 20px;
  }
</style>