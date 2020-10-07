<script>
import WeightSelect from '~/components/WeightSelect'

export default {
  components: { WeightSelect },
  data() {
    return {
      rating: 5,
      weight: 100
    }
  },
  computed: {
    weights() {
      return Object.entries(this.item.price)
    },
    price() {
      return this.item.price[this.weight]
    }
  },
  methods: {
    updateWeight(newValue) {
      this.weight = newValue
    }
  }
}
</script>
