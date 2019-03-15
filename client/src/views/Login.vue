<template>
  <div class="container-fluid bg zIndex">
    <div class="overlay"></div>
    <video loop muted autoplay id="loginVideo">
      <source src="../assets/backgrounds/loginVideo.mp4" type="video/mp4">
    </video>
    <div class="row">
      <div class="col-12 wel zIndex mt-5">
        <h1>Welcome to Chalkboard!</h1>
        <hr class="better">
      </div>
    </div>
    <div class="row mt-5">
      <div class="col-12 mb-5 mt-5 zIndex">
      </div>
      <div class="col-12 mt-5 log zIndex">
        <div class="login">
          <form v-if="loginForm" @submit.prevent="loginUser">
            <div class="zIndex" style="font-size:1.5em">
              <input class="mx-3" type="email" v-model="creds.email" placeholder="email">
              <input class="mx-3" type="password" v-model="creds.password" placeholder="password">
              <button type="submit" class="action btn1 zIndex" style="background-color:rgb(67, 110, 160)">Login</button>
            </div>
          </form>
          <form v-else @submit.prevent="register">
            <div class="fix">
              <input type="text" v-model="newUser.name" placeholder="User Name" required>
              <input type="email" v-model="newUser.email" placeholder="email" required>
              <input type="password" v-model="newUser.password" placeholder="Password" required>
              <button class="btn1" style="background-color:rgb(67, 110, 160)" type="submit">Create Account</button>
            </div>
          </form>
          <div class="action" @click="loginForm = !loginForm">
            <p class="mt-2" v-if=" loginForm">No account? Click here to Register</p>
            <p v-else>Already have an account? Click here to Login</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import router from '@/router.js'
  export default {
    name: "login",
    data() {
      return {
        hover: false,
        loginForm: true,
        creds: {
          email: "",
          password: ""
        },
        newUser: {
          email: "",
          password: "",
          name: ""
        }
      };
    },
    methods: {
      register() {
        this.$store.dispatch("register", this.newUser);
      },
      loginUser() {
        this.$store.dispatch("login", this.creds);
      }

    }
  };
</script>

<style>
  .action {
    cursor: pointer;
    color: white;
    text-shadow: .25px .25px .25px rgba(255, 255, 255, 0.671);
    font-weight: 300
  }

  .log {
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: 'Walter Turncoat', cursive;
    text-decoration: none;
  }

  .wel {
    color: white;
  }

  .btn1 {

    display: inline-block;
    padding: 1px, 1.6px;
    border: 3.5px solid black;
    text-decoration: none;
    font-weight: 300;
    color: black;
    text-shadow: 0 1px 1px rgba(0, 0, 0, 0.35);
    background-color: black;
    text-align: center;
    transition: all 0.15s;
    box-sizing: border-box;
    margin-left: 10px
  }

  button.btn1:hover {
    text-shadow: 0 0 .01px rgba(255, 255, 255, 1);
    color: white;
    border-color: white;
  }

  .better {
    background-image: url('../assets/backgrounds/horizontal.png');
    height: 10px;
    width: 35em;
  }

  .fix {
    min-width: 100px;
    font-size: 1.5em
  }

  #loginVideo {
    top: 0;
    left: 0;
    position: absolute;
    background-position: center;
    min-height: 100vh;
    overflow: hidden;
    background-repeat: no-repeat;
    z-index: 0;

  }

  .overlay {
    position: absolute;
    background: rgba(38, 38, 38, 0.523);
    height: 100vh;
    width: 100vw;
    left: 0;
    top: 0;
    z-index: 1;
  }

  .zIndex {
    z-index: 10;
  }
</style>