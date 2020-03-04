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
      <!--<v-list-item v-if="!mini" class="px-4 py-8">
          <v-img  src="/logo.png" max-width="50%"></v-img>
      </v-list-item>
      <v-list-item  v-else class="px-2 py-6">
        <v-img src="/favicon.ico" max-width="100%"></v-img>
      </v-list-item>-->

      <v-list-item class="px-2">
          <v-list-item-avatar>
            <v-img src="https://randomuser.me/api/portraits/men/85.jpg"></v-img>
          </v-list-item-avatar>
          
          <v-list-item link style="padding:0 0 0 7px;">
              <v-list-item-content>
                <v-list-item-title class="title">{{this.$store.state.auth.user.username}}</v-list-item-title>
                <v-list-item-subtitle>{{this.$store.state.auth.user.email}}</v-list-item-subtitle>
                <v-list-item-subtitle>{{this.$store.state.auth.user.userType}}</v-list-item-subtitle>
              </v-list-item-content>
          </v-list-item>
      </v-list-item>

      <v-divider></v-divider>
     
      <v-list-item dense link to="/user_profile">
          <v-list-item-icon>
            <v-icon color="green darken-1">mdi-account</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="menu-title">My Profile</v-list-item-title>
          </v-list-item-content>
      </v-list-item>

      <v-list-item dense link to="/settings">
         <v-list-item-icon>
            <v-icon color="orange">mdi-cogs</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="menu-title">Settings</v-list-item-title>
          </v-list-item-content>
      </v-list-item>

      <v-list-item  nav dense link @click="logout">
          <v-list-item-icon>
            <v-icon color="red darken-2">mdi-logout</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="menu-title">Logout</v-list-item-title>
          </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <!-- <v-list nav>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          :to="item.to"
          router
          exact
          link
          class="px-2"
          dense
        >
        <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="menu-title">{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list> -->
      <v-list nav dense>
       
        <template v-for="item in items">
          <v-list-group
            v-if="item.children"
            :key="item.title"
            :to="item.to"
            v-model="item.model"
            :prepend-icon="item.icon"
            append-icon=""
            color="green"
          >
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title >
                  {{ item.title }}
                </v-list-item-title>
              </v-list-item-content>
            </template>
            <v-list-item
              v-for="(child, i) in item.children"
              :key="i"
              :to="child.to"
              link
              router
              dense
              exact
            >
              <v-list-item-action v-if="child.icon">
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  {{ child.title }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
          <v-list-item
            v-else
            :key="item.title"
            :to="item.to"
            link
            router
            exact
            dense
          >
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                {{ item.title }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>


      <template v-slot:append>
        <v-list-item  nav dense link @click="logout">
          <v-list-item-icon>
            <v-icon color="blue darken-2">mdi-contact-mail</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="menu-title">Contact Us</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>

      </v-navigation-drawer>
    
    <v-app-bar
      app
      color="#f9f9f9"
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
          { title: 'Home', icon: 'mdi-home', to: '/admin' },
          { 
            title: 'Department', 
            icon: 'mdi-hospital-building',
            children: [
              {
                title: 'About',
                icon: 'mdi-chevron-double-right',
                to: '/admin/departments'
              },
              {
                title: 'Patient Care Activities',
                icon: 'mdi-chevron-double-right',
                to: '/admin/departments/pcActivities'
              },
              {
                title: 'HRD',
                icon: 'mdi-chevron-double-right',
                to: '/admin/departments/hrd'
              },
              {
                title: 'Faculty / Staff',
                icon: 'mdi-chevron-double-right',
                to: '/admin/departments/faculty'
              }
            ]  
          },
          { 
            title: 'Activities & Resources', 
            icon: 'mdi-library', 
            children: [
              {
                title: 'Faculty / Staff',
                icon: 'mdi-chevron-double-right',
                to: '/admin/activities/faculties'
              },
              {
                title: 'Students',
                icon: 'mdi-chevron-double-right',
                to: '/admin/activities/students'
              },
            ]
          },
          { title: 'Approval Status', icon: 'mdi-cards', to: '/admin/approvals' },
          { title: 'Reports', icon: 'mdi-chart-bar', to: '/admin/reports' },
        ],
        itemsFaculty: [
          { title: 'Home', icon: 'mdi-home', to: '/admin' },
          { 
            title: 'Activities & Resources', 
            icon: 'mdi-library', 
            children: [
              {
                title: 'Faculty / Staff',
                icon: 'mdi-chevron-double-right',
                to: '/admin/activities/faculties'
              }
            ]
          },
          { title: 'Approval Status', icon: 'mdi-cards', to: '/admin/approvals' },
          { title: 'Reports', icon: 'mdi-chart-bar', to: '/admin/reports' },
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

.menu-title
{
  font-size: 14px;
  font-weight: normal;
  color: #f5f5f5;
}
.chivron {
  border-left: 5px solid green;
}
</style>