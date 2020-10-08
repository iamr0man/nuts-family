<template>
  <div class="me">
    <h1 class="me__header">Особисті дані</h1>
    <div class="block">
      <div class="block__header">
        <div class="block__wrapper">
          <v-icon class="mdi mdi-account-circle-outline" color="#4a4a4a" />
          <h3 class="block__name">Особисті дані</h3>
        </div>
        <v-icon
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
        <v-btn @click="createProfile({ sex, speakingLanguage })"
          >Зберегти</v-btn
        >
        <v-btn @click="clearFields({ sex, speakingLanguage })">Скасувати</v-btn>
      </div>
    </div>
    <div class="block">
      <div class="block__header">
        <div class="block__wrapper">
          <v-icon class="mdi mdi-map-marker-plus-outline " color="#4a4a4a" />
          <h3 class="block__name">Адреса</h3>
        </div>
        <v-icon
          class="mdi mdi-clipboard-edit-outline"
          color="#3e77aa"
          @click="isAddressChange = !isAddressChange"
        />
      </div>
      <div class="block__content">
        <p class="block__label">// TODO NEED TO ADD</p>
      </div>
      <div v-if="isAddressChange" class="block__actions">
        <v-btn @click="createProfile({ address })">Зберегти</v-btn>
        <v-btn @click="isAddressChange = false">Скасувати</v-btn>
      </div>
    </div>
    <div class="block">
      <div class="block__header">
        <div class="block__wrapper">
          <v-icon class="mdi mdi-contacts " color="#4a4a4a" />
          <h3 class="block__name">Контакти</h3>
        </div>
        <v-icon
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
        <v-btn @click="updateUser()">Зберегти</v-btn>
        <v-btn @click="isContactsChange = false">Скасувати</v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { auth } from 'firebase'
export default {
  middleware: 'auth',
  data: () => ({
    auth: auth().currentUser,
    name: '',
    surname: '',
    phoneNumber: '',
    email: '',
    sex: '',
    speakingLanguage: '',
    isDataChange: false,
    isAddressChange: false,
    isContactsChange: false
  }),
  async fetch({ store }) {
    await store.dispatch('auth/GET_PROFILE')
  },
  computed: {
    ...mapGetters('auth', { user: 'getUser', profile: 'getProfile' })
  },
  mounted() {
    this.surname = this.user.data.displayName.split(' ')[0]
    this.name = this.user.data.displayName.split(' ')[1]
    this.phoneNumber = this.user.data.phoneNumber
    this.email = this.user.data.email

    this.sex = this.profile.sex || ''
    this.speakingLanguage = this.profile.speakingLanguage || ''
    this.address = this.profile.address || ''
  },
  methods: {
    handleValue(v) {
      return v || 'Не вказано'
    },
    clearFields() {
      this.sex = this.user.sex || ''
      this.speakingLanguag = this.user.speakingLanguag || ''
      this.isDataChange = false
    },
    async createProfile(profile) {
      await this.auth.updateProfile({
        displayName: [this.surname, this.name].join(' '),
        phoneNumber: this.phoneNumber
      })
      await this.$store.dispatch('auth/CREATE_PROFILE', { profile })
    },
    async updateUser() {
      await this.auth.updateProfile({
        phoneNumber: this.phoneNumber
      })
      await this.auth.updateEmail({
        email: this.email
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.me {
  display: flex;
  flex-direction: column;
  .block {
    $self: &;
    display: flex;
    flex-direction: column;
    padding: 10px;
    margin: 10px 0;
    border: 1px solid #a0a0a0;
    border-radius: 10px;
    .block__header {
      display: flex;
      justify-content: space-between;
      .block__wrapper {
        display: flex;
        .block__name {
          margin-left: 10px;
        }
      }
    }
    .block__content {
      display: flex;
      flex-direction: column;
      .block__row {
        display: flex;
        flex-direction: column;
        .block__label.label {
          margin-bottom: 8px !important;
          font-size: 12px;
          color: #797878;
        }
      }
    }
  }
}
</style>
