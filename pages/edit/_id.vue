<template>
  <div class="container">
    <div class="row">
      <ul class="nav nav-tabs">
        <li class="nav-item" v-on:click="switchTabs(true)">
          <a href="#" v-bind:class="activeClass(tabs_switch)">Edit the table</a>
        </li>
        <li class="nav-item" v-on:click="switchTabs(false)">
          <a href="#" v-bind:class="activeClass(!tabs_switch)">Edit the rows</a>
        </li>
      </ul>
    </div>
    <div class="tabs" v-if="tabs_switch">
      <h2>
        Edit the Table definition
      </h2>
      <div class="content">
        <Table v-bind:table="t" v-bind:is_editable="true"></Table>
      </div>
    </div>
    <div class="tabs" v-else>
      <h2>
        Edit the Table rows
      </h2>
      <div class="content">
        <table-rows :table="t" :row="r"></table-rows>
      </div>
    </div>
  </div>
</template>

<script>
import Table from '../../components/Table.vue';
import TableRows from '../../components/TableRows.vue';
import { mapGetters } from 'vuex';

export default {
  components: {
    Table,
    TableRows,
  },

  computed: mapGetters({
    t: 'getTable',
    r: 'rows/getRows',
  }),

  async fetch({ store, params }) {
    await store.dispatch('LOAD_TABLES');
    await store.dispatch('rows/LOAD_ROWS', { tableId: params.id });
    await store.dispatch('LOAD_TABLE', { id: params.id });
  },

  data: () => {
    return {
      tabs_switch: true,
    };
  },

  methods: {
    switchTabs: function(value) {
      this.tabs_switch = value;
    },
    activeClass: function(active) {
      return {
        active: active,
        'nav-link': true,
      };
    },
  },
};
</script>

<style>
.nav.nav-tabs {
  min-width: 100%;
}
</style>
