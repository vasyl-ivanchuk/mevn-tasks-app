<template>
  <v-card hover class="clickable" @click="$emit('itemClicked', task)">
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
          <v-spacer></v-spacer>
          <v-btn icon @click.stop="remove(task._id)">
            <v-icon>delete_outline</v-icon>
          </v-btn>
        </v-card-actions>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
import TaskService from '@/services/TaskService';

export default {
  props: ['task'],
  methods: {
    async remove(taskId) {
      await TaskService.delete(taskId);
      this.$store.dispatch('deleteTask', taskId);
    },
  },
};
</script>
