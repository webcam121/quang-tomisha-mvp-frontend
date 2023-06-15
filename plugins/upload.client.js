export default function (ctx, inject) {
  inject('upload', (file) => {
    const formData = new FormData()
    formData.append('file', file, file.name || '')

    return ctx.$axios
      .post('/asset', formData)
      .then(({ src }) => process.env.NUXT_ENV_BASE_ASSET + src)
      .catch(() => null)
  })
}
