<template>
  <div class="container">
    <div class="row">
      <ul class="nav nav-tabs">
        <li class="nav-item" v-on:click="switchTabs(true)">
          <nuxt-link
            :to="generateUrl('/edit')"
            :class="{ active: false, 'nav-link': true }"
            >Edit the table</nuxt-link
          >
        </li>
        <li class="nav-item" v-on:click="switchTabs(false)">
          <nuxt-link
            :to="generateUrl('/edit-row')"
            :class="{ active: true, 'nav-link': true }"
            >Edit the rows</nuxt-link
          >
        </li>
      </ul>
    </div>
    <div class="tabs">
      <h2>
        Edit the Table rows
      </h2>
      <div class="content">
        <table-rows :table="t"></table-rows>
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
    generateUrl: 'generateUrl',
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
