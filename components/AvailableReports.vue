<template>
  <div class="text-center">
    <v-bottom-sheet v-model="sheet" inset>
      <v-list>
        <v-subheader>Open in</v-subheader>
        <v-list-item
          v-for="tile in availableReports"
          :key="tile.id"
          @click="sheet = false"
        >
          <v-list-item-avatar>
            <v-avatar size="32px" tile>

              <img
                :src="`https://cdn.vuetifyjs.com/images/bottom-sheets/${tiles[0].img}`"
                :alt="tile.annual_year"
              >
            </v-avatar>
          </v-list-item-avatar>
          <v-list-item-title>{{ tile.annual_year }} - {{tile.userType}}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-bottom-sheet>
  </div>
</template>

<script>
  export default {
    props: ['availableReports'],
    data: () => ({
      sheet: true,
      tiles: [
        
        { img: 'keep.png', title: 'Keep' },
        { img: 'inbox.png', title: 'Inbox' },
        { img: 'hangouts.png', title: 'Hangouts' },
        { img: 'messenger.png', title: 'Messenger' },
        { img: 'google.png', title: 'Google+' },
      ],
    }),
    computed: {
      // availableReports() {
      //   return this.$store.state.report.availableReports;
      // },
      // sheet:{
      //   get() {
      //     return this.report;
      //   },
      //   set(val) {
      //     return this.report=!val;
      //     this.$emit="closed"
      //   }
      // }
    },
    // async created() {
    //   if(this.$store.state.report.availableReports)
    //     this.sheet = true;
    // },
    // mounted() {
    //   // if(this.$store.state.report.availableReports)
    //     this.sheet = true;
    // },
  }
</script>