<template>
    <div class="setting-block" id="list-item-1">
      <div class="setting-title font-16 fw-500">
        Account Information
      </div>
      <div class="setting-body white-bg-color">
        <form action="" class="custom-form" @submit.prevent="updateProfile">
         <AlertError :form="form" v-if="form.errors.has('message')">{{form.errors.get('message')}}</AlertError>
         <AlertSuccess :form="form" v-if="successMessage">{{successMessage}}</AlertSuccess>
          <div class="row">
            <div class="col-md-6">
            <div class="form-group">
              <input type="text" class="form-control" v-model="form.name" placeholder="Name" >
              <HasError :form="form" field="name"></HasError>
            </div>
              <div class="form-group">
                <input type="text" class="form-control" v-model="form.tag_line" placeholder="Tag line" >
                <HasError :form="form" field="tag_line"></HasError>
              </div>
              <div class="form-group">
               <BaseGmap :init_formatted_address="form.formatted_address" @address-response="handleAddress"></BaseGmap>
                <HasError :form="form" field="formatted_address"></HasError>
              </div>
              <div class="form-group">
                <BaseTextArea :form="form" v-model="form.about" placeholder="Enter info about your self"></BaseTextArea>
                <HasError :form="form" field="about"></HasError>
              </div>

              <div class="form-group custom-control custom-checkbox">
                <input
                  type="checkbox"
                  class="custom-control-input"
                  id="available_to_hire"
                  v-model="form.available_to_hire"
                />
                <label
                  class="custom-control-label"
                  for="available_to_hire"
                >
                  Available to hire
                </label>
              </div>
              <div class="form-group">
                <base-button :isBusy="form.busy">
                  Update profile
                </base-button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
</template>

<script>
export default {
  middleware: 'auth',
  name: "dashboard",
  data(){
    return {
      form: this.$vform({
        name: '',
        about: '',
        tag_line:'',
        location: {},
        formatted_address:'',
        available_to_hire: false

      }),
      has_result: true,
      successMessage: ''
    }
  },
   mounted() {
      Object.keys(this.form).forEach(k => {
        if (this.$auth.user.hasOwnProperty(k)) {
          this.form[k] = this.$auth.user[k]
        }
      })
     this.form.location = {
        longitude: this.$auth.user.location.coordinates[0],
       latitude: this.$auth.user.location.coordinates[1]
     }
    },
  methods: {
    handleAddress(place) {
      console.log('result:', place)
      if(!place.has_result) {
        this.form.errors.set('formatted_address', 'No result was found')
        return
      }
      this.form.formatted_address = place.formatted_address
      this.form.location.longitude = place.longitude
      this.form.location.latitude = place.latitude
    },
    updateProfile(){
      this.successMessage = ''
      this.form.put(`/setting/profile`)
      .then(res => {
        this.successMessage = res.data.message
        let user = {...this.$auth.user}
        Object.keys(user).forEach(attr => {
          if (this.form.hasOwnProperty(attr)) {
            user[attr] = this.form[attr]
          }
        })
        this.$auth.setUser(user)
      })
      .catch(e => {

      })
    }
  }
}
</script>

<style scoped>

</style>
