<template>
  <v-system-bar height="40" color="#f4bd2d">
      <v-container>
        <v-row>
          <v-col cols="6" md="3" lg="3">
            <v-icon small class="pr-1" color="black">mdi-lightbulb-on</v-icon>
            <span class="font-weight-normal black--text text-uppercase"
              >Profile ID: {{ userProfile.employee_id }}</span
            >
          </v-col>
          <v-col cols="6" md="4" lg="4">
            <v-icon small class="pr-1" color="black">mdi-account-edit</v-icon>
            <span class="font-weight-normal black--text text-uppercase"
              ><nuxt-link to="/user_profile">Edit Profile</nuxt-link></span
            >
          </v-col>
        </v-row>
      </v-container>
    </v-system-bar>
</template>

<script>
export default {
  props: ['userProfile']
}
</script>