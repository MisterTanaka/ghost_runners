<template>
  <div class="container">
    <div class="col-lg-12">
      <div class="row">
        <b-table
          striped
          hover
          :sort-desc.sync="sortDesc"
          :fields="fields"
          :items="row.rows"
          sort-icon-left
          show-empty
        >
          <template v-for="col in fields" v-slot:[`cell(${col.key})`]="data">
            <b-form-input v-model="data.item[col.key]" v-bind:key="col.key" />
          </template>
        </b-table>
        {{ row.rows }}
      </div>
      <hr />
      <div class="row">
        <div class="form-inline">
          <div
            class="col form-control"
            v-for="col in table.columns"
            v-bind:key="col.column_name"
          >
            <label :for="col.column_name">{{ col.column_name }}</label>
            <input
              :type="col.column_type === 'String' ? 'text' : 'number'"
              v-model="current_row[col.column_name]"
            />
          </div>
          <div class="col">
            <button class="btn btn-success position" v-on:click="addTable()">
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import _ from 'lodash';

export default {
  name: 'TableRows',

  props: ['table'],

  computed: mapGetters({
    r: 'rows/getRows',
  }),

  data() {
    let x = {};
    let cols = [];
    let cRow = _.cloneDeep(this.$store.state.rows);
    let cNewRow = [];

    this.table.columns.forEach((col, index) => {
      x[col.column_name.replace(/ /g, '_').toLowerCase()] = null;
      cols[index] = {
        key: col.column_name.replace(/ /g, '_').toLowerCase(),
        label: col.column_name,
        sortable: true,
      };
    });

    if (!cRow.rows) {
      cRow.rows = { rows: [] };
    }

    console.log(cRow);
    return {
      sortBy: cols[0].label,
      sortDesc: false,
      current_row: x,
      fields: cols,
      row: cRow.rows,
    };
  },

  methods: {
    async addTable() {
      this.$nuxt.$loading.start();

      const aRow = _.cloneDeep(this.row.rows);
      aRow.push(this.current_row);

      const res = await this.$store.dispatch('rows/INSERT_ROW', {
        is_new: !this.row || this.row.length === 0,
        tableId: this.table._id,
        rowId: this.row._id || null,
        rows: aRow,
      });

      this.$toast.show(res.message, {
        duration: 2000,
      });

      this.table.columns.forEach(col => {
        this.current_row[
          col.column_name.replace(/ /g, '_').toLowerCase()
        ] = null;
      });

      this.$nuxt.$loading.finish();
    },
  },

  watch: {
    // whenever row changes, this function will run
    row: {
      handler: _.debounce(async function(row) {
        console.log('row vfvfv', row);
        const res = await this.$store.dispatch('INSERT_ROW', {
          is_new: !this.row || this.row.length === 0,
          tableId: this.table._id,
          rowId: this.row._id || null,
          rows: this.row.rows,
        });

        this.$toast.show(res.message, {
          duration: 2000,
        });
      }, 500),
      deep: true,
    },
  },
};
</script>

<style>
.form-control {
  height: auto;
}
.position {
  position: relative;
}
</style>
