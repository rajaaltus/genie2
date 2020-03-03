<template>
  <v-app>
     <v-navigation-drawer
      v-model="drawer"
      
      src="/dashboard_back.jpg"
      :mini-variant.sync="mini"
      permanent
      app
      dark
    >
      <v-list-item v-if="!mini" class="px-4 py-8">
          <v-img  src="/logo.png" max-width="60%"></v-img>
      </v-list-item>
      <v-list-item  v-else class="px-2 py-6">
        <v-img src="/favicon.ico" max-width="100%"></v-img>
      </v-list-item>

      <v-list>
            <v-list-item class="px-2">
              <v-list-item-avatar>
                <v-img src="https://randomuser.me/api/portraits/men/85.jpg"></v-img>
              </v-list-item-avatar>
            </v-list-item>

            <v-list-item link>
              <v-list-item-content>
                <v-list-item-title class="title">{{this.$store.state.auth.user.username}}</v-list-item-title>
                <v-list-item-subtitle>{{this.$store.state.auth.user.email}}</v-list-item-subtitle>
                <v-list-item-subtitle>{{this.$store.state.auth.user.userType}}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
      <v-list-item dense>
        <v-list-item-icon>
            <v-icon>mdi-account</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>My Profile</v-list-item-title>
          </v-list-item-content>
      </v-list-item>
      <v-list-item dense>
        <v-list-item-icon>
            <v-icon>mdi-cogs</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Settings</v-list-item-title>
          </v-list-item-content>
      </v-list-item>
      <v-list-item dense nav link @click="logout">
        <v-list-item-icon>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list nav dense>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          :to="item.to"
          router
          exact
          link
          class="px-2"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      app
      color="#EEEEEE"
    >
      <v-app-bar-nav-icon @click.stop="mini = !mini" />
    </v-app-bar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import PageHeader from '@/components/PageHeader'
export default {
  head () {
		return {
			'title': 'ARMS Admin - ' + this.$route.name
		}
  },
  components: {
    PageHeader
  },
  data () {
    return {
      drawer: true,
        items: [
          { title: 'Dashboard', icon: 'mdi-home-city', to: '/admin' },
          { title: 'Approvals', icon: 'mdi-account', to: '/admin/approvals' },
          { title: 'Department', icon: 'mdi-account-group-outline', to: '/admin/department' },
        ],
        mini: true,
    }
  },
  methods: {
    logout() {
      return this.$auth.logout()
    }
  }
}
</script>

<style scoped>
.v-navigation-drawer v-navigation-drawer--clipped v-navigation-drawer--fixed v-navigation-drawer--mini-variant v-navigation-drawer--open theme--dark {
 top: 0 !important; 
}
</style>