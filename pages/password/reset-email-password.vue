<template>
  <!-- Section Cards -->
  <section class="authentication">
    <div class="auth-body">
      <h1 class="text-uppercase fw-500 mb-4 text-center font-22">
        Resend Password Reset
      </h1>
      <form class="auth-form" @submit.prevent="sendEmailResetPass">
        <AlertSuccess :form="form">{{successMessage}}</AlertSuccess>
        <AlertError :form="form" v-if="form.errors.has('message')">{{form.errors.get('message')}}</AlertError>
        <div class="form-group">
          <input
            v-model.trim="form.email"
            type="text"
            name="email"
            class="form-control form-control-lg font-14 fw-300"
            placeholder="Email"
          />
        </div>
        <HasError :form="form" field="email"></HasError>

        <div class="text-center">
          <BaseButton :isBusy="form.busy" >Resend Password Reset Link</BaseButton>
        </div>
      </form>
    </div>
  </section>
  <!-- End Cards -->
</template>

<script>
export default {
  middleware: 'auth',
  auth: 'guest',
  name: "reset-email-password",
  data(){
    return {
      form: this.$vform({
            email: ''
      }),
      successMessage: ''
    }
  },
  methods: {
    sendEmailResetPass(){
      this.form.post(`password/email`)
      .then(res => {
        this.successMessage = res.data.message
      })
    }
  }
}
</script>

<style scoped>

</style>
