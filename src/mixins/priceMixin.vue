<script>
import { mapGetters } from 'vuex'
import WeightSelect from '~/components/WeightSelect'

export default {
  components: { WeightSelect },
  data() {
    return {
      amount: 1,
      amountRules: [
        (v) => !!v || 'Поле повиино бути заповнене',
        (v) => v > 0 || 'Мінімальна кількість, дозволена для покупки - 1.'
      ],
      weight: 100
    }
  },
  computed: {
    ...mapGetters('cart', { cart: 'getCart' }),
    weights() {
      return Object.entries(this.item.price)
    },
    price() {
      return this.item.price[this.weight] * Math.abs(this.amount)
    },
    countAvgStars() {
      const sum = this.item.reviews.reduce((acc, curr) => acc + curr.rating, 0)
      return sum / this.item.reviews.length
    },
    isExistInCart() {
      return this.cart.products.find((v) => v.productId === this.item.id)
    }
  },
  methods: {
    updateWeight(newValue) {
      this.weight = newValue
    }
  }
}
</script>
