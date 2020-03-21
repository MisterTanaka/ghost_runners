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
            <b-form-input
              v-model="data.item[col.key]"
              :type="inputType(col.type)"
              v-bind:key="col.key"
            />
          </template>
          <template v-slot:cell(actions)="data">
            <b-button
              size="sm"
              @click="info(data.item, data.index, $event.target)"
              class="mr-1 btn btn-danger"
            >
              Delete
            </b-button>

            <!-- Info modal -->
            <b-modal
              hide-footer
              :id="infoModal.id"
              :title="infoModal.title"
              @hide="resetInfoModal"
            >
              <pre>{{ infoModal.content }}</pre>
              <b-button
                class="mt-3"
                variant="outline-danger"
                block
                @click="deleteRow(data.index)"
                >Delete</b-button
              >
              <b-button
                class="mt-2"
                variant="outline-warning"
                block
                @click="cancelClick"
                >Cancel</b-button
              >
            </b-modal>
          </template>
        </b-table>
      </div>
      <hr />
      <div class="row">
        <div class="form-inline">
          <div
            class="col form-control"
            v-for="col in table.columns"
            v-bind:key="col.column_key"
          >
            <label :for="col.column_key">{{ col.column_name }}</label>
            <input
              :type="col.column_type === 'String' ? 'text' : 'number'"
              v-model="current_row[col.column_key]"
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
    sanitize: 'utils/sanitizeObj',
    inputType: 'utils/inputType'
  }),

  data() {
    let x = {};
    let cols = [];
    let cRow = _.cloneDeep(this.$store.state.rows);

    this.table.columns.forEach((col, index) => {
      x[col.column_key] = null;
      cols[index] = {
        key: col.column_key,
        label: col.column_name,
        type: col.column_type,
        sortable: true
      };
    });
    cols[cols.length] = {
      key: 'actions',
      label: 'Actions',
      type: 'btn',
      sortable: false
    };

    if (!cRow.rows) {
      cRow.rows = { rows: [] };
    }

    return {
      sortDesc: false,
      infoModal: {
        id: 'info-modal',
        title: 'Delete row',
        content: ''
      },
      current_row: x,
      fields: cols,
      row: cRow.rows,
      rowId: cRow._id
    };
  },

  methods: {
    async addTable() {
      const aRow = this.row.rows;

      const sanitize_current_row = this.sanitize(
        this.current_row,
        this.$sanitize
      );
      aRow.push(sanitize_current_row);

      this.table.columns.forEach(col => {
        this.current_row[col.column_key] = null;
      });
    },
    info(item, index, button) {
      this.infoModal.title = `Delete Row ${index}`;
      this.infoModal.content = 'Do you really want to delete this row?';
      this.$root.$emit('bv::show::modal', this.infoModal.id, button);
    },
    resetInfoModal() {
      this.infoModal.title = '';
      this.infoModal.content = '';
    },
    cancelClick() {
      this.$root.$emit('bv::show::modal', this.infoModal.id);
    },
    deleteRow(index) {
      this.$root.$emit('bv::show::modal', this.infoModal.id);
      this.row.rows.splice(index, 1);
    }
  },

  watch: {
    // whenever row changes, this function will run
    row: {
      handler: _.debounce(async function(row) {
        let rows = [];
        _.forEach(this.row.rows, row => {
          rows.push(this.sanitize(row, this.$sanitize));
        });
        const options = {
          is_new: !this.row._id,
          tableId: this.table._id,
          rowId: this.row._id || null,
          rows: rows
        };
        const res = await this.$store.dispatch('rows/INSERT_ROW', options);

        this.$toast.show(res.message, {
          duration: 2000
        });
      }, 500),
      deep: true
    }
  }
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
