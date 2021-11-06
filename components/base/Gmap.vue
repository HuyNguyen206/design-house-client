<template>
  <client-only>
    <gmap-autocomplete @place_changed="handleChange"
                       :selectFirstOnEnter="true"
                       :options="{
                  types:['address']

   }">
      <template v-slot:input="slotProps">
        <input type="text"
               ref="input"
               :value="init_formatted_address"
               class="form-control"
               v-on:listeners="slotProps.listeners"
               v-on:attrs="slotProps.attrs"
        >
      </template>
    </gmap-autocomplete>
  </client-only>
</template>

<script>
export default {
  name: "gmap",
  props: {
    init_formatted_address:{
      type:String,
      require:true
    }
  },
  data() {
    return {
      formatted_address: ''
    }
  },
  methods: {
    handleChange(place) {
      console.log(place)
      let returnData = {}
      returnData.has_result = true
      if (!place || place == undefined || !place.geometry || place.address_components == undefined) {
        returnData.has_result = true
        this.$emit('address-response', returnData)
        return
      }
      if(place.address_components !== undefined) {
        returnData.latitude = place.geometry.location.lat()
        returnData.longitude = place.geometry.location.lng()
        returnData.formatted_address = place.formatted_address
        this.$emit('address-response', returnData)
        return
      }
      returnData.formatted_address = this.init_formatted_address
      this.$emit('address-response', returnData)

    }
  }
}
</script>

<style scoped>

</style>
