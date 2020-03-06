<template>
  <div class="container">
    <div class="title">
      <h1>Create A random table</h1>
    </div>
    <div class="row">
      <div class="2-md">
        <div class="form-group">
          <label for="table_name">Nom de la table</label>
          <input type="text" id="table_name" v-model="table_name" />
        </div>
      </div>
      <div class="2-md">
        <div class="form-group">
          <label for="columns_number">Nombre de colonnes</label>
          <input type="text" id="columns_number" v-model="columns_number" />
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
    <div class="row" v-if="is_generated === true">
      <div v-for="n in columns_number" v-bind:key="n" :class="oddClass(n)">
        <div class="form-group">
          <label for="columns_number">{{ n }} colonnes</label>
          <input type="text" :id="generateID(n, 'columns')" />
        </div>
      </div>
    </div>
    <div class="row">
      <button
        v-show="is_generated"
        v-on:click="generateColumns()"
        class="btn btn-success"
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
export default {
  data() {
    return {
      table_name: '',
      columns_number: 3,
      is_generated: false,
    };
  },

  methods: {
    setupTable() {
      this.is_generated = true;
    },

    cancelTable() {
      this.is_generated = !this.is_generated;
    },

    generateColumns() {
      // dispatch de l'event pour créer une table avec les colonnes.
      console.log('table name: ', this.table_name);
      console.log('columns number: ', this.columns_number);
      console.log('is generated: ', this.is_generated);
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
.row div:first-child {
  margin-right: 25px;
}

.oddInput {
  margin-left: 35px;
}
</style>
