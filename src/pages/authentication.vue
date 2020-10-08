<template>
  <v-row class="pt-5">
    <v-col offset-md="2" lg="8" class="">
      <v-card>
        <v-card-text class="pa-5">
          <v-row>
            <v-col v-if="!isRegistered" cols="12" md="5">
              <div class="">
                <RegistrationComponent
                  :is-registered="isRegistered"
                  @changeForm="changeForm"
                />
              </div>
            </v-col>
            <v-col v-else cols="12" md="5">
              <LoginComponent
                :is-registered="isRegistered"
                @changeForm="changeForm"
              />
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
import firebase from 'firebase'
import RegistrationComponent from '@/components/RegistrationComponent'
import LoginComponent from '@/components/LoginComponent'
import { auth } from '@/plugins/firebase'
export default {
  components: {
    RegistrationComponent,
    LoginComponent
  },
  data: () => ({
    isRegistered: true
  }),
  methods: {
    changeForm(v) {
      this.isRegistered = v
    },
    async signIn(socialType) {
      let provider = null
      switch (socialType) {
        case 'google':
          provider = new firebase.auth.GoogleAuthProvider()
          break
        case 'facebook':
          provider = new firebase.auth.FacebookAuthProvider()
          break
      }
      try {
        await auth.signInWithPopup(provider)
        this.$router.push('/')
      } catch (error) {
        // const errorCode = error.code
        // const errorMessage = error.message
      }
    }
  }
}
</script>

<style scoped>
.google-signin:focus {
  background-image: url('/social/google/btn_google_signin_light_focus_web.png');
}
.google-signin {
  background-image: url('/social/google/btn_google_signin_light_normal_web.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  width: 191px;
  height: 46px;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}
.google-signin:active {
  background-image: url('/social/google/btn_google_signin_light_focus_web.png');
}
</style>
