<template>
  <v-img :src="src" :width="width" @click="handleClick">
    <template v-slot:placeholder
      fill-height
      align-center
      justify-center
      ma-0
    >
      <v-progress-circular
        size="20"
        :width="2"
        indeterminate
        :color="`${loaderColor}`"></v-progress-circular>
    </template>
  </v-img>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      default: '',
    },
    width: {
      type: [String, Number],
    },
    loaderColor: {
      type: String,
      default: 'grey darken-5',
    },
  },
  methods: {
    handleClick(e) {
      this.$emit('click', e);
    },
  },
};
</script>
