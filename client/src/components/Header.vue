<template>
    <v-toolbar dark color="primary">
        <v-toolbar-title class="white--text">Your tasks</v-toolbar-title>
        <v-spacer></v-spacer>
        <span>Hello, {{ fullName }}</span>
        <v-btn icon @click="logout">
            <v-icon>exit_to_app</v-icon>
        </v-btn>
    </v-toolbar>
</template>

<script>
export default {
  data() {
    return {
      fullName: this.$store.state.user.fullName,
    };
  },
  methods: {
    logout() {
      this.$store.dispatch('user/clearUser');
      this.$router.push({ name: 'login' });
    },
  },
};
</script>
