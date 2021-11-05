<template>
<div>
  <!-- Start Hero -->
  <section class="hero text-center bg-secondary mb-4 text-white">
    <div class="container">
      <h1 class="font-28 fw-600 text-uppercase">
        Upload a design
      </h1>
    </div>
  </section>
  <!-- End Hero -->

  <!-- Upload Shot -->
  <div class="container">
    <div class="row">
      <div class="col-md-6">
        <div class="card">
          <div class="card-body p-1" v-if="design.images.original_image">
            <img :src="design.images.original_image" alt="img" class="w-100 mb-4" />
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="card">
          <div class="card-body">
            <form class="auth-form" @submit.prevent="updateDesign">
              <AlertSuccess :form="form" :message="successMessage" v-if="successMessage"></AlertSuccess>
              <AlertError :form="form" v-if="form.errors.has('message')">
                {{form.errors.get('message')}}
              </AlertError>
              <div class="form-group">
                <input
                  type="text"
                  class="form-control form-control-lg font-14 fw-300"
                  placeholder="Title"
                  v-model="form.title"
                />
                <HasError :form="form" field="title"></HasError>
              </div>
              <div class="form-group">
                <BaseTextArea :form="form" v-model="form.description" placeholder="Description"></BaseTextArea>
              </div>
              <div class="form-group">
                <client-only>
                  <better-input-tag :tags="form.tags" placeholder="Tags separated by comma" on-paste-delimiter=","></better-input-tag>
                  <HasError :form="form" field="tags"></HasError>
                </client-only>
              </div>
              <template v-if="this.teams.length" >
                <div class="form-group custom-control custom-checkbox">
                  <input
                    @change="!form.assign_to_team ? form.team_id=null : ''"
                    type="checkbox"
                    class="custom-control-input"
                    id="assign_to_team"
                    v-model="form.assign_to_team"
                  />
                  <label
                    class="custom-control-label"
                    value="true"
                    for="assign_to_team"
                  >
                    Assign to team
                  </label>
                </div>
                <div class="form-group">
                  <select :disabled="!form.assign_to_team" class="custom-select" v-model="form.team_id" >
                    <option :value="null" disabled>--Select a team--</option>
                    <option v-for="(team, index) in teams" :key="index" :value="team.id">{{ team.name }}</option>
                  </select>
                  <HasError :form="form" field="team_id"></HasError>
                </div>
              </template>
              <div class="form-group custom-control custom-checkbox">
                <input
                  type="checkbox"
                  class="custom-control-input"
                  id="is_live"
                  v-model="form.is_live"
                />
                <label
                  class="custom-control-label"
                  value="true"
                  for="is_live"
                >
                  Publish this design
                </label>
              </div>

              <div class="text-right">
                <nuxt-link class="btn btn-secondary" :to="{ name: 'setting.designs' }"
                >Cancel</nuxt-link
                >
                <base-button :isBusy="form.busy">
                  Update Design
                </base-button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- End Upload Shot -->
</div>
</template>

<script>
import BetterInputTag from 'better-vue-input-tag'
export default {
  middleware: 'auth',
  name: "edit",
  components: {BetterInputTag},
  data(){
    return {
        form: this.$vform({
          title:'',
          description:'',
          team_id: null,
          tags: [],
          assign_to_team: false,
          is_live:false
        }),
      successMessage: ''
    }
  },
  methods: {
    async updateDesign(){
      this.successMessage = ''
      try {
        const res = await this.form.put(`/designs/${this.design.id}`)
        this.successMessage = res.data.message
        setTimeout(() => {
          this.$router.push({name: 'setting.designs'})
        }, 1500)
      }catch (e) {
        this.form.errors.set(e.response.data.errors)
      }
    }
  },
  async asyncData({$axios, params, error, redirect}) {
    try {
      const design = await $axios.get(`/designs/${params.id}/by-user`)
      const teams = await $axios.get(`users/teams`)
      return {design: design.data.data, teams: teams.data.data}
    }catch (e) {
      let status = e.response.status
      if(status === 401) {
        redirect('/login')
      }

        error({statusCode:status, message: e.response.data.message || e.response.data.errors.message})
  }
  },
  created() {
      this.form.title = this.design.title
      this.form.description = this.design.description
      this.form.is_live = this.design.is_live
      this.form.tags = this.design.tag_list.tags || []
      this.form.team_id = this.design.team?.id ?? null
      this.form.assign_to_team = this.form.team_id !== null
  }
}
</script>

<style scoped>

</style>
