<template>
  <div class="container-fluid bg">
    <div class="row">
      <div class="col-12 wel">
        <h1>Welcome to Chalkboard!</h1>
        <hr class="better">
      </div>
    </div>
    <div class="row">
      <div class="col-12 mb-5 mt-5">
        <iframe width="560" height="315" src="https://www.youtube.com/embed/rvrZJ5C_Nwg" frameborder="0"
          allow="accelerometer; autoplay; picture-in-picture" allowfullscreen></iframe>
      </div>
      <div class="col-12 log">
        <div class="login">
          <form v-if="loginForm" @submit.prevent="loginUser">
            <div style="font-size:1.5em">
              <input type="email" v-model="creds.email" placeholder="email">
              <input type="password" v-model="creds.password" placeholder="password">
              <button type="submit" class="action btn1" style="background-color:rgb(67, 110, 160)">Login</button>
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
            <p v-if="loginForm">No account? Click here to Register</p>
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


  .bg {
    min-height: 100vh;
    background-image: url('../assets/backgrounds/black-chalkboard.jpg');

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
</style>