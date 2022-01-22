<template>
  <div>
    <div class="stats-txt d-table-cell w-50">
      <p class="alert alert-danger" v-if="errorMessage">{{ errorMessage }}</p>
      <a href="#" @click.prevent="toggleLike" :class="likeColor"> <span><i class="fa fa-heart"
                                                                           :class="likeColor"> </i> </span>
        Like
      </a>
    </div>
    <div class="stats-num d-table-cell w-50 text-right">
      <a href="#">{{ design.like.count }} Likes</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "DesignLike",
  data(){
    return {
      errorMessage: ''
    }
  },
  methods: {
    toggleLike() {
      this.$axios.post(`/likes/toggle/${this.design.id}/design`)
        .then(res => {
          this.$emit('toggle-like', res.data.data)
        })
        .catch(e => {
          this.errorMessage = e.response.data.message ?? e.response.data.errors.message
        })
    }
  },
  props: {
    design: {
      type: Object,
      required: true
    }
  },
  computed: {
    likeColor() {
      return this.design.like.is_like_by_current_user ? 'like-color' : ''
    }
  }
}


</script>

<style scoped>
.like-color {
  color: green;
}
</style>
