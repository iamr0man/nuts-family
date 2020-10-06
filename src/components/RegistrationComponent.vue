<template>
  <v-card flat>
    <v-card-title primary-title>
      РЕЄСТРАЦІЯ
    </v-card-title>
    <v-card-text>
      <v-form ref="form" v-model="valid" lazy-validation>
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
        <div>
          Реєструючись, ви погоджуєтеся з<a
            @click.stop="$router.push('/terms')"
          >
            угодою користувача</a
          >
        </div>
        <v-btn
          :disabled="!valid"
          color="primary"
          class="mr-4"
          @click="validate"
        >
          Зареєструватися
        </v-btn>
      </v-form>
      <v-dialog v-model="dialog" persistent max-width="500">
        <v-card>
          <v-card-title class="headline">
            Bendros naudojimosi paslaugomis taisyklės?
          </v-card-title>
          <v-card-text>
            <ul>
              <li>
                Įkeldami nuorodas nesiekiate piktybiškai pakenkti portalui.
              </li>
              <li>
                Įkeliate tinkamai paruoštą informaciją nebandant pakenkti
                portalo vartotojams.
              </li>
              <li>
                Pažadate dalintis nuolaidomis k
              </li>
            </ul>
          </v-card-text>
        </v-card>
      </v-dialog>
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
      (v) => !!v || 'Šis laukelis privalo būti užpildytas',
      (v) => (v && v.length <= 20) || 'Name must be less than 20 characters'
    ],
    password: '',
    passwordRules: [(v) => !!v || 'Šis laukelis privalo būti užpildytas'],
    email: '',
    emailRules: [
      (v) => !!v || 'E-mail is required',
      (v) => /.+@.+\..+/.test(v) || 'Šis laukelis privalo būti užpildytas'
    ]
  }),
  methods: {
    conditionsAgree() {
      this.dialog = false
      this.checkbox = true
    },
    conditionsDisagree() {
      this.dialog = false
      this.checkbox = false
    },
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
          displayName: this.name
        })
        this.$store.dispatch('auth/UPDATE_LOCAL_NAME', this.name)
        const userInstanceInfo = {
          email: userData.user.email,
          uid: userData.user.uid,
          displayName: userData.user.displayName
        }
        this.$store.dispatch('auth/CREATE_USER_INSTANCE', userInstanceInfo)

        this.$router.push('/')
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

<style lang="scss" scoped></style>
