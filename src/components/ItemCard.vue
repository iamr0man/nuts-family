<template>
  <nuxt-link :to="link" class="item-card">
    <img class="item-card__image" :src="item.image" alt="image" />
    <h3 class="item-card__name">
      {{ item.name }}
    </h3>
    <v-rating :value="countAvgStars" readonly color="secondary" />
    <WeightSelect :weight="weight" @changeWeight="updateWeight" />
    <p class="item-card__price">{{ price }} грн.</p>
    <v-btn class="item-card__action primary">Купити</v-btn>
  </nuxt-link>
  <!--  </v-card>-->
  <!--  <v-hover>-->
  <!--    <template v-slot="{ hover }">-->
  <!--      <v-card-->
  <!--        height="100%"-->
  <!--        :elevation="hover ? 12 : 3"-->
  <!--        class="deal-card d-flex flex-column"-->
  <!--        @click="navigateToDeal(deal.id)"-->
  <!--      >-->
  <!--        <v-card-title primary-title>-->
  <!--          <div class="subtitle-2 text-break">-->
  <!--            {{ deal.title }}-->
  <!--          </div>-->
  <!--        </v-card-title>-->
  <!--        <v-card-text class="d-flex flex-column flex-grow-1">-->
  <!--          <v-row>-->
  <!--            <v-col-->
  <!--              v-if="deal.image"-->
  <!--              :cols="imageCol"-->
  <!--              lg="12"-->
  <!--              xs12-->
  <!--              class="d-flex flex-column text&#45;&#45;center"-->
  <!--              ><div class="flex-grow-1 align-self-center">-->
  <!--                <img :src="deal.image" :width="imageWidth" class="deal-image" />-->
  <!--              </div>-->
  <!--            </v-col>-->
  <!--            <v-col-->
  <!--              :cols="descriptionCol"-->
  <!--              lg="12"-->
  <!--              xs12-->
  <!--              class="d-flex flex-column"-->
  <!--              ><div class="caption" style="">-->
  <!--                {{ deal.description | truncate(100) }}-->
  <!--              </div>-->
  <!--            </v-col>-->
  <!--          </v-row>-->

  <!--          <div class="d-flex justify-space-between">-->
  <!--            <div><DisplayNameComponent :user="deal.user" /></div>-->
  <!--            <div>-->
  <!--              <v-tooltip top>-->
  <!--                <template v-slot:activator="{ on }">-->
  <!--                  <span class="caption" v-on="on">-->
  <!--                    -{{ discountPercent }}%-->
  <!--                  </span>-->
  <!--                </template>-->
  <!--                <span>Sena kaina: € {{ deal.oldPrice }}</span>-->
  <!--              </v-tooltip>-->

  <!--              <span class="body-1  green&#45;&#45;text darken-2 font-weight-medium">-->
  <!--                €{{ deal.newPrice }}-->
  <!--              </span>-->
  <!--            </div>-->
  <!--          </div>-->
  <!--          <div class="d-flex align-center justify-space-between">-->
  <!--            <div></div>-->
  <!--            <div>-->
  <!--              <span class="font-weight-medium pl-1 pr-1">-->
  <!--                <v-btn text icon @click.stop="addVote(deal.id, 'downvote')"-->
  <!--                  ><v-icon color="blue">mdi-minus</v-icon></v-btn-->
  <!--                >-->
  <!--              </span>-->
  <!--              {{ deal.score }}-->
  <!--              <span class="font-weight-medium pl-1 pr-1"-->
  <!--                ><v-btn text icon @click.stop="addVote(deal.id, 'upvote')">-->
  <!--                  <v-icon color="red">mdi-plus</v-icon>-->
  <!--                </v-btn></span-->
  <!--              >-->
  <!--            </div>-->
  <!--          </div>-->
  <!--        </v-card-text>-->
  <!--        <v-card-actions-->
  <!--          v-if="deal.endsAt !== ''"-->
  <!--          class="text-center justify-center overline font-weight-thin grey&#45;&#45;text"-->
  <!--        >-->
  <!--          <div class="">Galioja iki {{ deal.endsAt }}</div>-->
  <!--        </v-card-actions>-->
  <!--      </v-card>-->
  <!--    </template>-->
  <!--  </v-hover>-->
</template>

<script>
import priceMixin from '@/mixins/priceMixin'
export default {
  mixins: [priceMixin],
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    link() {
      return this.$route.params.name + '/' + this.item.id
    }
  },
  methods: {
    navigateToDeal() {
      // TODO
      // this.$router.push({ name: 'details', params: { _id: id } })
    }
  }
}
</script>

<style lang="scss" scoped>
.item-card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #ffffff;
  border-radius: 20px;
  box-shadow: 20px 20px 60px #d9d9d9, -20px -20px 60px #ffffff;
  text-decoration: none;
  &__image {
    width: 100%;
  }
  &__price {
    font-weight: 900;
    font-size: 20px;
    color: #000;
  }
  &__action {
    margin: 10px 0;
  }
}
</style>
