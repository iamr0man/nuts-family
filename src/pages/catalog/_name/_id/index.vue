<template>
  <div class="product-page">
    <h1 class="product-page__name">{{ item.name }}</h1>
    <div class="product-page__wrapper">
      <img class="product-page__image" :src="item.image" alt="image" />
      <div class="product-page__info">
        <h1 class="product-page__name">{{ item.name }}</h1>
        <div class="product-page__numbers">
          <div class="product-page__rating">
            <v-rating
              class="product-page__stars"
              color="secondary"
              :value="item.reviews.rating"
            />
            <p class="product-page__reviews-link">
              {{ item.reviews.length }} ВІДГУК(И)
            </p>
          </div>
          <div class="product-page__price-info">
            <p class="product-page__price">{{ price }} грн.</p>
            <p
              class="product-page__available"
              :class="{ red: !item.isAvailable }"
            >
              {{ isAvailable }}
            </p>
          </div>
        </div>
        <div class="product-page__select">
          <p class="product-page__label">Вага:</p>
          <WeightSelect :weight="weight" @changeWeight="updateWeight" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { firestore } from 'firebase'
import { isNil, get } from 'lodash'
import priceMixin from '~/mixins/priceMixin'
import votesMixin from '~/mixins/votesMixin'
import WeightSelect from '~/components/WeightSelect'

export default {
  components: {
    WeightSelect
  },
  mixins: [priceMixin, votesMixin],
  async asyncData(ctx) {
    const itemId = ctx.params.id
    await ctx.store.dispatch('category/VIEW_DEAL', itemId)
    return {
      itemId
    }
  },
  data: () => ({
    commentContent: null
  }),
  computed: {
    ...mapGetters('auth', { user: 'getUser' }),
    ...mapGetters('category', { item: 'getItem', comments: 'getComments' }),
    isAvailable() {
      return this.item.isAvailable ? 'Є в наявності' : 'Немає в наявності'
    }
  },

  mounted() {
    this.$store.dispatch('category/INITIATE_LISTENING_TO_COMMENTS', this.itemId)
  },
  beforeDestroy() {
    this.$store.dispatch('category/LEAVE_DEAL')
  },
  methods: {
    postComment() {
      const userName = get(this.user.data, 'displayName')
      const commentData = {
        dealId: this.itemId,
        userId: this.user.data.uid,
        content: this.commentContent,
        timestamp: firestore.FieldValue.serverTimestamp(),
        userName: isNil(userName) ? 'Not disclosed' : userName
      }
      this.$store.dispatch('category/POST_COMMENT', commentData)
    }
  },
  head() {
    return {
      title: `NutsFamily - ${this.item.name}`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: `${this.item.description.shortDetails}`
        }
      ]
    }
  }
}
</script>

<style lang="scss">
.comment-container {
  background: rgba(56, 189, 207, 0.05);
  border-radius: 5px;
}
a.comment-link {
  text-decoration: none;
  color: gray;
}

.product-page {
  $self: &;
  &__wrapper {
    #{$self}__image {
      width: 100%;
    }
    #{$self}__info {
      #{$self}__name {
        display: none;
      }
      #{$self}__numbers {
        display: flex;
        justify-content: space-between;
        align-items: center;
        #{$self}__price-info {
          #{$self}__price {
            font-weight: 900;
            font-size: 30px;
            color: #000;
          }
          #{$self}__available {
            color: #00ab48;
            .red {
              color: #c60000;
            }
          }
        }
      }
      #{$self}__rating {
        #{$self}__reviews-link {
          margin-left: 4px;
        }
      }
    }
  }
}

.v-application p {
  margin-bottom: 0 !important;
}

.v-rating .v-icon {
  padding: 0 !important;
}
</style>
