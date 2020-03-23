<template>
  <div class="container">
    <div class="col-lg-12">
      <div class="row">
        <div class="container">
          <div class="form-control">
            <label for="tags-basic">Here are the most common tags</label>
            <div class="tags" v-if="tags.length > 0">
              <span
                v-for="tag in tags"
                v-bind:key="tag._id"
                :class="['badge', `badge-${tag.color}`]"
                @click="addBadgeToTable(tag)"
                style="cursor:pointer;"
                >{{ tag.name }}</span
              >
            </div>
            <div v-else>
              No tag currently available.
            </div>
          </div>
          <div class="form-control badge-control">
            <label for="tags-basic"
              >Type a new category tag and press enter</label
            >
            <b-form-tags
              input-id="tags-basic"
              separator=" ,;"
              placeholder="Enter new tags separated by space, comma or semicolon"
              v-model="tags_values"
              class="mb-2"
            ></b-form-tags>
          </div>
        </div>
      </div>
      <hr />
      <div class="row">
        <div class="container">
          <div
            class="form-control"
            v-for="(tag, index) in table_tags"
            :key="index"
          >
            <label for=""
              >Set The color of the tag: <strong>{{ tag.name }}</strong></label
            >
            <select v-model="table_tags[index].tag_color">
              <option class="badge-primary" value="primary">Blue</option>
              <option class="badge-secondary" value="secondary">Gray</option>
              <option class="badge-success" value="success">Green</option>
              <option class="badge-danger" value="danger">Red</option>
              <option class="badge-warning" value="warning">Yellow</option>
              <option class="badge-info" value="info">Turquoise</option>
              <option class="badge-light" value="light">White</option>
              <option class="badge-dark" value="dark">Black</option>
            </select>
          </div>
        </div>
      </div>
      <hr />
      <div class="row">
        <button class="btn btn-success" @click="checkMeta()">Save Meta</button>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash';
import { mapGetters } from 'vuex';

export default {
  props: ['ta'],

  data() {
    return {
      table_tags: [],
      tags_values: []
    };
  },

  computed: {
    ...mapGetters({
      sanitize: 'utils/sanitizeObj',
      tags: 'tags/getTags'
    })
  },

  methods: {
    async checkMeta() {
      this.$nuxt.$loading.start();

      const tags_payload = _.map(this.table_tags, tag => {
        return { name: tag.name, color: tag.tag_color };
      });

      const options = {
        table: this.ta,
        tags: tags_payload
      };

      const res = await this.$store.dispatch('INSERT_TAG', options);
      this.$toast.show('table and tags updated', {
        duration: 2000
      });

      this.$nuxt.$loading.finish();
    },

    addBadgeToTable(tag) {
      this.tags_values.push(tag.name);
    }
  },

  watch: {
    tags_values: {
      handler: _.debounce(async function(tags) {
        let tag_r = _.map(tags, tag => {
          return { name: tag };
        });
        this.table_tags = [];
        _.forEach(tag_r, (tag, i) => {
          let newTag = this.sanitize(tag, this.$sanitize);
          newTag.tag_color = null;
          this.table_tags[i] = newTag;
        });

        this.$toast.show('tags updated', {
          duration: 2000
        });
      }, 500),
      deep: true
    }
  }
};
</script>

<style>
.badge-control .badge {
  color: #fff;
  background: rgba(0, 0, 0, 0.7);
}
</style>
