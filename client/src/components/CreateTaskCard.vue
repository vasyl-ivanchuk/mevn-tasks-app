<template>
  <v-card
    hover
    theme-dark
    color="primary"
    class="white--text clickable"
    @click="$emit('itemClicked')"
  >
    <v-layout fill-height justify-center class="create-card">
      <v-icon x-large color="white">add</v-icon>
    </v-layout>
  </v-card>
</template>
