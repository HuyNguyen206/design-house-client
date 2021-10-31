<template>
  <button class="btn primary-bg-color font-16 fw-500 text-uppercase"
          :class="{[`btn-${type}`]: true, [`btn-${size}`]: true, 'btn-block': block, [`${customClass}`]: true}"
          :type="nativeType"
          :disabled="isBusy"
  >
    <slot></slot>
             <span v-if="isBusy">
              <i class="fas fa-spinner fa-spin"></i>
             </span>
  </button>
</template>

<script>
export default {
  name: "BaseButton",
  props: {
    type: {
      type: String,
      default: 'primary'
    },
    nativeType: {
      type: String,
      default: 'submit'
    },
    isBusy: {
      type: Boolean,
      default: false
    },
    block: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: 'sm'
    },
    customClass:{
      type: String,
      default:''
    }
  }

}
</script>

<style scoped>

</style>
