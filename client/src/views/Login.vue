<template>
  <div class="container-fluid bg">
    <div class="row">
      <div class="col-12 wel">
        <h1>Welcome to Chalkboard!</h1>
        <hr class="better">
      </div>
    </div>
    <div class="col-12 log">
      <div class="login">
        <form v-if="loginForm" @submit.prevent="loginUser">
          <div style="font-size:1.5em">
            <input type="email" v-model="creds.email" placeholder="email">
            <input type="password" v-model="creds.password" placeholder="password">
            <button type="submit" class="action btn1">Login</button>
          </div>
        </form>
        <form v-else @submit.prevent="register">
          <div class="fix">
            <input type="text" v-model="newUser.name" placeholder="User Name" required>
            <input type="email" v-model="newUser.email" placeholder="email" required>
            <input type="password" v-model="newUser.password" placeholder="Password" required>
            <button class="btn1" type="submit">Create
              Account</button>
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
    margin-top: 5vh;
    margin-bottom: 20vh
  }

  .btn1 {

    display: inline-block;
    padding: 1px, 1.6px;
    border: 3.5px solid rgb(0, 0, 0);
    text-decoration: none;
    font-weight: 300;
    color: rgb(0, 0, 0);
    text-shadow: 1px 1px 1px rgb(255, 255, 255);
    background-color: rgba(0, 0, 0, 0);
    text-align: center;
    transition: all 0.15s;
    box-sizing: border-box;
    margin-left: 10px
  }

  button.btn1:hover {
    text-shadow: 0 0 .01px rgb(0, 0, 0);
    color: rgb(255, 255, 255);
    border-color: rgb(255, 255, 255);
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