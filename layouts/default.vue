<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      src="/dashboard_back_1.jpg"
      :mini-variant.sync="mini"
      floating
      app
      dark
    >
      <div class="py-3" style="max-height:400px">
      <v-list-item v-if="!mini" >
        
        <v-img src="/logo.png" max-width="30%"></v-img>
        
      </v-list-item>
      <v-list-item v-else style="max-height:200px">
        <v-img src="/logo.png" max-width="30%"></v-img>
       
      </v-list-item>
      </div>
      <v-divider></v-divider>
      <!-- {{avatar.image.url}} -->
      <v-list-item class="px-2">
        <v-list-item-avatar>
          <v-img :src="avatar.avatar?`${$axios.defaults.baseURL}${avatar.avatar.url}`:'/avatar-default-icon.png'"></v-img>
        </v-list-item-avatar>

        <v-list-item-title class="pl-2"
          >{{ this.$store.state.auth.user.fullname }} <br />
          <span class="caption font-weight-light">
          Head of the Department 
          </span></v-list-item-title
        >

        <!-- <v-btn icon small color="green" @click.stop="mini = !mini"> </v-btn> -->
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

      <v-list-item dense link to="/settings" v-if="$auth.user.userType==='DEPARTMENT'">
        <v-list-item-icon>
          <v-icon color="orange">mdi-cogs</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title class="menu-title">Settings</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item nav dense link @click="logout">
        <v-list-item-icon>
          <v-icon color="red darken-2">mdi-logout</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title class="menu-title">Logout</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list nav>
        <div v-if="$auth.user.userType==='DEPARTMENT'">
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
                <v-list-item-title class="menu-title">
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
              class="px-2"
            >
              <v-list-item-action v-if="child.icon">
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title class="menu-title">
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
              <v-list-item-title class="menu-title">
                {{ item.title }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
        </div>
        <!-- Faculty forms -->
        <div v-if="$auth.user.userType==='FACULTY'">
        <template v-for="item in itemsFaculty" >
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
                <v-list-item-title class="menu-title">
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
              class="px-2"
            >
              <v-list-item-action v-if="child.icon">
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title class="menu-title">
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
              <v-list-item-title class="menu-title">
                {{ item.title }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
        </div>
        <!-- Student forms -->
        <div v-if="$auth.user.userType==='STUDENT'">
        <template v-for="item in itemsStudent" >
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
                <v-list-item-title class="menu-title">
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
              class="px-2"
            >
              <v-list-item-action v-if="child.icon">
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title class="menu-title">
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
              <v-list-item-title class="menu-title">
                {{ item.title }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
        </div>
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
      <h2>Reporting Year</h2>
      <span class="yellow darken-1 ml-3 px-2 display-1 font-weight-bold">
        {{ $store.state.selectedYear }} - {{ $store.state.selectedYear + 1 }}
      </span>
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
export default {
  head() {
    return {
      title: "ARMS Admin - " + this.$route.name
    };
  },
  components: {
    PageHeader
  },
  data() {
    return {
      drawer: true,
      items: [
        { title: "Home", icon: "mdi-home", to: "/admin" },
        {
          title: "Department",
          icon: "mdi-hospital-building",
          children: [
            {
              title: "About",
              icon: "mdi-chevron-double-right",
              to: "/admin/departments"
            },
            {
              title: "Patient Care Activities",
              icon: "mdi-chevron-double-right",
              to: "/admin/departments/pcActivities"
            },
            {
              title: "HRD",
              icon: "mdi-chevron-double-right",
              to: "/admin/departments/hrd"
            },
            {
              title: "Departmental Staff",
              icon: "mdi-chevron-double-right",
              to: "/admin/departments/faculty"
            }
          ]
        },
        {
          title: "Activities & Resources",
          icon: "mdi-library",
          children: [
            {
              title: "Faculty / Staff",
              icon: "mdi-chevron-double-right",
              to: "/admin/activities/faculties"
            },
            {
              title: "Students",
              icon: "mdi-chevron-double-right",
              to: "/admin/activities/students"
            }
          ]
        },
        { title: "Approval Status", icon: "mdi-cards", to: "/admin/approvals" }
        // { title: "Reports", icon: "mdi-chart-bar", to: "/admin/reports" },
        // { title: "Test Report", icon: "mdi-cogs", to:"/admin/medium" }
      ],
      itemsFaculty: [
        { title: "Home", icon: "mdi-home", to: "/admin" },
        {
          title: "Activities & Resources",
          icon: "mdi-library",
          children: [
            {
              title: "Faculty / Staff",
              icon: "mdi-chevron-double-right",
              to: "/admin/activities/faculties"
            }
          ]
        },
        { title: "Approval Status", icon: "mdi-cards", to: "/admin/approvals" }
        // { title: "Reports", icon: "mdi-chart-bar", to: "/admin/reports" }
      ],
      itemsStudent: [
        { title: "Home", icon: "mdi-home", to: "/admin" },
        {
          title: "Activities & Resources",
          icon: "mdi-library",
          children: [
            {
              title: "Student",
              icon: "mdi-chevron-double-right",
              to: "/admin/activities/students"
            }
          ]
        },
        { title: "Approval Status", icon: "mdi-cards", to: "/admin/approvals" }
        // { title: "Reports", icon: "mdi-chart-bar", to: "/admin/reports" }
      ],
      mini: true
    };
  },
  computed: {
    avatar() {
      return this.$auth.user;
    }
  },
  
  methods: {
    logout() {
      return this.$auth.logout();
    }
  }
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
