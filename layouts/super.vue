<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      src="/dashboard_back_1.jpg"
      :mini-variant.sync="mini"
      floating
      permanent
      app
      dark
    >
      <v-list-item class="px-2">
        <v-list-item-avatar>
          <v-img :src="userData.avatar?`${$axios.defaults.baseURL}${userData.avatar.url}`:'/avatar-default-icon.png'"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>John Leider</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>
      <v-list-item nav dense link @click="logout">
        <v-list-item-icon>
          <v-icon color="red darken-2">mdi-logout</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title class="menu-title">Logout</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>

      <v-list dense>
        <v-list-item :to="item.to" router exact v-for="(item,index) in items" :key="index" link>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <template v-slot:append>
        <v-list-item nav dense>
          <v-list-item-icon>
            <v-icon color="blue darken-2">mdi-email-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="menu-title">Contact Us</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-navigation-drawer>
    <v-app-bar flat dense app color="#fff">
      <v-app-bar-nav-icon @click.stop="mini = !mini" />
      <v-spacer></v-spacer>
    </v-app-bar>
    <v-content>
      <v-container fluid>
        <nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import PageHeader from "@/components/PageHeader";
import { mapState } from "vuex";
export default {
  head() {
    return {
      title: "ARMS Admin - " + this.$route.name,
    };
  },
  components: {
    PageHeader,
  },
  data() {
    return {
      drawer: true,
      mini: true,
      items: [
        { title: "Home", icon: "home", to: '/super'},
        { title: "Departments", icon: "domain", to: '/super/departments' },
      ],
    };
  },
  computed: {
    ...mapState({
      userData: (state) => state.userData,
    }),
  },
  mounted() {
    
  },
  methods: {
    async logout() {
      await this.$auth.logout();
      window.location.reload();
    },
  },
};
</script>

<style scoped>
.menu-title {
  font-size: 14px;
  font-weight: normal;
  color: #f5f5f5;
}
.name-title {
  font-size: 14px;
}
.name-subtitle {
  font-size: 12px;
}

.chivron {
  border-left: 5px solid green;
}
</style>
