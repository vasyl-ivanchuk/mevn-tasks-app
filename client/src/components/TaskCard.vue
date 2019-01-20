<template>
  <v-card>
    <v-layout justify-space-between column fill-height>
      <v-flex fill-height>
        <v-card-title primary-title>
          <span class="headline">{{ task.description }}</span>
        </v-card-title>
      </v-flex>
      <v-flex>
        <v-divider></v-divider>
        <v-card-actions class="pa-3">
          {{task.dueDate | formatDate}}
        </v-card-actions>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
export default {
  props: ['task'],
};
</script>
