<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-card class="elevation-12" :loading="loading">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>Sign up</v-toolbar-title>
          </v-toolbar>
          <v-card-text v-if="success">
            <v-alert type="success" class="mb-4">
              You have signed up successfully.
              You will be redirected to the Sign In page in few seconds.
            </v-alert>
          </v-card-text>
          <v-card-text v-if="!success">
            <v-form data-vv-scope="signUpForm">
              <v-text-field
                v-model="username"
                label="Username"
                name="username"
                type="text"
                v-validate="'required'"
                :error="errors.has('signUpForm.username')"
                autofocus
              ></v-text-field>

              <v-text-field
                v-model="email"
                label="Email"
                name="email"
                type="email"
                v-validate="'required|email'"
                :error="errors.has('signUpForm.email')"
              ></v-text-field>

              <v-text-field
                v-model="password"
                id="password"
                label="Password"
                name="password"
                type="password"
                v-validate="'required'"
                :error="errors.has('signUpForm.password')"
              ></v-text-field>

              <v-text-field
                v-model="password2"
                id="password"
                label="Repeat password"
                name="password2"
                type="password"
                v-validate="{ required: true, is: password }"
                :error="errors.has('signUpForm.password2')"
              ></v-text-field>

              <v-checkbox
                v-model="acceptTerms"
                color="primary"
                name="acceptTerms"
                label="Accept terms and conditions"
                v-validate="'required:true'"
                :error="errors.has('signUpForm.acceptTerms')"
              ></v-checkbox>
            </v-form>

            <v-alert v-if="!loading && error"
                     type="error"
                     class="mb-4">
              {{ error }}
            </v-alert>
          </v-card-text>
          <v-card-actions v-if="!success">
            <span class="ml-3">
              Already have an account?
              <router-link :to="{name: 'sign-in'}">Sign in</router-link>
            </span>
            <div class="flex-grow-1"></div>
            <v-btn color="primary" @click="signUp">Sign up</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import SignUpService from '../services/SignUpService';

export default {
  data() {
    return {
      username: '',
      email: '',
      password: '',
      password2: '',
      acceptTerms: false,
      loading: false,
      success: false,
      error: null,
    };
  },
  methods: {
    async signUp() {
      const valid = await this.$validator.validateAll('signUpForm');
      if (!valid) {
        return;
      }

      this.error = null;
      this.loading = true;

      try {
        await SignUpService.signUp(this.username, this.email, this.password);
        this.success = true;
        setTimeout(this.redirectToSignInPage, 5000);
      } catch (err) {
        this.error = err.message || 'Something went wrong. Please try again later';
        console.error(err);
      }

      this.loading = false;
    },

    redirectToSignInPage() {
      this.$router.push({
        name: 'sign-in',
      });
    },
  },
};
</script>
