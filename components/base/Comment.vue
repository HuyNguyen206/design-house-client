<template>
  <li class="clearfix">
    <div
      class="comment-thumb float-left"
    >
      <a href="#">
        <img
          :src="comment.user.avatar_url"
          class="neba"
        />
      </a>
    </div>
    <div class="comment-meta">
      <h3
        class="font-16 fw-500 mb-2"
      >
        <a href="#" title="Neba"
        >{{ comment.user.name }}</a
        >
      </h3>
      <p
        class="font-14 fw-300 mb-2"
      >
        {{ comment.comment }}
      </p>
      <span class="font-14 fw-300 d-flex justify-content-between">
        <a href="#"> {{ comment.create_dates.created_at_human }}</a>
        <a v-if="$auth.loggedIn && comment.user.id === $auth.user.id" @click.prevent="deleteComment"  href="#" class="text-danger pointer-event">Delete</a>
      </span>
    </div>
  </li>
</template>

<script>
export default {
  name: "Comment",
  props: {
    comment: {
      type: Object,
      required: true
    },
    index:{
      type:Number,
      required:true
    }
  },
  methods:{
    deleteComment(){
      this.$axios.delete(`/comments/${this.comment.id}`)
      .then(res => {
        this.$emit('delete-comment', {index: this.index})
      })
    }
  }
}
</script>

<style scoped>

</style>
