<template>
  <!-- Section Cards -->
  <section class="authentication">
    <div class="auth-body">
      <h1 class="text-uppercase fw-500 mb-4 text-center font-22">
        Resend Verification Email
      </h1>
      <form class="auth-form" @submit.prevent="resend">
        <AlertSuccess :form="form" :message="successMessage" />
        <AlertError :form="form" v-if="form.errors.has('message')">
          {{form.errors.get('message')}}
        </AlertError>
        <div class="form-group">
          <input
            type="text"
            name="email"
            class="form-control form-control-lg font-14 fw-300"
            placeholder="Email"
            v-model.trim="form.email"
          />
          <HasError :form="form" field="email" />
        </div>

        <div class="text-right">
          <button type="submit" :disabled="form.busy" class="btn btn-primary primary-bg-color font-16 fw-500 text-uppercase">
            Resend
            <span v-if="form.busy">
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
  name: "resend",
  data(){
    return {
      form: this.$vform({
        email: ''
      }),
      successMessage: ''
    }
  },
  methods:{
    resend(){
      this.form.post(`/verification/resend`)
      .then(res => {
        this.successMessage = res.data.message
      })
    }
  }
}
</script>

<style scoped>

</style>
