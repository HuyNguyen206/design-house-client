<template>
  <div>
     <textarea class="form-control form-control-lg font-14 fw-300"
               :rows="rows"
               :cols="cols"
               :class="{[`${customClass}`]: true}"
               :disabled="isBusy"
               :placeholder="placeholder"
               :value="value"
               @input="handleInput"
     >
  </textarea>
    <HasError :form="form" field="description"></HasError>
  </div>
</template>

<script>
export default {
  name: "TextArea",
  props: {
    form:{
      type:Object,
      require: true
    },
    value: {
      type:String,
      default:''
    },
    rows: {
      type: Number,
      default:5
    },
    cols: {
      type: Number,
      default:30
    },
    isBusy: {
      type: Boolean,
      default: false
    },
    customClass:{
      type: String,
      default:''
    },
    placeholder:{
      type: String,
      default: ''
    }
  },

  methods: {
    handleInput(e){
      this.$emit('input', e.target.value)
    }
  }


}
</script>

<style scoped>

</style>
