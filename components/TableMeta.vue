<template>
  <div class="container">
    <div class="col-lg-12">
      <div class="row">
        <div class="container">
          <div class="form-control">
            <label for="tags-basic">Type a new category tag and press enter</label>
            <b-form-tags
              input-id="tags-basic"
              separator=" ,;"
              placeholder="Enter new tags separated by space, comma or semicolon"
              v-model="tags"
              class="mb-2"
            ></b-form-tags>
          </div>
        </div>
      </div>
      <hr />
      <div class="row">
        <button class="btn btn-success">Save Meta</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tags: []
    };
  },

  methods: {
    saveMeta: () => {
      //this
    }
  }
};
</script>

<style>
.badge {
  color: #fff;
  background: rgba(0, 0, 0, 0.7);
}
</style>