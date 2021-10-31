<template>
  <div>
    <!-- Start Hero -->
    <section class="hero text-center bg-secondary text-white">
      <div class="container">
        <h1 class="font-28 fw-600 text-uppercase">
          Upload a design
        </h1>
      </div>
    </section>
    <!-- End Hero -->

    <!-- Upload Shot -->
    <div class="upload-shot">
      <div class="container">
        <div
          class="row justify-content-center align-items-center text-center"
        >
          <div class="col-md-6">
            <div class="card bg-white shadow-sm">
              <div class="d-flex flex-column justify-content-center p-1" style="height: 300px">
                <div class="alert alert-danger" v-if="error">
                  {{ error }}
                </div>
                <slim :options="slimOption">
                  <input type="file" name="image">
                </slim>
                <div class="text-success caption-sm mt-2" v-if="uploading">
              <span>
              <i class="fas fa-spinner fa-spin"></i>
             </span>
                </div>
              </div>
            </div>
            <div class="upload-para mt-2">
              <p class="font-14 fw-400">
                Your image dimension must be at least 800px x 600px in size.
                Also the image size should be a maximum of 2MB. Please resize your file accordingly before upload.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- End Upload Shot -->
  </div>
</template>

<script>
import Slim from '~/plugins/slim/slim.vue'

export default {
  middleware: 'auth',
  name: "create",
  components: {Slim},
  data() {
    return {
      slimOption: {
        service: this.slimService,
        post: 'output',
        defaultInputName: 'image',
        minSize: '800,600',
        label: 'Select Image...',
        maxFileSize:2 //value is 2MB
      },
      uploading: false,
      error: ''
    }
  },
  methods: {
    async slimService(formdata, progress, success, failure, slim) {
      this.uploading = true;
      try {
        const res = await this.$axios.post('designs', formdata)
        this.$router.push({name: 'user.design.edit', params:{id: res.data.data.id}})
      }catch (e) {
        failure(500)
        if (e.response.status !== 422) {
          this.error = e.response.data.errors.message
        } else {
          this.error = e.response.data.errors.image[0]
        }
      }finally {
        this.uploading = false
      }

    }
  }

}
</script>

<style scoped>

</style>
