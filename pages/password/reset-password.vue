<template>
  <!-- Section Cards -->
  <section class="authentication">
    <div class="auth-body">
      <h1 class="text-uppercase fw-500 mb-4 text-center font-22">
        Reset Password
      </h1>
      <form class="auth-form" @submit.prevent="resetPass">
        <div class="form-group">
          <AlertError :form="form" v-if="form.errors.has('message')">{{form.errors.get('message')}}</AlertError>
          <AlertSuccess :form="form">
            {{successMessage}}
            <nuxt-link :to="{name: 'login'}">Proceed to login page</nuxt-link>
          </AlertSuccess>
          <input
            v-model.trim="form.email"
            type="text"
            name="email"
            disabled
            class="form-control form-control-lg font-14 fw-300"
            placeholder="Email"
          />
          <HasError :form="form" field="email"> </HasError>
        </div>
        <div class="form-group">
          <input
            v-model.trim="form.password"
            type="password"
            name="password"
            class="form-control form-control-lg font-14 fw-300"
            placeholder="Password"
          />
          <HasError :form="form" field="password"> </HasError>
        </div>
        <div class="form-group">
          <input
            v-model.trim="form.password_confirmation"
            type="password"
            name="password_confirmation"
            class="form-control form-control-lg font-14 fw-300"
            placeholder="Confirm New Password"
          />
        </div>

        <div class="text-right">
          <button :disabled="form.busy" type="submit" class="btn btn-primary primary-bg-color font-16 fw-500 text-uppercase">
            Reset Password
            <span  v-if="form.busy">
              <i class="fas fa-spinner fa-spin"></i>
            </span>
          </button>
        </div>
      </form>
    </div>
  </section>
  <!-- End Cards -->
</template>

<script>
export default {
  name: "reset",
  data(){
    return {
      form: this.$vform({
        email: this.$route.query.email,
        password: '',
        password_confirmation: '',
        token: this.$route.query.token
      }),
      successMessage: ''
    }
  },
  methods :{
    resetPass(){
      this.form.post(`password/reset`)
      .then(res => {
        this.successMessage = res.data.message
      })
    }
  }
}
</script>

<style scoped>

</style>
