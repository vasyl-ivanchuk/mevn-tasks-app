<template>
  <v-dialog lazy v-model="visible" max-width="600px" class="text-xs-left">
    <v-card>
      <v-toolbar dark color="primary">
        <v-toolbar-title class="white--text">
          <span v-if="id">Edit Task</span>
          <span v-else>Create Task</span>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click="visible=false">
          <v-icon>close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-form ref="form" class="pa-4" v-model="valid" lazy-validation>
        <v-layout column>
          <v-flex xs12 class="py-2">
            <v-text-field
              v-model="description"
              counter
              label="Description*"
              required
              :rules="requiredRule"
            ></v-text-field>
          </v-flex>
          <v-flex align-self-start class="py-2">
            <v-menu>
              <v-text-field
                slot="activator"
                label="Due Date*"
                :value="formattedDate"
                :rules="requiredRule"
                readonly
              ></v-text-field>
              <v-date-picker v-model="date" no-title scrollable></v-date-picker>
            </v-menu>
          </v-flex>
        </v-layout>
      </v-form>
      <v-card-actions class="pa-4" theme-dark>
        <v-spacer></v-spacer>
        <v-btn class="white--text" color="blue darken-1" @click="saveTask">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import TaskService from '@/services/TaskService';

/* eslint-disable no-underscore-dangle */
export default {
  props: ['task'],
  data() {
    return {
      requiredRule: [v => !!v || 'Field is required'],
      valid: true,
      description: null,
      date: null,
      id: null,
      visible: false,
    };
  },
  computed: {
    formattedDate() {
      return this.$options.filters.formatDate(this.date);
    },
  },
  watch: {
    visible(newValue) {
      if (!newValue) {
        this.$emit('onClosed');
      }
    },
    task(newTask) {
      if (newTask) {
        if (this.$refs.form) {
          this.$refs.form.resetValidation();
        }
        this.description = newTask.description;
        this.date = newTask.dueDate;
        this.id = newTask._id;
        this.visible = true;
      }
    },
  },
  methods: {
    async saveTask() {
      if (this.$refs.form.validate()) {
        if (this.id) {
          const updatedTask = await TaskService.update({
            id: this.id,
            description: this.description,
            dueDate: this.date,
          });
          this.$store.dispatch('updateTask', updatedTask);
        } else {
          const createdTask = await TaskService.create({
            description: this.description,
            dueDate: this.date,
          });
          this.$store.dispatch('addTask', createdTask);
        }
        this.visible = false;
      }
    },
  },
};
</script>
