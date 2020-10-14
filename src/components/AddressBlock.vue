<template>
  <div class="block">
    <div class="block__header">
      <div class="block__wrapper">
        <v-icon class="mdi mdi-map-marker-plus-outline " color="#4a4a4a" />
        <h3 class="block__name">Адреса</h3>
      </div>
    </div>
    <div class="block__content">
      <div class="block__row">
        <div v-for="v in addresses" :key="v.id" class="block__addresses">
          <v-text-field readonly :value="v.city" label="Місто" />
          <v-text-field readonly :value="v.addressType" label="Звідки" />
          <v-text-field
            v-if="v.addressType === 'Відділення'"
            readonly
            :value="v.warehouse"
            label="Відділення"
          />
          <div v-else class="block__nested-fields">
            <v-text-field readonly :value="v.address" label="Вулиця" />
            <v-row>
              <v-col cols="6">
                <v-text-field readonly :value="v.house" label="Будинок" />
              </v-col>
              <v-col cols="6">
                <v-text-field readonly :value="v.apartment" label="Квартира" />
              </v-col>
            </v-row>
            <v-text-field
              readonly
              :value="v.comment"
              label="Коментар до адресу"
            />
          </div>
        </div>
        <div v-if="isAdding" class="block__field">
          <v-autocomplete
            v-model="city"
            label="Місто"
            :items="cities"
            :search-input.sync="search"
            item-text="Present"
            item-value="DeliveryCity"
            return-object
          />
          <v-select
            v-model="addressType"
            label="Звідки"
            :items="addressTypes"
          />
          <v-autocomplete
            v-if="addressType === 'Відділення'"
            v-model="warehouse"
            label="Відділення"
            :items="warehouses"
            item-text="Description"
            item-value="Ref"
            return-object
          />
          <div v-else class="block__nested-fields">
            <v-text-field v-model="address" label="Вулиця" />
            <v-row>
              <v-col cols="6">
                <v-text-field v-model="house" label="Будинок" />
              </v-col>
              <v-col cols="6">
                <v-text-field v-model="apartment" label="Квартира" />
              </v-col>
            </v-row>
            <v-text-field v-model="comment" label="Коментар до адресу" />
          </div>
        </div>
        <v-btn v-if="!isAdding" light @click="isAdding = true">
          <v-icon class="mdi mdi-plus-circle-outline" /> Додати адресу
        </v-btn>
      </div>
    </div>
    <div v-if="isAdding" class="block__actions">
      <v-btn class="primary" @click="createProfile">Зберегти</v-btn>
      <v-btn @click="initFields">Скасувати</v-btn>
    </div>
  </div>
</template>

<script>
import { debounce } from 'lodash'
export default {
  // eslint-disable-next-line vue/require-prop-types
  props: ['auth', 'profile', 'handleValue'],
  data: () => ({
    isAdding: false,
    city: {},
    search: null,
    cities: [],
    addressTypes: ['Відділення', 'Адреса'],
    addressType: 'Відділення',
    warehouse: {},
    warehouses: [],
    address: '',
    addresses: [],
    house: '',
    apartment: '',
    comment: ''
  }),
  watch: {
    search: debounce(async function(val) {
      await this.searchCities(val)
      await this.searchWarehouses()
    }, 1000)
  },
  mounted() {
    this.initFields()
  },
  methods: {
    initFields() {
      this.addresses = this.profile.addresses
      this.isAdding = false
    },
    async searchCities(val) {
      const { data } = await this.$addressRepository.getCities(val)
      if (data[0].Addresses.length > 0) {
        this.cities = data[0].Addresses
      }
    },
    async searchWarehouses() {
      const { data } = await this.$addressRepository.getWarehouses(
        this.city.DeliveryCity
      )
      if (data.length > 0) {
        this.warehouses = data
      }
    },
    async createProfile() {
      const data = {}
      if (this.addressType === 'Відділення') {
        data.city = this.city.Present
        data.warehouse = this.warehouse.Description
      } else if (this.addressType === 'Адреса') {
        data.city = this.city.Present
        data.address = this.address
        data.apartment = this.apartment
        data.house = this.house
        data.comment = this.comment
      }
      await this.$store.dispatch('auth/UPDATE_PROFILE', data)
      this.isAdding = false
    }
  }
}
</script>
