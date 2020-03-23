<template>
  <div class="container">
    <div class="header">
      <h1>Random Table generator</h1>
    </div>
    <div class="listing">
      <div class="item" v-for="table in tables" v-bind:key="table._id">
        <h2>{{ table.name }}</h2>
        <p>
          {{ table.description }}
        </p>
        <div class="right">
          <ul>
            <li>
              <nuxt-link
                :to="generateUrl('/view', table._id)"
                class="btn btn-primary"
                >View</nuxt-link
              >
            </li>
            <li>
              <nuxt-link
                :to="generateUrl('/edit', table._id)"
                class="btn btn-success"
                >Edit</nuxt-link
              >
            </li>
          </ul>
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
    Logo
  },

  computed: mapGetters({
    tables: 'getTables',
    generateUrl: 'generateStaticUrl'
  }),

  async fetch({ store, params }) {
    await store.dispatch('LOAD_TABLES');
  },

  methods: {}
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
  display: block;
  float: right;
}

.right ul li {
  display: inline-block;
  list-style-type: none;
}
</style>
