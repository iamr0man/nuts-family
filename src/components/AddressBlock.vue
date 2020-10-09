<template>
  <div class="block">
    <div class="block__header">
      <div class="block__wrapper">
        <v-icon class="mdi mdi-map-marker-plus-outline " color="#4a4a4a" />
        <h3 class="block__name">Адреса</h3>
      </div>
      <v-icon
        v-if="!isAddressChange"
        class="mdi mdi-clipboard-edit-outline"
        color="#3e77aa"
        @click="isAddressChange = !isAddressChange"
      />
    </div>
    <div class="block__content">
      <p class="block__label"></p>
    </div>
    <div v-if="isAddressChange" class="block__actions">
      <v-btn @click="createProfile({ address })">Зберегти</v-btn>
      <v-btn @click="initFields">Скасувати</v-btn>
    </div>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/require-prop-types
  props: ['auth', 'profile', 'handleValue'],
  data: () => ({
    address: [],
    isAddressChange: false
  }),
  mounted() {
    this.initFields()
  },
  methods: {
    initFields() {
      this.address = this.profile.address
      this.isAddressChange = false
    },
    async createProfile(profile) {
      await this.$store.dispatch('auth/CREATE_PROFILE', profile)
      this.isAddressChange = false
    }
  }
}
</script>
