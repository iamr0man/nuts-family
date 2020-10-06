<template>
  <div class="product-page">
    <div class="product-page__name"></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { firestore } from 'firebase'
import { isNil, get } from 'lodash'
// import DisplayDateComponent from '@/components/DisplayDateComponent'
import votesMixin from '@/mixins/votesMixin'

export default {
  // components: { DisplayDateComponent },
  mixins: [votesMixin],
  async asyncData(ctx) {
    const dealId = ctx.params.id
    await ctx.store.dispatch('category/VIEW_DEAL', dealId)
    return {
      dealId
    }
  },
  data: () => ({
    commentContent: null
  }),
  computed: {
    ...mapGetters('auth', { user: 'getUser' }),
    ...mapGetters('category', { deal: 'getItem', comments: 'getComments' })
  },

  mounted() {
    this.$store.dispatch('category/INITIATE_LISTENING_TO_COMMENTS', this.dealId)
  },
  beforeDestroy() {
    this.$store.dispatch('category/LEAVE_DEAL')
  },
  methods: {
    postComment() {
      const userName = get(this.user.data, 'displayName')
      const commentData = {
        dealId: this.dealId,
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
      title: `Dealas - ${this.deal.title}`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: `${this.deal.description}`
        }
      ]
    }
  }
}
</script>
<style scoped>
* {
  font-family: 'Montserrat', sans-serif;
}
.offer-card {
  min-width: 220px;
}
.comment-container {
  background: rgba(56, 189, 207, 0.05);
  border-radius: 5px;
}
a.comment-link {
  text-decoration: none;
  color: gray;
}
</style>
