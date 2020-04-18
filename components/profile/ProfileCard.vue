<template>
  <div>
    <v-card tile class="mx-auto my-card">
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="headline"
            >{{profile[0].name}}</v-list-item-title
          >
          <v-list-item-subtitle>{{profile[0].designation}}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-img v-if="image_url!==null" :src="`${$axios.defaults.baseURL}${image_url}`" height="auto"></v-img>
      <v-img v-else src="/image_placeholder.png" height="auto"></v-img>

      <v-card-text>
        <v-icon small color="red" class="mdi mdi-email-outline mr-3"></v-icon>
        <span class="body-2">{{profile[0].personal_email}}</span><br />
        <v-icon small color="blue" class="mdi mdi-phone mr-3"></v-icon>
        <span class="body-2">{{profile[0].contact_no}}</span>
      </v-card-text>

      <v-card-actions>
        <v-switch
          color="green darken-3"
          label="Public Access"
          class="pl-2"
        ></v-switch>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { mapState } from  'vuex'
export default {
  props: ['profile'],
  data() {
    return {
      image_url: null
    }
  },
  
  async mounted() {
    if (this.profile.image!==null)
      this.image_url = this.profile[0].image.url
    
  }
}
</script>
