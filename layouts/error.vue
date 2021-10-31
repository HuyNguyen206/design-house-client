<template>
  <section class="authentication">
   <div class="auth-body text-center">
     <h1 class="text-uppercase fw-500 mb-4 text-center">
       <i class="fas fa-exclamation-triangle text-danger"></i>
       <span class="text-danger">
         Error {{error.statusCode}}
       </span>

     </h1>
     <p>{{error.message}}</p>
     <p class="font-14 fw-400 text-center mt-4">
       <NuxtLink to="/">Home page</NuxtLink>
     </p>
   </div>
  </section>
</template>

<script>
export default {
  name: "error",
  props: ['error']
}
</script>

<style scoped>

</style>
