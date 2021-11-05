<template>
  <div class="user-account-setting">
    <div class="container">
      <div class="row">
        <!-- LEFT -->
        <div class="col-sm-3" id="myScrollspy">
          <div class="list-group">
            <nuxt-link
              class="list-group-item list-group-item-action"
              :to="{name:'setting.profile'}"
            >Update Profile</nuxt-link>
            <nuxt-link
              class="list-group-item list-group-item-action"
              :to="{name:'setting.password'}"
            >Change Password</nuxt-link>
            <nuxt-link
              class="list-group-item list-group-item-action"
              :to="{name:'setting.designs'}"
            >Designs</nuxt-link>

          </div>
        </div>

        <!-- RIGHT -->
        <div class="col-sm-9">
          <router-view></router-view>
        </div>
        <!-- END RIGHT -->
      </div>
    </div>
    <!-- END CONTAINER -->
  </div>
</template>

<script>
export default {
  middleware:'auth',
  name: "IndexDashboard"
}
</script>

<style scoped>
.router-link-exact-active {
  background-color: #007bff !important;
  color: white !important;
}
</style>
