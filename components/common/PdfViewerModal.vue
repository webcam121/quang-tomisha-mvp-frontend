<template>
  <base-modal ref="modal" :title="name" :sticky-header="false">
    <template v-if="$slots.activator" #activator>
      <slot name="activator" />
    </template>

    <div
      class="relative w-full rounded-md overflow-hidden"
      style="padding-bottom: 141%"
    >
      <div class="absolute inset-0">
        <iframe
          v-if="url"
          :src="`http://docs.google.com/gview?url=${url}&embedded=true`"
          class="w-full h-full"
          frameborder="0"
        />
      </div>
    </div>
  </base-modal>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      url: null,
    }
  },
  methods: {
    open(file) {
      if (!file) {
        return
      }
      this.name = file.name
      this.url = encodeURIComponent(file.url)
      this.$refs.modal.open()
    },
  },
}
</script>
