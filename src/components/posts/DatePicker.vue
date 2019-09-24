<template>
  <v-dialog
    ref="dialog"
    v-model="modal"
    :value="modal"
    persistent
    width="290px"
  >
    <template v-slot:activator="{ on }">
      <v-text-field
        v-model="date"
        label="Select date"
        prepend-icon="event"
        readonly
        v-on="on"
      ></v-text-field>
    </template>
    <v-date-picker v-model="date" type="date">
      <div class="flex-grow-1"></div>
      <v-btn text color="primary" @click="modal = false">Cancel</v-btn>
      <v-btn text color="primary" @click="saveDate()">OK</v-btn>
    </v-date-picker>
  </v-dialog>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  data() {
    return {
      modal: false,
      date: '',
    };
  },
  computed: mapState({
    userId: state => state.posts.userIdFilter,
    dateFilter: state => state.posts.dateFilter,
  }),
  watch: {
    dateFilter(val) {
      this.date = val;
    },
  },
  methods: {
    ...mapMutations({
      setDateFilter: 'posts/setDateFilter',
    }),
    saveDate() {
      this.setDateFilter(this.date);
      this.modal = false;
      const queryParams = this.buildQueryParams();
      this.$router.push({
        name: 'posts',
        query: queryParams,
      });
      this.$emit('updated');
    },

    buildQueryParams() {
      const params = {};
      if (this.userId) {
        params.userId = this.userId;
      }
      if (this.dateFilter) {
        params.date = this.dateFilter;
      }
      return params;
    },
  },
};
</script>
