<template>
  <section class="authentication">
    <div class="auth-body">
      <h1 class="text-uppercase fw-500 mb-4 text-center font-22">
        Register
      </h1>
      <form class="auth-form" @submit.prevent="register">
        <AlertSuccess :form="form" message="We have sent you an email to activate your account!" />
        <AlertError :form="form" v-if="form.errors.has('message')">
          {{form.errors.get('message')}}
        </AlertError>
        <div class="form-group">
          <input
            v-model.trim="form.name"
            type="text"
            name="name"
            class="form-control form-control-lg font-14 fw-300"
            placeholder="Full Name"
          />
          <HasError :form="form" field="name" />
        </div>
        <div class="form-group">
          <input
            v-model.trim="form.user_name"
            type="text"
            name="username"
            class="form-control form-control-lg font-14 fw-300"
            placeholder="Username"
          />
          <HasError :form="form" field="user_name" />
        </div>
        <div class="form-group">
          <input
            type="text"
            v-model.trim="form.email"
            name="email"
            class="form-control form-control-lg font-14 fw-300"
            placeholder="Email"
          />
          <HasError :form="form" field="email" />
        </div>
        <div class="form-group">
          <input
            type="password"
            v-model="form.password"
            name="password"
            class="form-control form-control-lg font-14 fw-300"
            placeholder="Password"
          />
          <HasError :form="form" field="password" />
        </div>
        <div class="form-group">
          <input
            type="password"
            v-model="form.password_confirmation"
            name="password_confirmation"
            class="form-control form-control-lg font-14 fw-300"
            placeholder="Confirm Password"
          />
        </div>

        <div class="text-right">
          <button :disabled="form.busy" type="submit" class="btn btn-primary primary-bg-color font-16 fw-500 text-uppercase">
            Register
            <span  v-if="form.busy">
              <i class="fas fa-spinner fa-spin"></i>
            </span>
          </button>
        </div>
        <p class="font-14 fw-400 text-center mt-4">
          Already have an account?
          <nuxt-link class="color-blue" :to="{name:  'login'}"> Login</nuxt-link>
        </p>
        <BaseList></BaseList>
      </form>
    </div>
  </section>
</template>

<script>
export default {
  name: "register",
  data() {
    return {
      form: this.$vform({
        user_name:'',
        name:'',
        email:'',
        password:'',
        password_confirmation:'',
      }),
    }
  },
  methods: {
    register(){
      this.errorMessage = ''
      this.form.post(`/register`)
      .then(res => {
      })
      .catch(err => {
      })
    }
  }
}
</script>

<style scoped>

</style>
