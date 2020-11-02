<template>
  <v-app dark>
    <v-app-bar flat dark elevation-0 :clipped-left="clipped" fixed app>
      <nuxt-link to="/" class="link-decoration">
        <v-toolbar-title class="display-1 pa-5 white--text" v-text="title" />
      </nuxt-link>
      <v-spacer />

      <div class="flex-grow-1 mt-5"></div>
      <v-spacer />

      <client-only>
        <div v-show="$vuetify.breakpoint.mdAndUp">
          <v-toolbar-items>
            <v-btn v-for="item in menu" :key="item.id" text class="white--text">
              <div class="default__link" @click="item.click">
                {{ item.title }}
              </div>
            </v-btn>
          </v-toolbar-items>
        </div>
      </client-only>
      <div v-show="$vuetify.breakpoint.smAndDown">
        <v-app-bar-nav-icon @click.stop="rightDrawer = !rightDrawer" />
      </div>
    </v-app-bar>

    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <client-only>
      <v-navigation-drawer v-model="rightDrawer" right temporary fixed>
        <v-list>
          <v-list-item
            v-for="item in menu"
            :key="item.id"
            @click.native="item.click"
          >
            <v-list-item-action>
              <v-icon light :class="item.icon" />
            </v-list-item-action>
            <v-list-item-title class="default__link">{{
              item.title
            }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </client-only>
  </v-app>
</template>

<script>
import { auth } from 'firebase'
export default {
  data() {
    return {
      clipped: false,
      drawer: false,
      navItems: [
        {
          icon: 'mdi mdi-login',
          title: 'Вхід',
          to: '/authentication',
          showWhenLoggedIn: false,
          showWhenAnonymous: true,
          click: () => {
            this.$router.push('/authentication')
          }
        },
        {
          icon: 'mdi mdi-account-settings-outline',
          title: 'Мій аккаунт',
          to: '/me',
          showWhenLoggedIn: true,
          showWhenAnonymous: false,
          click: () => {
            this.$router.push('/me')
          }
        },
        {
          icon: 'mdi mdi-cart-variant ',
          title: 'Мій кошик',
          to: '/cart',
          showWhenLoggedIn: true,
          showWhenAnonymous: true,
          click: () => {
            this.$router.push('/cart')
          }
        },
        {
          icon: 'mdi mdi-clipboard-list-outline',
          title: 'Замовлення',
          to: '/checkout',
          showWhenLoggedIn: true,
          showWhenAnonymous: true,
          click: () => {
            this.$router.push('/checkout')
          }
        },
        {
          icon: null,
          title: 'Вихід',
          showWhenLoggedIn: true,
          showWhenAnonymous: false,
          click: async () => {
            await auth().signOut()
            this.$router.push('/')
          }
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'NUTSFAMILY'
    }
  },
  computed: {
    menu() {
      if (!this.currentUser.loggedIn) {
        return this.navItems.filter((itm) => itm.showWhenAnonymous === true)
      } else {
        return this.navItems.filter((itm) => itm.showWhenLoggedIn === true)
      }
    },
    currentUser() {
      return this.$store.getters['auth/getUser']
    }
  }
}
</script>
<style lang="scss" scoped>
body {
  background-color: #fff;
}
.link-decoration {
  text-decoration: none;
  color: #fff;
  text-underline-position: unset;
}
.top-nav {
  color: #38bdcf;
}
.triangle-background {
  position: fixed;
  top: 0;
}

.v-container {
  background: linear-gradient(to right, #9b9b9b, #d0d0d0);
}

.default {
  &__link {
    cursor: pointer;
  }
}
/* .v-toolbar {
  box-shadow: none !important;
  -webkit-box-shadow: none !important;
} */

/* .triangle {
  width: 200px;
  height: 200px;
  background: linear-gradient(
    to bottom right,
    #fff 0%,
    #fff 50%,
    #a48d01 50%,
    #a48d01 100%
  );
} */

/* .container
	position: relative
	width: 100%
	min-height: 100vh
	margin: 0 auto
	overflow: hidden
	&::after */
/* body::after {
  content: '';
  position: absolute;
  background-color: blue;
  padding-bottom: 141.42136%;
  width: 100%;
  bottom: 0;
  left: 0;
  transform: rotate(65.5deg);
  transform-origin: left bottom;
} */
/* Rectangle 4 */
</style>
