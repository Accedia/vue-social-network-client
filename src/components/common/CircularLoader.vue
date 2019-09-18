<template>
  <v-progress-circular indeterminate :color="color" :size="size"></v-progress-circular>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: 'primary',
    },
    size: {
      type: [String, Number],
      default: '24',
    },
  },
};
</script>
