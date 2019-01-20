<template>
  <div>
    <v-card>
      <page-header/>
      <v-layout>
        <v-flex>
          <v-container fluid grid-list-lg>
            <v-layout row wrap>
              <v-flex d-flex xs12 md6 lg3 v-for="task in tasks" :key="task._id">
                <task-card :task="task"></task-card>
              </v-flex>
            </v-layout>
          </v-container>
        </v-flex>
      </v-layout>
    </v-card>
  </div>
</template>
<script>
import TaskService from '@/services/TaskService';
import PageHeader from '@/components/Header';
import TaskCard from '@/components/TaskCard';

export default {
  components: {
    PageHeader,
    TaskCard,
  },
  computed: {
    tasks() {
      return this.$store.getters.getTasks;
    },
  },
  async mounted() {
    const tasks = await TaskService.getAll();
    this.$store.dispatch('setTasks', tasks);
  },
};
</script>
