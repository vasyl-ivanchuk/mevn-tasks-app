<template>
  <v-layout row wrap>
    <v-flex xs6 offset-xs3>
      <v-card>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-toolbar dark color="primary">
            <v-toolbar-title class="white--text">Login</v-toolbar-title>
          </v-toolbar>
          <div class="pa-4">
            <v-text-field v-model="email" :rules="emailRules" label="E-mail" required>
            </v-text-field>
            <v-text-field
              v-model="password"
              :rules="passwordRules"
              label="Password"
              type="password"
              required
            ></v-text-field>
            <v-alert :value="serverError" color="error">{{ serverError }}</v-alert>
            <v-btn color="primary" class="mt-3" block large @click.prevent="login" type="submit">
              Login
            </v-btn>
          </div>
        </v-form>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      valid: true,
      password: '',
      passwordRules: [v => !!v || 'Password is required'],
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v =>
          /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/.test(v) ||
          'E-mail must be valid',
      ],
      serverError: '',
    };
  },
  methods: {
    async login() {
      this.serverError = '';
      if (this.$refs.form.validate()) {
        try {
          await this.$store.dispatch('loginUser', {
            email: this.email,
            password: this.password,
          });

          this.$router.push({
            name: 'tasks',
          });
        } catch (error) {
          this.serverError =
            error.message ||
            'Something went wrong, please try again later or contact us via an email.';
        }
      }
    },
  },
};
</script>
