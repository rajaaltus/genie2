<template>
  <div>
    <v-row v-for="(item, index) in publications" :key="index">
      <v-col cols="12" md="12" lg="12">
        <v-card flat class="my-card">
          <v-row>
            <v-col cols="3" md="3" lg="3">
              <v-img
                :src="
                  item.image !== null && item.image !== undefined
                    ? $axios.defaults.baseURL + item.image.url
                    : '/award_ph.jpg'
                "
                lazy-src="/award_ph.jpg"
                aspect-ratio="1"
                class="grey lighten-2"
                max-width="200"
                max-height="120"
              >
                <template v-slot:placeholder>
                  <v-row
                    class="fill-height ma-0"
                    align="center"
                    justify="center"
                  >
                    <v-progress-circular
                      indeterminate
                      color="grey lighten-5"
                    ></v-progress-circular>
                  </v-row>
                </template>
              </v-img>
            </v-col>
            <v-col cols="9" md="9" lg="9">
              <v-btn label class="mb-2" x-small color="green darken-2" dark>
                Date Awarded: {{ item.from_date }} </v-btn
              ><br />
              <span class="body-2 font-weight-normal">
                {{ item.name }} from {{ item.forum }},
                {{ item.brief_report }}. </span
              ><br />
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  props: ['publications']
}
</script>
