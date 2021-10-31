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
          <div class="card-body p-1">
            <img src="design.images.large" alt="img" class="w-100 mb-4" />
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="card">
          <div class="card-body">
            <form class="auth-form" >
              <AlertError :form="form" v-if="form.errors.has('message')">
                {{form.errors.get('message')}}
              </AlertError>
              <div class="form-group">
                title
              </div>
              <div class="form-group">
                description
              </div>
              <div class="form-group">
                tags
              </div>
              <template v-if="this.teams.length" >
                <div class="form-group custom-control custom-checkbox">
                  <input
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
                <nuxt-link :to="{ name: 'settings.designs' }"
                >Cancel</nuxt-link
                >
                <base-button >
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
export default {
  name: "edit",
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
    }
  },
  methods: {
    submit(){

    }
  },
  async asyncData({$axios, params, error, redirect}) {
    try {
      const design = await $axios.get(`/designs/${params.id}`)
      const teams = await $axios.get(`users/teams`)
      return {design: design.data.data, teams: teams.data.data}
    }catch (e) {
      console.log(e.response)
        error({statusCode:e.response.status, message: e.response.data.message || e.response.data.errors.message})
  }
  },
  created() {
      this.form.title = this.design.title
      this.form.description = this.design.description

      this.form.tags = this.design.tag_list.tags || []
      this.form.team_id = this.design.team?.team_id
      this.assign_to_team = this.form.team_id !== null
  }
}
</script>

<style scoped>

</style>
