<template>
  <base-segmented-controls
    v-bind="$attrs"
    label="Geschlecht"
    full-label="Dein Geschlecht"
    :items="$store.state.tag.genders"
    item-value="id"
    v-on="$listeners"
  />
</template>

<script>
export default {
  inheritAttrs: false,
}
</script>
