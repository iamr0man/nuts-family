<template>
  <div class="checkout">
    <div class="checkout__left">
      <v-text-field :value="user.data.displayName.split(' ')[0]" />
      <v-text-field :value="user.data.displayName.split(' ')[1]" />
      <v-text-field :value="user.data.email" />
      <v-text-field :value="user.data.phoneNumber" label="Мобільний телефон" />
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
            <v-text-field
              readonly
              :value="warehouse.addressType"
              label="Звідки"
            />
            <v-text-field
              readonly
              :value="warehouse.warehouse"
              label="Відділення"
            />
          </div>
          <p v-else-if="deliveryMethod === 'Самовивіз'">
            ул. Михаила Драгоманова, 25, Киев, 02000
          </p>
          <div
            v-else-if="deliveryMethod === 'Кур`єрська доставка по Києву'"
            class="block__nested-fields"
          >
            <v-text-field readonly :value="address.address" label="Вулиця" />
            <v-row>
              <v-col cols="6">
                <v-text-field readonly :value="address.house" label="Будинок" />
              </v-col>
              <v-col cols="6">
                <v-text-field
                  readonly
                  :value="address.apartment"
                  label="Квартира"
                />
              </v-col>
            </v-row>
            <v-text-field
              readonly
              :value="address.comment"
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
        label: 'Самовивіз',
        value: 'Самовивіз'
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
      address: 'getAddresses',
      warehouse: 'getWarehouses'
    }),
    ...mapGetters('cart', { cart: 'getCart' })
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
