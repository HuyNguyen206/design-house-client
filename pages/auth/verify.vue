<template>
  <!-- Section Cards -->
  <section class="authentication">
    <div class="auth-body">
      <h1 class="text-uppercase fw-500 mb-4 text-center font-22">
        Verify Verification Email
      </h1>
        <div v-if="success">
          <div class="alert alert-success" >
            {{message}}
          </div>
          <nuxt-link :to="{name: 'login'}">Proceed to login page</nuxt-link>
        </div>
        <div v-else class="alert alert-danger">
          {{message}}
        </div>
      </div>

  </section>
  <!-- End Cards -->
</template>

<script>
export default {
  middleware: 'auth',
  auth: 'guest',
  name: "verify",
  async asyncData({route, app}) {
    try {
      const res = await app.$axios.post(`${route.fullPath}`)
      return { message: res.data.message, success:true}
    }
    catch (err) {
      return { message: err.response.data.errors.message, success:false}
    }

  }
  // data() {
  //   return {
  //     messageSuccess: '',
  //     messageError: '',
  //     isShowMessage: false
  //   }
  // },
  // mounted() {
  //   this.$axios.post(`${this.$route.fullPath}`)
  //     .then(res => {
  //       this.messageSuccess = res.data.message
  //     })
  //   .catch(err => {
  //     this.messageError = err.response.data.errors.message
  //   })
  //   .then(res => {
  //     this.isShowMessage =  (this.messageSuccess !== ''|| this.messageError !== '')
  //   })
  // }
}
</script>

<style scoped>

</style>
