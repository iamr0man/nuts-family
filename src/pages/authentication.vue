<template>
  <v-card>
    <v-card-text class="pa-5">
      <RegistrationComponent
        v-if="!isRegistered"
        :is-registered="isRegistered"
        @changeForm="changeForm"
      />
      <LoginComponent
        v-else
        :is-registered="isRegistered"
        @changeForm="changeForm"
      />
    </v-card-text>
  </v-card>
</template>
<script>
import RegistrationComponent from '@/components/RegistrationComponent'
import LoginComponent from '@/components/LoginComponent'
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
    }
  }
}
</script>

<style scoped></style>
