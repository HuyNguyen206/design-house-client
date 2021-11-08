<template>
  <section class="post-details mt-4 pb-5">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-9">
          <div class="row">
            <!-- LEFT -->
            <div class="col-md-8">
              <!-- Single Image -->
              <div class="post-detail">
                <div class="single-img">
                  <img v-if="design.has_image"
                       :src="design.images.original_image"
                       alt="Image"
                  />
                </div>
              </div>
              <!-- End Single Image -->
              <!-- Design Detail Text -->
              <div
                class="desing-text font-16 fw-400 pb-3 pt-2"
              >
                <p>
                  {{ design.description }} developed by
                  <a href="#">{{ design.user.name }}</a>
                </p>
              </div>
              <!-- End Design Detail Text -->
              <!-- Design Comments -->
              <div class="design-comments mt-3">
                <h1 class="font-16 fw-300 mb-4">
                  <strong class="fw-500"
                  >{{ design.comments ? design.comments.length : 0 }} Responses</strong
                  >
                  (page 1 of 2)
                </h1>
                <ul class="comment-list" v-if="design.comments">
                  <BaseComment @delete-comment="handleDeleteComment" v-for="(comment, index) in design.comments"
                               :comment="comment" :key="comment.id" :index="index"></BaseComment>
                </ul>
              </div>
              <!--/ END COMMENTS-->
              <template v-if="$auth.loggedIn">
                <form action="" @submit.prevent="postComment">
                  <AlertError :form="form" v-if="form.errors.has('message')"> {{ form.errors.get('message') }}
                  </AlertError>
                  <div class="form-group">
                    <input
                      type="text"
                      class="form-control form-control-lg font-14 fw-300"
                      placeholder="Comment"
                      v-model="form.comment"
                    />
                    <HasError :form="form" field="comment"></HasError>
                  </div>

                  <base-button :isBusy="form.busy">
                    Post comment
                  </base-button>
                </form>
              </template>
            </div>

            <!-- RIGHT -->
            <div class="col-md-4">
              <div class="post-detail-sidebar">
                <!-- Designer info -->
                <div class="modal-user-meta white-bg-color">
                  <a class="float-left" href="#" title="Neba">
                    <img :src="design.user.avatar_url" alt="Neba"/>
                  </a>
                  <div class="modal-user-detail">
                    <h1 class="font-13 fw-500">
                      <a href="#">
                        {{ design.user.name }}
                      </a>
                    </h1>
                    <p class="font-12 fw-300 mt-1">
                      <span class="shot-by">  {{ design.user.tag_line }}</span>
                    </p>
                    <p class="font-12 fw-300  mt-1">
                      {{ design.create_dates.created_at_human }}
                    </p>
                  </div>
                </div>
                <!-- End Designer info -->
                <!-- Designer Design Info -->
                <ul class="details-side-meta font-14 fw-400">
                  <li class="d-table w-100">
                    <DesignLike :design="design" @toggle-like="handleToggleLike"></DesignLike>
<!--                    <div class="stats-txt d-table-cell w-50">-->
<!--                      <p class="alert alert-danger" v-if="errorMessage">{{errorMessage}}</p>-->
<!--                      <a href="#" @click.prevent="toggleLike" :class="likeColor"> <span><i class="fa fa-heart" :class="likeColor"> </i> </span>-->
<!--                        Like-->
<!--                      </a>-->
<!--                    </div>-->
<!--                    <div class="stats-num d-table-cell w-50 text-right">-->
<!--                      <a href="#">{{ design.like.count }} Likes</a>-->
<!--                    </div>-->
                  </li>

                  <li class="d-table w-100">
                    <div class="stats-txt d-table-cell w-100">
                      <a href="#">
                        More from {{ design.user.name }}
                      </a>
                    </div>
                  </li>

                </ul>
                <!-- End Designer Design Info -->
                <!-- Designer More Designs -->
                <div class="more-designs-outer pb-3" v-if="design.user.designs">
                  <ul class="more-designs row">
                    <li class="col-md-6" v-for="similarDesign in design.user.designs" :key="similarDesign.id">
                      <nuxt-link :to="{name: 'designs.detail', params:{slug:similarDesign.slug}}">
                        <img
                          class="w-100"
                          :src="similarDesign.images.original_image"
                          alt="Image"
                        />
                      </nuxt-link>
                    </li>
                  </ul>
                </div>
                <!-- End Designer More Designs -->
                <!-- Designs Tags -->
                <div class="designs-tag-outer mt-3">
                  <h2 class="font-16 fw-500 mb-2">
                    Tags
                  </h2>
                  <div class="designs-tag font-14 fw-300">
                    <a v-for="tag in design.tag_list.normalize" :key="tag" :title="tag">{{ tag }}</a>
                  </div>
                </div>
                <!-- End Designs Tags -->
              </div>
            </div>
            <!--/ END RIGHT-->
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import DesignLike from "~/components/DesignLike";
export default {
  name: "detail",
  components: {DesignLike},
  data() {
    return {
      form: this.$vform({
        comment: '',
        design_id: null
      })
    }
  },
  async asyncData({route, app, error}) {
    try {
      const res = await app.$axios.get(`/designs/slug/${route.params.slug}`)
      return {design: res.data.data}
    } catch (e) {
      error({statusCode: e.response.status, message: e.response.data.message ?? e.response.data.errors.message})
    }

  },
  methods: {
    handleDeleteComment(arg) {
      this.design.comments.splice(arg.index, 1)
    },
    postComment() {
      this.form.post(`/comments`)
        .then(res => {
          this.design.comments.push(res.data.data)
          this.form.reset()
        })
    },
    handleToggleLike(design){
      this.design = design
    }
  },
  created() {
    this.form.design_id = this.design.id
  },
}
</script>

<style scoped>
</style>
