<template>
  <div class="block">
    <div class="block__header">
      <div class="block__wrapper">
        <v-icon class="mdi mdi-contacts " color="#4a4a4a" />
        <h3 class="block__name">Контакти</h3>
      </div>
      <v-icon
        v-if="!isContactsChange"
        class="mdi mdi-clipboard-edit-outline"
        color="#3e77aa"
        @click="isContactsChange = !isContactsChange"
      />
    </div>
    <div class="block__content">
      <div class="block__row">
        <p class="block__label label">Телефон</p>
        <p v-if="!isContactsChange" class="block__field field">
          {{ handleValue(phoneNumber) }}
        </p>
        <v-text-field v-else v-model="phoneNumber" solo />
      </div>
      <div class="block__row">
        <p class="block__label label">Електронна пошта</p>
        <p v-if="!isContactsChange" class="block__field field">
          {{ handleValue(email) }}
        </p>
        <v-text-field v-else v-model="email" solo />
      </div>
    </div>
    <div v-if="isContactsChange" class="block__actions">
      <v-btn @click="updateUser">Зберегти</v-btn>
      <v-btn @click="initFields">Скасувати</v-btn>
    </div>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/require-prop-types
  props: ['auth', 'user', 'handleValue'],
  data: () => ({
    phoneNumber: '',
    email: '',
    isContactsChange: false
  }),
  mounted() {
    this.initFields()
  },
  methods: {
    initFields() {
      this.phoneNumber = this.user.data.phoneNumber
      this.email = this.user.data.email
      this.isContactsChange = false
    },
    async updateUser() {
      // await this.auth.updateProfile({
      //   phoneNumber: this.phoneNumber
      // })
      await this.auth.updateEmail(this.email)
    }
  }
}
</script>
