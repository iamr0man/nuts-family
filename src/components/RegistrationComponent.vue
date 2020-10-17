<template>
  <v-card flat class="registration">
    <v-card-title primary-title>
      РЕЄСТРАЦІЯ
    </v-card-title>
    <v-card-text>
      <v-form
        ref="form"
        v-model="valid"
        class="registration__form"
        lazy-validation
      >
        <v-text-field
          v-model="surname"
          :rules="nameRules"
          label="Прізвище"
          required
        />
        <v-text-field v-model="name" :rules="nameRules" label="Ім'я" required />
        <v-text-field
          v-model="email"
          :rules="emailRules"
          label="Ел. пошта"
          required
        />
        <v-text-field
          v-model="password"
          type="password"
          :rules="passwordRules"
          label="Пароль"
          hint="Пароль повинен складатися з не менш ніж 6 символів, містити цифри та латинські літери, у тому числі великі, і не повинен збігатися з ім'ям та ел. поштою"
          :persistent-hint="true"
          required
        />
        <p class="my-2">
          Реєструючись, ви погоджуєтеся з<a
            @click.stop="$router.push('/terms')"
          >
            угодою користувача</a
          >
        </p>
        <v-btn
          :disabled="!valid"
          color="primary"
          class="my-3"
          @click="validate"
        >
          Зареєструватися
        </v-btn>
        <v-btn :disabled="!valid" @click="$emit('changeForm', true)">
          Я вже зареєстрований
        </v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
import { auth } from 'firebase'
export default {
  data: () => ({
    valid: true,
    name: '',
    surname: '',
    dialog: false,
    user: auth().currentUser,
    nameRules: [
      (v) => !!v || 'Це поле повинно бути заповнене',
      (v) =>
        (v && v.length <= 20) || 'Це поле має містити не більше 20 символів'
    ],
    password: '',
    passwordRules: [(v) => !!v || 'Це поле повинно бути заповнене'],
    email: '',
    emailRules: [
      (v) => !!v || 'Це поле повинно бути заповнене',
      (v) => /.+@.+\..+/.test(v) || 'Заповніть це поле в правильному форматі'
    ]
  }),
  methods: {
    async validate() {
      if (this.$refs.form.validate()) {
        this.snackbar = true
      }
      try {
        const userData = await auth().createUserWithEmailAndPassword(
          this.email,
          this.password
        )
        await userData.user.updateProfile({
          displayName: this.name + ' ' + this.surname
        })
        const userInstanceInfo = {
          email: userData.user.email,
          uid: userData.user.uid,
          displayName: userData.user.displayName
        }
        await this.$store.dispatch(
          'auth/CREATE_USER_INSTANCE',
          userInstanceInfo
        )
        await this.$store.dispatch('auth/CREATE_PROFILE', userInstanceInfo.uid)
        await this.$store.dispatch('cart/CREATE_CART', userInstanceInfo.uid)
        await this.$router.push('/')
      } catch (error) {
        this.snackbar = true
        // Handle Errors here.
        // const errorCode = error.code
        // const errorMessage = error.message
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.registration {
  &__form {
    display: flex;
    flex-direction: column;
  }
}
</style>
