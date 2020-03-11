<template>
  <div class="container">
    <div class="title">
      <h1>Create A random table</h1>
    </div>
    <Table v-bind:table="{}" v-bind:is_editable="false"></Table>
  </div>
</template>

<script>
import Axios from 'axios';
import Vue from 'vue';
import Table from '../components/Table.vue';

export default {
  components: {
    Table,
  },
};
</script>
