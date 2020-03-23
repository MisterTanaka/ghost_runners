<template>
  <div class="container">
    <div class="header">
      <h1>Random Table generator common tags</h1>
    </div>
    <div class="listing">
      <div class="item">
        <div class="row">
          <div class="container">
            <div class="form-control" v-if="tags.length > 0">
              <label for="tags-basic">Here are the most common tags</label>
              <div class="tags" v-for="tag in tags" v-bind:key="tag._id">
                <span :class="['badge', `badge-${tag.color}`]">
                  {{ tag.name }}
                </span>
              </div>
            </div>
            <div class="form-control" v-else>
              <p>
                There is no tags register yet
              </p>
            </div>
          </div>
        </div>
        <hr />
        <div class="row">
          <div class="container">
            <div class="form-group">
              <label for="tag_name">Tag name</label>
              <input type="text" id="tag_name" v-model="form.tag_name" />
            </div>
            <div class="form-group">
              <label for="tag_name">Tag color</label>
              <select v-model="form.tag_color">
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
        <div class="row">
          <button class="btn btn-success" @click="addTag()">Add tag</button>
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

  data() {
    return {
      form: {
        tag_name: '',
        tag_color: ''
      }
    };
  },

  computed: mapGetters({
    tags: 'tags/getTags'
  }),

  async fetch({ store, params }) {
    await store.dispatch('tags/LOAD_TAGS');
  },

  methods: {
    async addTag() {
      this.$nuxt.$loading.start();

      const res = await this.$store.dispatch('tags/INSERT_TAG', {
        name: this.$sanitize(this.form.tag_name),
        color: this.$sanitize(this.form.tag_color)
      });

      this.$toast.show(res.message, {
        duration: 2000
      });

      this.$nuxt.$loading.finish();
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
  display: block;
  float: right;
}

.right ul li {
  display: inline-block;
  list-style-type: none;
}

.form-control {
  height: auto;
}
</style>
