<template>
  <div class="container">
    <div class="title">
      <h1>Create A random table</h1>
    </div>
    <div class="row">
      <div class="2-md">
        <div class="form-group">
          <label for="table_name">Nom de la table</label>
          <input type="text" id="table_name" v-model="table_name" :disabled="is_generated" />
        </div>
      </div>
      <div class="2-md">
        <div class="form-group">
          <label for="table_description">Description de la table</label>
          <input
            type="text"
            id="table_description"
            v-model="table_description"
            :disabled="is_generated"
          />
        </div>
      </div>
      <div class="2-md">
        <div class="form-group">
          <label for="columns_number">Nombre de colonnes</label>
          <input
            type="number"
            id="columns_number"
            v-model="columns_number"
            :disabled="is_generated"
          />
        </div>
      </div>
    </div>
    <div class="row">
      <button v-on:click="setupTable()" class="btn btn-success" v-show="!is_generated">Créer</button>
    </div>
    <hr />
    <div class="row generated" v-if="is_generated === true">
      <div v-for="n in ColumnsNumber" v-bind:key="n" :class="oddClass(n)">
        <div class="form-group">
          <label for="columns_number">{{ n }} colonnes</label>
          <input type="text" :id="generateID(n, 'columns')" v-model="columns_value[n - 1]" />
          <select v-model="columns_type[n - 1]" :id="generateID(n, 'select')">
            <option disabled value>Select one</option>
            <option>Number</option>
            <option>String</option>
          </select>
        </div>
      </div>
    </div>
    <div class="row">
      <button
        v-show="is_generated"
        v-on:click="generateColumns()"
        class="btn btn-success spacing"
      >Générer</button>
      <button v-show="is_generated" v-on:click="cancelTable()" class="btn btn-danger">Annuler</button>
    </div>
  </div>
</template>

<script>
import Axios from 'axios';
import Vue from 'vue';

export default {
  data() {
    return {
      table_name: '',
      columns_number: 0,
      table_description: '',
      columns: [],
      columns_value: [],
      columns_type: [],
      is_generated: false,
    };
  },

  computed: {
    ColumnsNumber() {
      this.columns = [];
      this.columns_value = [];
      for (let i = 0; i < this.columns_number; i++) {
        this.columns[i] = i + 1;
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
      // dispatch de l'event pour créer une table avec les colonnes

      await this.$store.dispatch('INSERT_TABLE', {
        name: this.table_name,
        description: this.table_description,
        columns: columns,
      });

      const msg = this.$store.state.notifications[
        this.$store.state.notifications.length - 1
      ];

      this.$toast.show(msg, {
        duration: 2000,
      });

      await this.$store.commit('remove_notification');
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
.row div {
  margin-right: 25px;
}

.oddInput {
  margin-left: 35px;
}

.spacing {
  margin-right: 25px;
}

.generated .form-group select {
  width: 15%;
  padding: 0;
  vertical-align: top;
}
.generated .form-group input {
  width: 64%;
}
</style>
