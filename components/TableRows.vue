<template>
  <div class="container">
    <div class="col-lg-12">
      <div class="row" v-if="table_rows.length !== 0">
        {{ table_rows.length }}
      </div>
      <div class="row" v-else>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th
                scope="col"
                v-for="col in t.columns"
                v-bind:key="col.column_name"
              >
                {{ col.column_name }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td colspan="3">No rows have been detected for this table</td>
            </tr>
          </tbody>
        </table>
      </div>
      <hr />
      <div class="row">
        <div class="form-inline">
          <div
            class="form-control"
            v-for="col in t.columns"
            v-bind:key="col.column_name"
          >
            <label :for="col.column_name">{{ col.column_name }}</label>
            <input
              :type="col.column_type === 'String' ? 'text' : 'number'"
              :name="col.column_name"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      table_rows: [],
    };
  },

  computed: mapGetters({
    t: 'getTable',
  }),

  async asyncData({ params }) {},
};
</script>

<style></style>
