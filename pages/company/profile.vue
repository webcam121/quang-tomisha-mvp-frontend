<template>
  <layout-body wide>
    <company-branches
      wide
      :value="branches"
      :company="{ ...$auth.company, branches: [$auth.company.headquater] }"
      class="mb-12"
    />

    <input-slug v-model="$auth.company.slug" class="max-w-lg" />
  </layout-body>
</template>

<script>
export default {
  layout: 'basic',
  asyncData({ $axios, $auth }) {
    return $axios
      .get('/branch', {
        params: { companyId: $auth.companyId },
      })
      .then((branches) => ({ branches }))
  },
  data() {
    return {
      branches: [],
    }
  },
}
</script>
