<template>
  <v-card flat class="login">
    <v-snackbar
      v-model="error.active"
      color="error"
      :timeout="6000"
      :top="true"
    >
      {{ error.message }}
      <v-btn dark text @click="error.active = false">
        Close
      </v-btn>
    </v-snackbar>
    <v-card-title primary-title>Вхід</v-card-title>
    <v-card-text>
      <v-form ref="form" class="login__form" lazy-validation>
        <v-text-field
          v-model="email"
          :rules="emailRules"
          label="Ел. пошта"
          required
        />
        <v-text-field
          v-model="password"
          label="Пароль"
          type="password"
          required
        />
        <v-btn color="primary" class="my-3" @click="login">Увійти</v-btn>
        <v-btn @click="$emit('changeForm', false)">Зареєструватися</v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
import { auth } from 'firebase'
export default {
  props: ['isRegistred'],
  data: () => ({
    error: {
      active: false,
      message: ''
    },
    email: '',
    emailRules: [(v) => /.+@.+\..+/.test(v) || 'E-mail must be valid'],
    password: ''
  }),
  methods: {
    async login() {
      try {
        await auth().signInWithEmailAndPassword(this.email, this.password)
        this.$router.push('/')
      } catch (e) {
        this.error.active = true
        this.error.message = e.message
        // throw e
      }

      // TODO: add a login method from firebase
    }
  }
}
</script>

<style lang="scss">
.login {
  &__form {
    display: flex;
    flex-direction: column;
  }
}
</style>
