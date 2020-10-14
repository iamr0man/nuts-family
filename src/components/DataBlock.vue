<template>
  <div class="block">
    <div class="block__header">
      <div class="block__wrapper">
        <v-icon class="mdi mdi-account-circle-outline" color="#4a4a4a" />
        <h3 class="block__name">Особисті дані</h3>
      </div>
      <v-icon
        v-if="!isDataChange"
        class="mdi mdi-clipboard-edit-outline"
        color="#3e77aa"
        @click="isDataChange = !isDataChange"
      />
    </div>
    <div class="block__content">
      <div class="block__row">
        <p class="block__label label">Прізвище</p>
        <p v-if="!isDataChange" class="block__field field">
          {{ handleValue(surname) }}
        </p>
        <v-text-field v-else v-model="surname" solo />
      </div>
      <div class="block__row">
        <p class="block__label label">Ім'я</p>
        <p v-if="!isDataChange" class="block__field field">
          {{ handleValue(name) }}
        </p>
        <v-text-field v-else v-model="name" solo />
      </div>
      <div class="block__row">
        <p class="block__label label">Стать</p>
        <p v-if="!isDataChange" class="block__field field">
          {{ handleValue(sex) }}
        </p>
        <v-text-field v-else v-model="sex" solo />
      </div>
      <div class="block__row">
        <p class="block__label label">Мова спілкування</p>
        <p v-if="!isDataChange" class="block__field field">
          {{ handleValue(speakingLanguage) }}
        </p>
        <v-text-field v-else v-model="speakingLanguage" solo />
      </div>
    </div>
    <div v-if="isDataChange" class="block__actions">
      <v-btn class="primary" @click="createProfile({ sex, speakingLanguage })"
        >Зберегти</v-btn
      >
      <v-btn @click="initFields">Скасувати</v-btn>
    </div>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/require-prop-types
  props: ['auth', 'user', 'profile', 'handleValue'],
  data: () => ({
    surname: '',
    name: '',
    sex: '',
    speakingLanguage: '',
    isDataChange: false
  }),
  mounted() {
    this.initFields()
  },
  methods: {
    initFields() {
      this.surname = this.user.data.displayName.split(' ')[0]
      this.name = this.user.data.displayName.split(' ')[1]

      this.sex = this.profile.sex
      this.speakingLanguage = this.profile.speakingLanguage
      this.isDataChange = false
    },
    async createProfile(profile) {
      await this.auth.updateProfile({
        displayName: [this.surname, this.name].join(' ')
      })
      await this.$store.dispatch('auth/UPDATE_PROFILE', profile)
      this.isDataChange = false
    }
  }
}
</script>
