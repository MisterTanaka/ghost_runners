<template>
  <div class="container">
    <div class="header">
      <h1>Random Table generator</h1>
    </div>
    <div class="listing">
      <div class="item" v-for="table in tables" v-bind:key="table._id">
        <h2>{{ table.name }}</h2>
        <pre>
          {{table.description}}
        </pre>
        <div class="right">
          <nuxt-link :to="generateUrl('/edit', table._id)" class="btn btn-success">Edit</nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Logo from '~/components/Logo.vue';
import { mapGetters } from 'vuex';

export default {
  components: {
    Logo,
  },

  computed: mapGetters({
    tables: 'getTables',
  }),

  async fetch({ store, params }) {
    await store.dispatch('LOAD_TABLES');
  },

  methods: {
    generateUrl(staticElem, param) {
      return `${staticElem}/${param}`;
    },
  },
};
</script>

<style>
.header {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}

.right {
  position: relative;
}

.right a {
  float: right;
  margin-top: -75px;
}
</style>
