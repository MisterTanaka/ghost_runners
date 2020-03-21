<template>
  <div class="container">
    <div class="header-img">
      <!-- this will be an image with the title on it. -->
      <h1>Random Table generator</h1>
      <h2>{{ table.name }}</h2>
    </div>
    <div class="content">
      <div class="player-choices">
        <div class="form-inline">
          <button class="btn btn-success" @click="chooseRandomRow">
            Select a random choice for me
          </button>
        </div>
      </div>
      <div class="display-result">
        <div class="row">
          <div class="col" v-if="result">
            <h2>Congratulations!! The result is,</h2>
            <p>
              <strong>{{ result["recipe's_name"] }}</strong>
              <ul>
                <li>
                  {{result["ingredients"]}}
                </li>
              </ul>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Logo from '~/components/Logo.vue';
import { mapGetters } from 'vuex';
import _ from 'lodash';

export default {
  components: {
    Logo
  },

  computed: mapGetters({
    table: 'getTable',
    rows: 'rows/getRows',
    generateUrl: 'generateStaticUrl',
    getRowByRandom: 'utils/getRowByRandom'
  }),

  data() {
    return {
      result: null
    };
  },

  async fetch({ store, params }) {
    await store.dispatch('LOAD_TABLES');
    await store.dispatch('rows/LOAD_ROWS', { tableId: params.id });
    await store.dispatch('LOAD_TABLE', { id: params.id });
  },

  methods: {
    chooseRandomRow() {
      this.result = this.rows.rows[this.getRowByRandom(this.rows.rows)];
    }
  }
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
