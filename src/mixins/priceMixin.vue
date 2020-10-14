<script>
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
    weights() {
      return Object.entries(this.item.price)
    },
    price() {
      return this.item.price[this.weight] * Math.abs(this.amount)
    },
    countAvgStars() {
      return this.item.reviews.map((v) => v.rating) / this.item.reviews.length
    }
  },
  methods: {
    updateWeight(newValue) {
      this.weight = newValue
    }
  }
}
</script>
