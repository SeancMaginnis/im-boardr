<template>
  <div class="navbar">
    <div class="row ml-5">
      <ul class="nav nav-pills">
        <li>
          <button class="btn btn-outline-light mx-1" :hidden="this.$route.path == '/'" @click="setBoards">Home</button>
        </li>
        <li class="dropdown">
          <button class="btn btn-outline-light dropdown-toggle mx-1" data-toggle="dropdown" href="#" role="button"
            aria-haspopup="true" aria-expanded="false">Coming Soon</button>
          <div class="dropdown-menu">
            <a class="dropdown-item" href="#">Action</a>
            <a class="dropdown-item" href="#">Another action</a>
            <a class="dropdown-item" href="#">Something else here</a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" href="#">Separated link</a>
          </div>
        </li>
        <li>
          <button class="btn btn-outline-light mx-1" @click="logout">LOGOUT</button>
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

  .nav {
    position: fixed;
    z-index: 8;
    background-color: rgba(48, 47, 47, 0.822);
  }
</style>