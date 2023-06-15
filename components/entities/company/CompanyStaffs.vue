<template>
  <div>
    <staff-editor ref="editor" :company="company" class="mb-8 max-w-lg" />

    <staff-table
      v-if="value.length"
      :items="value"
      :company="company"
      :class="{ 'md:-mx-10 lg:-mx-16': !wide }"
    />
  </div>
</template>

<script>
import StaffEditor from '~/components/entities/staff/StaffEditor'
import StaffTable from '~/components/entities/staff/StaffTable'
export default {
  components: {
    StaffEditor,
    StaffTable,
  },
  props: {
    company: { type: Object, default: null },
    value: { type: Array, default: () => [] },
    wide: Boolean,
  },
}
</script>
