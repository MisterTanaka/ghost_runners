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
      <div class="display-result">{{ result }}</div>
    </div>
  </div>
</template>

<script>
import Logo from '~/components/Logo.vue';
import { mapGetters } from 'vuex';
import _ from 'lodash';

export default {
  components: {
    Logo,
  },

  computed: mapGetters({
    table: 'getTable',
    rows: 'rows/getRows',
    generateUrl: 'generateStaticUrl',
  }),

  data() {
    return {
      result: {},
    };
  },

  async fetch({ store, params }) {
    await store.dispatch('LOAD_TABLES');
    await store.dispatch('rows/LOAD_ROWS', { tableId: params.id });
    await store.dispatch('LOAD_TABLE', { id: params.id });
  },

  methods: {
    chooseRandomRow() {
      let percentArray = [];
      const weightArray = _.map(this.rows.rows, (row, index) => {
        return { id: index, weigth: parseInt(row.weigth) };
      });

      const totalweigth = _(weightArray)
        .map(row => {
          return row.weigth;
        })
        .sum();

      let cumulative_percentage = 0;
      _.forEach(weightArray, (weight_row, index) => {
        const percent = (weight_row.weigth / totalweigth) * 100;
        percentArray[index] = [
          cumulative_percentage,
          cumulative_percentage + parseInt(percent),
        ];
        cumulative_percentage += parseInt(percent);
      });

      const seed = Math.round(Math.random() * 100);
      let rowIndex = 0;
      _.forEach(percentArray, (weight_row, index) => {
        if (seed > weight_row[0] && seed < weight_row[1]) {
          rowIndex = index;
        }
      });
      this.result = this.rows.rows[rowIndex];
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
