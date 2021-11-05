<template>
  <div class="setting-block" id="list-item-1">
    <div class="setting-title font-16 fw-500">
     Designs
    </div>
    <div class="setting-body white-bg-color">
     <table class="table table-striped">
       <thead>
       <tr>
         <td>
          STT
         </td>
         <td>Title</td>
         <td>Image</td>
         <td>Description</td>
         <td>Status</td>
         <td>Created at</td>
         <td>Action</td>
       </tr>
       </thead>
       <tbody>
       <tr v-for="(design, index) in designs" :key="design.id">
         <td>{{index+=1}}</td>
         <td>{{design.title}}</td>
         <td><img v-if="design.has_image" :src="design.images.original_image" width="100" alt=""></td>
         <td>{{design.description}}</td>
         <td>{{design.is_live ? 'Public' : 'Draft'}}</td>
         <td>{{design.create_dates.created_at_human}}</td>
         <td>
           <div class="btn btn-group">
             <nuxt-link :to="{name: 'user.design.edit', params:{id: design.id}}" class="btn btn-primary">Edit</nuxt-link>
             <a href="" class="btn btn-danger">Delete</a>
           </div>
         </td>
       </tr>
       </tbody>
     </table>
    </div>
  </div>
</template>

<script>
export default {
  middleware: 'auth',
  name: "design",
  async asyncData({$axios, params, error, redirect, app}) {
    try {
      const res = await $axios.get(`/users/${app.$auth.user.id}/designs`)
      return {designs: res.data.data}

    }catch (e) {
      if(e.response.status === 401) {
        redirect('/login')
      }
      error({statusCode: e.response.status, message: e.response.data.message ||e.response.data.errors.message})
    }
  }
}
</script>

<style scoped>

</style>
