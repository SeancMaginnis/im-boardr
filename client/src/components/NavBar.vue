<template>
  <div class="navbar">
    <div class="row ml-5">
      <ul class="nav nav-pills">
        <li>
          <div class="mx-1 p-3 chalk-border" :hidden="this.$route.path == '/'" @click="setBoards" id="chalkFill">
            Home</div>
        </li>
        <!-- <li class="dropdown">
          <div class="mx-1 p-3 chalk-border dropdown-toggle mx-1" data-toggle="dropdown" href="#" role="button"
            aria-haspopup="true" aria-expanded="false" id="chalkFill">Dropdown</div>
          <div class="dropdown-menu">
            <a class="dropdown-item" href="#">Action</a>
            <a class="dropdown-item" href="#">Another action</a>
            <a class="dropdown-item" href="#">Something else here</a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" href="#">Separated link</a>
          </div>
        </li> -->
        <li>
          <div class="mx-1 p-3 chalk-border mx-1" @click="logout" id="chalkFill">LOGOUT</div>
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

<style scoped>
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

  .chalk-border {
    border-image: url('../assets/backgrounds/border.png');
    background-color: transparent;
    border-top: 4px solid;
    border-right: 4px solid;
    border-left: 4px solid;
    border-bottom: 4px solid;
    border-image-slice: 3%;
    cursor: pointer;
  }

  #chalkFill {
    background-color: transparent;
    transition: all 0.4s lineear;
    color: white;
    border-radius: 5%;
  }

  #chalkFill:hover {
    /* background-image: url('../assets/backgrounds/chalkFill.png'); */
    background-color: white;
    color: black;
  }
</style>