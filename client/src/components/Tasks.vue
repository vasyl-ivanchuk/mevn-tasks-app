<template>
  <div>
    <v-card>
      <page-header/>
      <v-layout>
        <v-flex>
          <v-container fluid grid-list-lg>
            <v-layout row wrap>
              <v-flex d-flex xs12 md6 lg3>
                <create-task-card @itemClicked="selectTask"/>
              </v-flex>
              <v-flex d-flex xs12 md6 lg3 v-for="task in tasks" :key="task._id">
                <task-card @itemClicked="selectTask" :task="task"></task-card>
              </v-flex>
            </v-layout>
          </v-container>
          <edit-task :task="selectedTask" @onClosed="clearSelectedTask"></edit-task>
        </v-flex>
      </v-layout>
    </v-card>
  </div>
</template>
<script>
import PageHeader from '@/components/Header';
import EditTask from '@/components/EditTask';
import TaskCard from '@/components/TaskCard';
import CreateTaskCard from '@/components/CreateTaskCard';

export default {
  components: {
    PageHeader,
    EditTask,
    TaskCard,
    CreateTaskCard,
  },
  data() {
    return {
      selectedTask: null,
    };
  },
  computed: {
    tasks() {
      return this.$store.getters['tasks/getTasks'];
    },
  },
  async mounted() {
    await this.$store.dispatch('tasks/loadTasks');
  },
  methods: {
    clearSelectedTask() {
      this.selectedTask = null;
    },
    selectTask(task) {
      this.selectedTask = task || {};
    },
  },
};
</script>

<style>
.clickable {
  cursor: pointer;
}

.create-card {
  min-height: 100px;
}
</style>
