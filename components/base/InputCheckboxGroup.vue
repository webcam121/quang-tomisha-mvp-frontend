<template>
  <div class="base-input-radio-group">
    <slot name="label">
      <label v-if="label" class="mb-6 text-sm text-gray-600 block">
        {{ label }}
      </label>
    </slot>

    <base-checkbox
      v-model="all"
      label="Alle"
      class="mb-6"
      :label-class="labelClass"
    />

    <base-checkbox
      v-for="(item, i) in items"
      :key="item.id || i"
      v-bind="$attrs"
      :checked="value.includes(item[itemValue])"
      :label="item[itemText]"
      :label-class="labelClass"
      class="mb-6 ml-8"
      :class="[itemClass]"
      @change="onChange(item)"
    />

    <base-validation-error v-if="rules.length" :value="value" :rules="rules" />
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    value: { type: Array, default: () => [] },
    label: { type: String, default: '' },
    labelClass: {
      type: String,
      default: 'font-semibold text-teal-600',
    },
    items: { type: Array, default: () => [] },
    itemText: { type: String, default: 'text' },
    itemValue: { type: String, default: 'value' },
    itemClass: { type: String, default: '' },
    rules: { type: Array, default: () => [] },
  },
  computed: {
    all: {
      get() {
        return this.value.length === this.items.length
      },
      set() {
        this.$emit(
          'input',
          this.value.length === this.items.length
            ? []
            : this.items.map((item) => item[this.itemValue])
        )
      },
    },
  },
  methods: {
    onChange(item) {
      const items = [...this.value]
      const i = items.indexOf(item[this.itemValue])
      if (i === -1) {
        items.push(item[this.itemValue])
      } else {
        items.splice(i, 1)
      }
      this.$emit('input', items)
    },
  },
}
</script>
