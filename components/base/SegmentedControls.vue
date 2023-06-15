<template>
  <base-input-wrapper
    v-slot="{ listeners }"
    :value="value"
    :label="label"
    :disabled="disabled"
    v-bind="$attrs"
  >
    <div class="rounded-xl overflow-hidden border border-gray-400">
      <div class="flex">
        <div
          v-for="(item, i) in visibleItems"
          :key="i"
          :tabindex="disabled || item.disabled ? '-1' : '0'"
          class="flex-grow truncate h-12 relative duration-300 font-semibold inline-flex justify-center items-center px-4 focus:outline-none select-none"
          :class="{
            'border-r border-gray-400': i < visibleItems.length - 1,
            'text-teal-100 bg-teal-300 hover:bg-teal-300':
              value === item[itemValue],
            'bg-white text-teal-600': value !== item[itemValue],
            'cursor-pointer hover:bg-teal-100 duration-200':
              !disabled && !item.disabled,
            [`w-1/${maxVisible}`]: true,
          }"
          @click="select(item)"
          @keyup.space.exact.stop="select(item)"
          @focus="listeners.focus"
        >
          {{ item[itemText] }}
        </div>
      </div>

      <div
        v-if="hiddenItems.length"
        ref="toggler"
        :tabindex="disabled ? '-1' : '0'"
        class="border-t border-gray-400 rounded-b-xl min-h-12 flex justify-center items-center font-semibold py-3 px-4 focus:outline-none select-none"
        :class="[
          selectedHiddenItem
            ? 'text-teal-100 bg-teal-300 hover:bg-teal-300'
            : 'text-teal-600 bg-white',
          disabled ? '' : 'cursor-pointer hover:bg-teal-100 duration-200',
        ]"
        @click="toggleHiddenItems"
        @keyup.exact.space="toggleHiddenItems"
        @focus="listeners.focus"
      >
        {{ selectedHiddenItem ? selectedHiddenItem[itemText] : 'oder' }}
        <base-icon icon="chevron-down" class="text-xs ml-2 mt-1" />
      </div>
    </div>

    <base-bottom-slide-panel
      v-if="hiddenItems.length"
      ref="bpanel"
      v-slot="{ expanded }"
      overlay
    >
      <h3 class="text-3xl my-5 text-center">
        {{ fullLabel || label }}
      </h3>

      <base-checkbox
        v-for="(item, i) in hiddenItems"
        :key="i"
        :checked="value === item[itemValue]"
        :label="item[itemText]"
        label-class="font-semibold text-teal-600"
        :disabled="disabled || item.disabled || !expanded"
        class="pb-6"
        @change="selectHiddenItem(item)"
      />
    </base-bottom-slide-panel>
  </base-input-wrapper>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    // eslint-disable-next-line vue/require-prop-types
    value: { default: null },
    label: { type: String, default: '' },
    fullLabel: { type: String, default: '' },
    items: { type: Array, default: () => [] },
    itemText: { type: String, default: 'text' },
    itemValue: { type: String, default: 'value' },
    maxVisible: { type: Number, default: 2 },
    disabled: Boolean,
  },
  data() {
    return {
      name: '',
    }
  },
  computed: {
    visibleItems() {
      return this.items.slice(0, this.maxVisible)
    },
    hiddenItems() {
      return this.items.slice(this.maxVisible)
    },
    selectedHiddenItem() {
      return this.hiddenItems.find((h) => h[this.itemValue] === this.value)
    },
  },
  mounted() {
    this.name = this.$attrs.name || Math.round(Math.random() * 9999)
  },
  methods: {
    selectHiddenItem(item) {
      this.select(item)
      this.toggleHiddenItems()
    },
    toggleHiddenItems() {
      if (!this.disabled) {
        this.$refs.toggler.blur()
        const expanded = this.$refs.bpanel.toggle()
        this.$utils.freezePageScroll(expanded)
      }
    },
    select(item) {
      if (!this.disabled && !item.disabled) {
        this.$emit('input', item[this.itemValue])
      }
    },
  },
}
</script>
