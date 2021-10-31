<template>
  <section class="authentication">
    <div class="auth-body">
      <h1 class="text-uppercase fw-500 mb-4 text-center font-22">
        Login
      </h1>
      <form @submit.prevent="login" class="auth-form" action="" method="">
        <AlertSuccess :form="form" :message="successMessage" />
        <AlertError :form="form" v-if="form.errors.has('message')">
          {{form.errors.get('message')}}
          <nuxt-link :to="{name: 'email.verify.resend'}">Resend verification email</nuxt-link>
        </AlertError>

        <div class="form-group">
          <input
            type="text"
            name="email"
            class="form-control form-control-lg font-14 fw-300"
            placeholder="Email"
            v-model="form.email"
          />
          <HasError :form="form" field="email" />
        </div>
        <div class="form-group">
          <input
            type="password"
            name="password"
            class="form-control form-control-lg font-14 fw-300"
            placeholder="Password"
            v-model="form.password"
          />
          <HasError :form="form" field="password" />
        </div>
        <div class="mt-4 mb-4 clearfix">
          <nuxt-link :to="{name: 'password.email'}" class="forgot-pass color-blue font-14 fw-400" href="#"> Forgot password? </nuxt-link>
        </div>
        <div class="text-right">
          <BaseButton :isBusy="this.isBusy">Login</BaseButton>
        </div>
        <p class="font-14 fw-400 text-center mt-4">
          Don't have an account yet?
          <nuxt-link class="color-blue" :to="{name: 'register'}"> Create an account</nuxt-link>
        </p>

      </form>
    </div>
  </section>
</template>

<script>
export default {
  middleware: 'auth',
  auth: 'guest',
  name: "login",
  data(){
    return {
      form: this.$vform({
        email: '',
        password:''
      }),
      isBusy: false,
      successMessage:'',

    }
  },
  methods:{
    login(){
      this.successMessage = '';
      this.isBusy = true;
      this.$auth.loginWith('local', {
        data: this.form
      })
      .then(res => {
        this.form.errors.set({})
        this.successMessage = res.data.message
      })
      .catch(err => {
        // if (err.response.status == 422) {
          this.form.errors.set(err.response.data.errors)
        // }
        // else {
        //   this.form.errors.set({})
        // }
      })
      .then(res => {
        this.isBusy = false;
      })
    }
  }
}
</script>

<style scoped>

</style>
