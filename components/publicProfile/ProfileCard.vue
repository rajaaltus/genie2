<template>
  <v-col cols="12" md="3" lg="3">
    <v-card tile elevation="1">
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="headline font-weight-medium">{{
            userProfile.name
          }}</v-list-item-title>
          <v-list-item-subtitle>{{
            userProfile.designation
          }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <div>
        <v-hover>
          <template v-if="userProfile.gender === 'Male'">
            <v-img src="/boy.png" max-width="100%"> </v-img>
          </template>
          <template v-else>
            <v-img src="/girl.png" max-width="100%"> </v-img>
          </template>
        </v-hover>
      </div>

      <v-card-text>
        <v-icon small class="mdi mdi-email-outline mr-3"></v-icon>
        <span class="body-2 black-text"> {{ userProfile.personal_email }}</span
        ><br />
        <v-icon small class="mdi mdi-phone mr-3"></v-icon>
        <span class="body-2 text--black">
          {{ userProfile.contact_no }}
        </span>
      </v-card-text>
    </v-card>
  </v-col>
</template>

<script>
export default {
  props: ['userProfile']
}
</script>
