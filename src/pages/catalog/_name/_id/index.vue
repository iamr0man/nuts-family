<template>
  <div class="product-page">
    <h1 class="product-page__name">{{ item.name }}</h1>
    <div class="product-page__wrapper">
      <v-carousel cycle hide-delimiter-background show-arrows-on-hover>
        <v-carousel-item v-for="(v, i) in item.image" :key="i">
          <img class="product-page__image" :src="v" alt="product image" />
        </v-carousel-item>
      </v-carousel>
      <div class="product-page__info">
        <h1 class="product-page__name">{{ item.name }}</h1>
        <div class="product-page__numbers">
          <div class="product-page__rating">
            <v-rating
              class="product-page__stars"
              readonly
              color="secondary"
              :value="countAvgStars"
            />
            <p class="product-page__reviews-link">
              {{ item.reviews.length }} {{ ending }}
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
        <p class="product-page__short-description">
          {{ item.description.shortDetails }}
        </p>
        <div class="product-page__select">
          <p class="product-page__label label">Вага:</p>
          <WeightSelect :weight="weight" @changeWeight="updateWeight" />
        </div>
        <div class="product-page__actions">
          <p class="product-page__label label">Кількість:</p>
          <v-text-field
            v-model="amount"
            :rules="amountRules"
            class="product-page__amount"
            solo
          />
          <v-btn
            v-if="!isExistInCart"
            class="product-page__buy"
            color="primary"
            @click="addToCart"
            >Купити</v-btn
          >
          <nuxt-link v-else to="/cart">Товар вже в кошику</nuxt-link>
        </div>
      </div>
      <div class="product-page__additional">
        <v-expansion-panels focusable inset>
          <v-expansion-panel>
            <v-expansion-panel-header>
              Опис
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <p
                v-for="(item, i) in item.description.details"
                :key="i"
                class="mb-8"
              >
                {{ item }}
              </p>
            </v-expansion-panel-content>
          </v-expansion-panel>
          <v-expansion-panel>
            <v-expansion-panel-header>
              Відгуки
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-row class="mt-3" justify="center">
                <v-dialog
                  v-if="user.loggedIn"
                  v-model="dialog"
                  fullscreen
                  hide-overlay
                  transition="dialog-bottom-transition"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      class="my-2"
                      color="primary"
                      dark
                      v-bind="attrs"
                      v-on="on"
                    >
                      Написати відгук
                    </v-btn>
                  </template>
                  <v-card class="pa-4">
                    <v-form refs="comments">
                      <v-toolbar dark color="primary">
                        <v-btn icon dark @click="dialog = false">
                          <v-icon>mdi-close</v-icon>
                        </v-btn>
                        <v-toolbar-title>Написати відгук</v-toolbar-title>
                      </v-toolbar>
                      <div class="product-page__input">
                        <p class="product-page__label label">Рейтинг:</p>
                        <v-rating v-model="rating" :rules="requiredRule" />
                      </div>
                      <div class="product-page__input">
                        <p class="product-page__label label">Коментар:</p>
                        <v-textarea v-model="comment" :rules="requiredRule" />
                      </div>
                      <div class="product-page__input">
                        <p class="product-page__label label">
                          Ваше ім'я та прізвище:
                        </p>
                        <v-text-field
                          v-model="displayName"
                          :rules="requiredRule"
                        />
                      </div>
                      <div class="product-page__input">
                        <p class="product-page__label label">
                          Електронна пошта:
                        </p>
                        <v-text-field v-model="email" :rules="requiredRule" />
                      </div>
                      <v-btn @click="dialog = false">Скасувати</v-btn>
                      <v-btn color="primary" @click="postComment"
                        >Залишити відгук</v-btn
                      >
                    </v-form>
                  </v-card>
                </v-dialog>
              </v-row>
              <Review v-for="(v, i) in reviews" :key="i" :review="v" />
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { v1 as uuidv1 } from 'uuid'
import priceMixin from '~/mixins/priceMixin'
import votesMixin from '~/mixins/votesMixin'
import WeightSelect from '~/components/WeightSelect'
import Review from '~/components/Review'

export default {
  components: {
    WeightSelect,
    Review
  },
  mixins: [priceMixin, votesMixin],
  async asyncData(ctx) {
    const itemId = ctx.params.id
    await ctx.store.dispatch('category/VIEW_ITEM', itemId)
    return {
      itemId
    }
  },
  data: () => ({
    requiredRule: [(v) => !!v || 'Це поле повинно бути заповене'],
    commentContent: null,
    additional: ['Відгуки', 'Опис'],
    dialog: false,
    rating: 0,
    comment: '',
    displayName: '',
    email: '',
    reviews: []
  }),
  computed: {
    ...mapGetters('auth', { user: 'getUser', profile: 'getProfile' }),
    ...mapGetters('category', { item: 'getItem' }),
    isAvailable() {
      return this.item.isAvailable ? 'Є в наявності' : 'Немає в наявності'
    },
    ending() {
      return this.item.reviews.length > 1 ? 'ВІДГУКИ' : 'ВІДГУК'
    }
  },
  mounted() {
    this.initFields()
    if (this.user.loggedIn) {
      this.displayName = this.user.data.displayName
      this.email = this.user.data.email
    }
  },
  beforeDestroy() {
    this.$store.dispatch('category/LEAVE_ITEM')
  },
  methods: {
    initFields() {
      const copy = this.item.reviews.slice()
      this.reviews = copy.sort((a, b) => b.timestamp - a.timestamp)
      this.dialog = false
    },
    async postComment() {
      if (this.$refs.review.validate()) {
        const userName = this.user.data.displayName
        const commentData = {
          itemId: this.itemId,
          userName,
          rating: this.rating,
          comment: this.comment,
          timestamp: new Date().getTime()
        }
        await this.$store.dispatch('category/POST_COMMENT', commentData)
        this.initFields()
      }
    },
    async addToCart() {
      const data = {
        id: uuidv1(),
        productId: this.itemId,
        categoryName: this.$route.params.name,
        weight: this.weight,
        amount: this.amount
      }
      await this.$store.dispatch('cart/ADD_CART_PRODUCT', data)
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
    overflow: hidden;
    .v-window {
      height: 250px !important;
    }
    #{$self}__image {
      width: 100%;
    }
    #{$self}__info {
      #{$self}__name {
        display: none;
      }
      .label {
        font-weight: 600;
        font-size: 18px;
      }
      #{$self}__numbers {
        display: flex;
        justify-content: space-between;
        align-items: center;
        #{$self}__rating {
          .v-rating .v-icon {
            padding: 0 !important;
          }
          #{$self}__reviews-link {
            margin-left: 4px;
          }
        }
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
      #{$self}__actions {
        display: flex;
        justify-content: flex-start;
        align-items: baseline;

        .v-input__slot {
          width: 70px !important;
          margin-left: 10px;
        }
      }
    }
  }
  @media screen and (min-width: 500px) {
    .product-page {
      &__wrapper {
        margin: 0 auto;
        width: 450px;
        #{$self}__image {
          width: 460px;
        }
      }
    }
  }
  @media screen and (min-width: 1024px) {
    .product-page {
      display: flex;
      width: 700px;
    }
  }
}
</style>
