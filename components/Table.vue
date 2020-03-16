<template>
  <div class="table">
    <div class="row">
      <div class="col-md-6">
        <div class="form-group">
          <label for="table_name">Nom de la table</label>
          <input
            type="text"
            id="table_name"
            v-model="table_name"
            :disabled="checkDisableValue"
          />
        </div>
      </div>
      <div class="col-md-6">
        <div class="form-group">
          <label for="table_description">Description de la table</label>
          <textarea
            id="table_description"
            v-model="table_description"
            :disabled="checkDisableValue"
          ></textarea>
        </div>
      </div>
      <div class="col-md-6">
        <div class="form-group">
          <label for="columns_number">Nombre de colonnes</label>
          <input
            type="number"
            id="columns_number"
            v-model="columns_number"
            :disabled="checkDisableValue"
          />
        </div>
      </div>
    </div>
    <div class="row">
      <button
        v-on:click="setupTable()"
        class="btn btn-success"
        v-show="!is_generated"
      >
        Créer
      </button>
    </div>
    <hr />
    <div class="row generated" v-if="is_generated === true">
      <div v-for="n in ColumnsNumber" v-bind:key="n" :class="oddClass(n)">
        <div class="col-lg-6">
          <div class="form-inline">
            <div class="form-group">
              <label for="columns_number">{{ n }} colonnes</label>
              <input
                type="text"
                :id="generateID(n, 'columns')"
                class="form-control"
                v-model="columns_value[n - 1]"
              />
              <select
                v-model="columns_type[n - 1]"
                :id="generateID(n, 'select')"
                class="form-control"
              >
                <option disabled value>Select one</option>
                <option>Number</option>
                <option>String</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <button
        v-show="is_generated"
        v-on:click="generateColumns()"
        class="btn btn-success spacing"
      >
        Générer
      </button>
      <button
        v-show="is_generated"
        v-on:click="cancelTable()"
        class="btn btn-danger"
      >
        Annuler
      </button>
    </div>
  </div>
</template>

<script>
import Axios from 'axios';
import Vue from 'vue';
import _ from 'lodash';

export default {
  name: 'Table',

  props: ['table', 'is_editable'],

  data() {
    let ta = _.cloneDeep(this.table);
    return {
      table_name: ta ? ta.name : '',
      columns_number: ta ? ta.columns.length : '',
      table_description: ta ? ta.description : '',
      columns: ta.columns.col ? ta.columns.col : [],
      columns_value: ta.columns
        ? ta.columns.map(column => {
            return column.column_name;
          })
        : [],
      columns_type: ta.columns
        ? ta.columns.map(column => {
            return column.column_type;
          })
        : [],
      is_generated: ta ? true : false,
    };
  },

  computed: {
    checkDisableValue() {
      if (this.is_editable) {
        return !this.is_editable;
      } else {
        return this.is_generated;
      }
    },
    ColumnsNumber() {
      for (let i = 0; i < this.columns_number; i++) {
        this.columns[i] = i + 1;
      }
      if (this.columns.length > this.columns_number) {
        this.columns = this.columns.splice(0, this.columns.length - 1);
      }
      return this.columns;
    },
  },

  methods: {
    setupTable() {
      this.is_generated = true;
    },

    cancelTable() {
      this.is_generated = !this.is_generated;
    },

    async generateColumns() {
      let columns = [];
      for (let i = 0; i < this.columns_number; i++) {
        columns[i] = {
          column_name: this.columns_value[i],
          column_type: this.columns_type[i],
        };
      }
      this.$nuxt.$loading.start();

      const res = await this.$store.dispatch('INSERT_TABLE', {
        is_new: !this.is_editable,
        id: this.table._id,
        name: this.table_name,
        description: this.table_description,
        columns: columns,
      });

      this.$toast.show(res.message, {
        duration: 2000,
      });

      this.$nuxt.$loading.finish();
    },

    generateID(id, column_name) {
      return column_name + '_' + id;
    },

    oddClass(n) {
      return ['2-md', n % 2 == 0 ? 'oddInput' : ''];
    },
  },
};
</script>

<style>
.oddInput {
  margin-left: 35px;
}

.generated .form-group select {
  vertical-align: top;
}
.generated .form-group input {
  margin: 5px;
}
</style>
