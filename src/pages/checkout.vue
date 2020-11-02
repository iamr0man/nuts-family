<template>
  <div class="checkout">
    <v-form ref="form" v-model="valid" class="checkout__left">
      <v-text-field v-model="surname" :rules="requiredRule" label="Прізвище" />
      <v-text-field v-model="name" :rules="requiredRule" label="Ім'я" />
      <v-text-field v-model="email" :rules="emailRules" label="Ел. пошта" />
      <v-text-field
        v-model="phoneNumber"
        :rules="requiredRule"
        label="Мобільний телефон"
      />
      <v-checkbox
        v-model="consult"
        label="Я потребую консультації щодо замовлення. Зателефонуйте мені."
      />
      <div class="checkout__block">
        <h3 class="block__header">Оплата</h3>
        <v-radio-group v-model="payMethod" :rules="requiredRule">
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
        <v-radio-group v-model="deliveryMethod" :rules="requiredRule">
          <v-radio
            v-for="(n, i) in deliveryMethods"
            :key="i"
            :label="n.label"
            :value="n.value"
          />
        </v-radio-group>
        <div class="block__hint">
          <div v-if="deliveryMethod === 'Нова Пошта'" class="block__addresses">
            <v-text-field
              v-model="warehouse.city"
              :rules="requiredRule"
              label="Місто"
            />
            <v-text-field
              v-model="warehouse.warehouse"
              :rules="requiredRule"
              label="Відділення"
            />
          </div>
          <div
            v-else-if="deliveryMethod === 'Кур`єрська доставка по Києву'"
            class="block__nested-fields"
          >
            <v-text-field
              v-model="warehouse.city"
              :rules="requiredRule"
              label="Місто"
            />
            <v-text-field
              v-model="address.address"
              :rules="requiredRule"
              label="Вулиця"
            />
            <v-row>
              <v-col cols="6">
                <v-text-field
                  v-model="address.house"
                  :rules="requiredRule"
                  label="Будинок"
                />
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="address.apartment"
                  :rules="requiredRule"
                  label="Квартира"
                />
              </v-col>
            </v-row>
            <v-text-field
              v-model="address.comment"
              :rules="requiredRule"
              label="Коментар до адресу"
            />
          </div>
        </div>
      </div>
    </v-form>
    <Cart class="checkout__right" header-name="Товари в корзині" />
    <v-btn
      :disabled="!isExist"
      color="primary"
      class="checkout__action"
      @click="checkout"
      >Оформити замовлення</v-btn
    >
  </div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid'
import { mapGetters } from 'vuex'
import Cart from '~/pages/cart'
import priceMixin from '~/mixins/priceMixin'
export default {
  components: {
    Cart
  },
  mixins: [priceMixin],
  data: () => ({
    valid: false,
    requiredRule: [(v) => !!v || 'Це поле повинно бути заповене'],
    surname: '',
    name: '',
    email: '',
    emailRules: [
      (v) => !!v || 'Це поле повинно бути заповнене',
      (v) => /.+@.+\..+/.test(v) || 'Заповніть це поле в правильному форматі'
    ],
    phoneNumber: '',
    address: {
      city: '',
      addressType: 'Адреса',
      address: '',
      house: '',
      apartment: '',
      comment: ''
    },
    warehouse: {
      city: '',
      addressType: 'Відділення',
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
  },
  methods: {
    async checkout() {
      if (this.$refs.form.validate()) {
        const order = {
          id: uuidv4(),
          surname: this.surname,
          name: this.name,
          email: this.email,
          phoneNumber: this.phoneNumber,
          address:
            this.deliveryMethod === 'Нова Пошта'
              ? this.warehouse
              : this.address,
          delivery: this.deliveryMethod,
          pay: this.payMethod,
          consult: this.consult,
          speakingLanguage: this.profile.speakingLanguage || 'Не вказано',
          products: this.cart.products
        }
        await this.$store.dispatch('auth/CREATE_ORDER', order)
        await this.$store.dispatch('cart/CLEAR_CART_PRODUCTS')
        await this.$router.push({ name: 'order' })
      } else {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        })
      }
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
  &__block {
    max-width: 515px;
  }
  &__action {
    border-radius: 30px;
  }
}
</style>
