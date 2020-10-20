<template>
  <div class="checkout">
    <div class="checkout__left">
      <v-text-field v-model="surname" label="Прізвище" />
      <v-text-field v-model="name" label="Ім'я" />
      <v-text-field v-model="email" label="Ел. пошта" />
      <v-text-field v-model="phoneNumber" label="Мобільний телефон" />
      <v-checkbox
        v-model="consult"
        label="Я потребую консультації щодо замовлення. Зателефонуйте мені."
      />
      <div class="checkout__block">
        <h3 class="block__header">Оплата</h3>
        <v-radio-group v-model="payMethod">
          <v-radio
            v-for="(n, i) in payMethods"
            :key="i"
            :label="n.label"
            :value="n.value"
            @click="payHint = payMethods[i].hint"
          />
        </v-radio-group>
        <p class="block__hint">{{ payHint }}</p>
      </div>
      <div class="checkout__block">
        <h3 class="block__header">Доставка</h3>
        <v-radio-group v-model="deliveryMethod">
          <v-radio
            v-for="(n, i) in deliveryMethods"
            :key="i"
            :label="n.label"
            :value="n.value"
          />
        </v-radio-group>
        <div class="block__hint">
          <div v-if="deliveryMethod === 'Нова Пошта'" class="block__addresses">
            <v-text-field readonly :value="warehouse.city" label="Місто" />
            <v-text-field v-model="warehouse.addressType" label="Звідки" />
            <v-text-field v-model="warehouse.warehouse" label="Відділення" />
          </div>
          <div
            v-else-if="deliveryMethod === 'Кур`єрська доставка по Києву'"
            class="block__nested-fields"
          >
            <v-text-field v-model="address.address" readonly label="Вулиця" />
            <v-row>
              <v-col cols="6">
                <v-text-field v-model="address.house" label="Будинок" />
              </v-col>
              <v-col cols="6">
                <v-text-field v-model="address.apartment" label="Квартира" />
              </v-col>
            </v-row>
            <v-text-field
              v-model="address.comment"
              label="Коментар до адресу"
            />
          </div>
        </div>
      </div>
    </div>
    <Cart class="checkout__right" header-name="Товари в корзині" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Cart from '~/pages/cart'
export default {
  components: {
    Cart
  },
  data: () => ({
    surname: '',
    name: '',
    email: '',
    phoneNumber: '',
    address: {
      city: '',
      addressType: '',
      address: '',
      house: '',
      apartment: '',
      comment: ''
    },
    warehouse: {
      city: '',
      addressType: '',
      warehouse: ''
    },
    consult: false,
    payMethod: '',
    payMethods: [
      {
        label: 'Оплата при отриманні',
        value: 'Оплата при отриманні',
        hint:
          'Якщо Ваше замовлення з оплатою при отриманні, то комісія нової пошти складе 20 грн + 2% від суми замовлення.'
      },
      {
        label: 'Переказ на карту Monobank',
        value: 'Переказ на карту Monobank',
        hint: 'З Вами зв`яжеться менеджер та надішле реквізити для оплати.'
      },
      {
        label: 'Безготівковий розрахунок',
        value: 'Безготівковий розрахунок',
        hint: 'Оплата для юридичних осіб та ФОП'
      }
    ],
    payHint: '',
    deliveryMethod: '',
    deliveryMethods: [
      {
        label: 'Нова Пошта',
        value: 'Нова Пошта'
      },
      {
        label: 'Кур`єрська доставка по Києву',
        value: 'Кур`єрська доставка по Києву'
      }
    ],
    deliveryHint: ''
  }),
  computed: {
    ...mapGetters('auth', {
      user: 'getUser',
      profile: 'getProfile',
      addressProfile: 'getAddresses',
      warehouseProfile: 'getWarehouses'
    }),
    ...mapGetters('cart', { cart: 'getCart' })
  },
  mounted() {
    if (this.user.loggedIn) {
      this.surname = this.user.data.displayName.split(' ')[0]
      this.name = this.user.data.displayName.split(' ')[1]
      this.email = this.user.data.email
      this.phoneNumber = this.user.data.phoneNumber
    }
    if (this.addressProfile) {
      this.address = this.addressProfile
    }
    if (this.warehouseProfile) {
      this.warehouse = this.warehouseProfile
    }
  }
}
</script>

<style lang="scss">
.checkout {
  display: flex;
  flex-direction: column;
  align-items: center;
  &__left {
    display: flex;
    flex-direction: column;
  }
}
</style>