<template>
  <div class="navbar">
    <div class="row ml-5">
      <ul class="nav nav-pills">
        <li class="nav-item">
          <button class="btn btn-primary" :hidden="this.$route.path == '/'" @click="setBoards">Home</button>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true"
            aria-expanded="false">Dropdown</a>
          <div class="dropdown-menu">
            <a class="dropdown-item" href="#">Action</a>
            <a class="dropdown-item" href="#">Another action</a>
            <a class="dropdown-item" href="#">Something else here</a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" href="#">Separated link</a>
          </div>
        </li>
        <li class="nav-item">
          <button class="btn btn-outline-danger" @click="logout">LOGOUT</button>
        </li>
      </ul>
    </div>
  </div>

</template>

<script>
  export default {
    name: "navbar",
    methods: {
      logout() {
        this.$store.dispatch('logout')
      },

      setBoards() {
        this.$router.push('/')
      }
    }
  };
</script>

<style>
  .log {
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
  }
</style>