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
            {{ handleValue(user.data.surname) }}
          </p>
          <v-text-field v-else v-model="surname" solo />
        </div>
        <div class="block__row">
          <p class="block__label label">Ім'я</p>
          <p v-if="!isDataChange" class="block__field field">
            {{ handleValue(user.data.name) }}
          </p>
          <v-text-field v-else v-model="name" solo />
        </div>
        <div class="block__row">
          <p class="block__label label">Стать</p>
          <p v-if="!isDataChange" class="block__field field">
            {{ handleValue(user.data.sex) }}
          </p>
          <v-text-field v-else v-model="sex" solo />
        </div>
        <div class="block__row">
          <p class="block__label label">Мова спілкування</p>
          <p v-if="!isDataChange" class="block__field field">
            {{ handleValue(user.data.speakingLanguage) }}
          </p>
          <v-text-field v-else v-model="speakingLanguage" solo />
        </div>
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
        <p>NEED ADD</p>
      </div>
    </div>
    <div class="block">
      <div class="block__header">
        <div class="block__wrapper">
          <v-icon class="mdi mdi-map-marker-plus-outline " color="#4a4a4a" />
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
          <p v-if="!isDataChange" class="block__field field">
            {{ handleValue(user.data.phoneNumber) }}
          </p>
          <v-text-field v-else v-model="phoneNumber" solo />
        </div>
        <div class="block__row">
          <p class="block__label label">Електронна пошта</p>
          <p v-if="!isDataChange" class="block__field field">
            {{ handleValue(user.data.email) }}
          </p>
          <v-text-field v-else v-model="email" solo />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  middleware: 'auth',
  data: () => ({
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
  computed: {
    ...mapGetters('auth', { user: 'getUser' })
  },
  methods: {
    handleValue(v) {
      return v || 'Не вказано'
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
