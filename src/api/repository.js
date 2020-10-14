// Provide nuxt-axios instance to use same configuration across the whole project
// I've used typical CRUD method names and actions here
const apiKey = '43a5ba497fbfee283117ca4da0a25d36'

export default ($axios) => (resource) => ({
  getCities(payload) {
    const data = {
      apiKey,
      modelName: 'Address',
      calledMethod: 'searchSettlements',
      methodProperties: {
        CityName: payload
      }
    }
    return $axios.$post(resource, data)
  },
  getWarehouses(payload) {
    const data = {
      apiKey,
      calledMethod: 'getWarehouses',
      methodProperties: {
        CityRef: payload
      },
      modelName: 'AddressGeneral'
    }
    return $axios.$post(resource, data)
  },
  getAddresses(val, ref) {
    const data = {
      apiKey,
      calledMethod: 'searchSettlementStreets',
      methodProperties: { StreetName: val, SettlementRef: ref },
      modelName: 'Address'
    }
    return $axios.$post(resource, data)
  }
})
