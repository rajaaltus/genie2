<template>
  <v-app>
    <v-container>
    <h1>#{{$route.params.id}}. User Profile: </h1>
    <pre>{{ userProfile }}</pre>
    </v-container>
  </v-app>
</template>

<script>
export default {
  layout: 'profile',
  auth: false,
  data() {
    return {

    }
  },
  computed: {
    userProfile() {
      return this.$store.state.user.userProfile;
    }
  },
  async fetch({store, params}) {
    await store.dispatch('user/setUserProfile', {id: params.id});
  }
}
</script>