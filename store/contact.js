export const state = () => ({
  contacts: [],
  total: 0,
  query: {},
})

export const actions = {
  fetchMyContacts({ commit, state }, { skip, ...query } = {}) {
    const params = this.$utils.filterObject(
      this.$utils.extract(query, ['status'])
    )

    const snapQuery = { ...params }

    const isModified = this.$utils.isModified(state.query, snapQuery)
    if (
      !isModified &&
      typeof skip === 'number' &&
      skip < state.contacts.length
    ) {
      return
    }
    params.take = 10
    params.skip = isModified ? 0 : state.contacts.length

    return this.$axios.get('/contact', { params }).then(({ items, total }) =>
      commit('setState', {
        contacts: isModified ? items : [...state.contacts, ...items],
        total,
        query: snapQuery,
      })
    )
  },

  deleteContact({ commit, state }, id) {
    return this.$axios.delete('/contact/' + id).then(() => {
      const i = state.contacts.findIndex((c) => c.id === id)
      if (i !== -1) {
        const contacts = [...state.contacts]
        contacts.splice(i, 1)
        commit('setState', { contacts, total: -1 })
      }
    })
  },
}

export const mutations = {
  setState(state, data) {
    Object.entries(data).forEach(([key, val]) => {
      state[key] = val
    })
  },
}
