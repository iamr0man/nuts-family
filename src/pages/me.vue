<template>
  <div class="me">
    <h1 class="me__header">Особисті дані</h1>
    <DataBlock
      :auth="auth"
      :user="user"
      :profile="profile"
      :handle-value="handleValue"
    />
    <AddressBlock :auth="auth" :profile="profile" :handle-value="handleValue" />
    <ContactBlock :auth="auth" :user="user" :handle-value="handleValue" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { auth } from 'firebase'
import DataBlock from '~/components/DataBlock'
import AddressBlock from '~/components/AddressBlock'
import ContactBlock from '~/components/ContactBlock'
export default {
  components: {
    DataBlock,
    AddressBlock,
    ContactBlock
  },
  data: () => ({
    auth: auth().currentUser
  }),
  computed: {
    ...mapGetters('auth', { user: 'getUser', profile: 'getProfile' })
  },
  methods: {
    handleValue(v) {
      return v || 'Не вказано'
    }
  }
}
</script>

<style lang="scss">
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
    max-width: 515px;
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
        .block__addresses {
          margin: 10px;
          padding: 5px 20px;
          border: 1px solid #444444;
          border-radius: 30px;
        }
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
