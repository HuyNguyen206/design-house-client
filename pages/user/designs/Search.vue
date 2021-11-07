<template>
  <div>
    <section class="filters-block shadow-sm">
      <div class="container">
        <form @submit.prevent="search">
          <AlertError :form="form" v-if="form.errors.has('message')">{{ form.errors.get('message') }}</AlertError>
          <div class="filters d-flex justify-content-between align-items-center">
            <ul class="filters-dropdown">
              <li class="dropdown">
                <select @change="search" class="custom-select" v-model="form.order_by" style="width: 200px;">
                  <option value="latest">Latest First</option>
                  <option value="likes">Most Liked First</option>
                </select>
              </li>
            </ul>

            <div class="d-flex align-items-center">

              <div class="custom-control mr-3 custom-checkbox">
                <input type="checkbox" v-model="form.has_comment" true-value="1" false-value="0"
                       class="custom-control-input" id="hasComments">
                <label class="custom-control-label" for="hasComments">Has Comments</label>
              </div>

              <div class="custom-control custom-checkbox mr-3">
                <input type="checkbox" v-model="form.assign_to_team" true-value="1" false-value="0"
                       class="custom-control-input" id="hasTeam">
                <label class="custom-control-label" for="hasTeam">By Team</label>
              </div>

              <div>
                <div class="input-group mb-0">
                  <input type="text" class="form-control" v-model='form.key' placeholder="Search...">
                  <div class="input-group-append">
                    <BaseButton :isBusy="form.busy">Search</BaseButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
    <section class="cards-block">
      <div class="container">
        <div class="row">
          <BaseDesign v-for="(design, index) in designs" :key="design.id" :design="design"></BaseDesign>
        </div>
        <!-- END ROW -->
      </div>
      <!--/ End Container -->
    </section>
  </div>

</template>

<script>
export default {
  name: "Search",
  data() {
    return {
      form: this.$vform({
        is_live: false,
        has_comment: false,
        assign_to_team: false,
        key: '',
        order_by: 'latest'
      }),
      designs: []
    }
  },
  methods: {
    search() {
      this.form.post(`/search/design`)
        .then(res => {
          this.designs = res.data.data
        })
        .catch()
    }
  },
  beforeMount() {
    this.search()
  }
}
</script>

<style scoped>

</style>
