<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-card class="elevation-12" :loading="loading">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>Sign in</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form data-vv-scope="signInForm">
              <v-text-field
                v-model="username"
                label="Login"
                name="username"
                prepend-icon="person"
                type="text"
                v-validate="'required'"
                :error="errors.has('signInForm.username')"
                :disabled="loading"
                autofocus
              ></v-text-field>

              <v-text-field
                v-model="password"
                id="password"
                label="Password"
                name="password"
                prepend-icon="lock"
                type="password"
                v-validate="'required'"
                :error="errors.has('signInForm.password')"
                :disabled="loading"
              ></v-text-field>
            </v-form>
            <v-alert v-if="!loading && error"
                     type="error"
                     class="mb-4">
              {{ error }}
            </v-alert>
          </v-card-text>
          <v-card-actions>
            <span class="ml-3">
              No account?
              <router-link to="/register">Sign up</router-link>
            </span>
            <div class="flex-grow-1"></div>
            <v-btn color="primary" @click="signIn">Sign in</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import AuthService from '../services/AuthService';

export default {
  data() {
    return {
      username: '',
      password: '',
      loading: false,
      error: null,
    };
  },
  methods: {
    async signIn() {
      const valid = await this.$validator.validateAll('signInForm');
      if (!valid) {
        return;
      }

      this.error = null;
      this.loading = true;

      try {
        const { token, user } = await AuthService.authorize(this.username, this.password);

        AuthService.setUserTokenInLocalStorage(token);
        AuthService.setUserInLocalStorage(user);
        this.$store.commit('auth/setToken', token);
        this.$store.commit('auth/setUser', user);

        this.$router.push({ name: 'home' });
      } catch (err) {
        this.error = err.message || 'Something went wrong. Please try again later';
        console.error(err);
      }

      this.loading = false;
    },
  },
};
</script>
