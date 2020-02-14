<template>
  <v-app>
     <v-navigation-drawer
      v-model="drawer"
      clipped
      src="https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg"
      :mini-variant.sync="mini"
      permanent
      app
    >
      <v-list-item class="px-2">
        <v-list-item-avatar>
          <v-img src="https://randomuser.me/api/portraits/men/85.jpg"></v-img>
        </v-list-item-avatar>

        <v-list-item-title>{{this.$store.state.auth.user.lastName}}</v-list-item-title>

        <v-btn
          icon
          @click.stop="mini = !mini"
        >
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </v-list-item>
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
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    
  </v-app>
</template>

<script>
export default {
  head () {
		return {
			'title': 'ARMS Admin - ' + this.$route.name
		}
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
