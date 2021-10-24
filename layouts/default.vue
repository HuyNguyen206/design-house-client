<template>
  <div>
    <!-- Start Header -->
    <SiteNavigation></SiteNavigation>
    <!-- End Header -->

    <!-- Start Wrapper -->
    <div class="wrapper">
      <nuxt></nuxt>
    </div>

    <!-- Footer -->
    <SiteFooter></SiteFooter>
    <!-- End Footer -->
  </div>

</template>

<script>
import SiteNavigation from "~/layouts/partials/navigation";
import SiteFooter from "~/layouts/partials/footer"

export default {
  name: "default",
  components: {SiteNavigation, SiteFooter}
}
</script>

<style scoped>

</style>
