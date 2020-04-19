<template>
  <div>
    <v-expansion-panels accordion multiple>
      <v-expansion-panel>
        <v-expansion-panel-header>
          <h2 class="font-weight-bold">
            <v-icon
              color="green darken-3"
              class="mdi mdi-email-outline mr-3"
            ></v-icon
            >Awards &amp; Honors
          </h2>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-row v-for="(item, index) in recognitionsData" :key="index">
            <v-col cols="12" lg="6">
              <v-img
                :src="item.image_1!==null?$axios.defaults.baseURL+item.image_1.url:'/image_placeholder.png'"
                lazy-src="/image_placeholder.png"
                aspect-ratio="1"
                class="grey lighten-2"
                max-width="500"
                max-height="300"
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
            <v-col cols="12" lg="6">
              <h2>{{item.annual_year}}</h2> <!-- Data Access example -->
              <p>{{item.award_title}}</p> <!-- Data Access example -->
              <pre>{{ item }}</pre> 
            </v-col>
          </v-row>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-header>
          <h2 class="font-weight-bold">
            <v-icon
              color="green darken-3"
              class="mdi mdi-email-outline mr-3"
            ></v-icon
            >Presentations / Posters
          </h2>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-row v-for="(item, index) in presentationsData" :key="index">
            <v-col cols="12" lg="6">
              <v-img
                :src="item.image!==null?$axios.defaults.baseURL+item.image.url:'/image_placeholder.png'"
                lazy-src="/image_placeholder.png"
                aspect-ratio="1"
                class="grey lighten-2"
                max-width="500"
                max-height="300"
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
            <v-col cols="12" lg="6">
              <h2>{{item.annual_year}}</h2> <!-- Data Access example -->
              <p>{{item.title}}</p> <!-- Data Access example -->
              <pre>{{ item }}</pre> 
            </v-col>
          </v-row>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-header>
          <h2 class="font-weight-bold">
            <v-icon
              color="green darken-3"
              class="mdi mdi-email-outline mr-3"
            ></v-icon
            >Participations
          </h2>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-row v-for="(item, index) in participationsData" :key="index">
            <v-col cols="12" lg="6">
              <v-img
                :src="item.image!==null?$axios.defaults.baseURL+item.image.url:'/image_placeholder.png'"
                lazy-src="/image_placeholder.png"
                aspect-ratio="1"
                class="grey lighten-2"
                max-width="500"
                max-height="300"
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
            <v-col cols="12" lg="6">
              <h2>{{item.annual_year}}</h2> <!-- Data Access example -->
              <p>{{item.title}}</p> <!-- Data Access example -->
              <pre>{{ item }}</pre> 
            </v-col>
          </v-row>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-header>
          <h2 class="font-weight-bold">
            <v-icon
              color="green darken-3"
              class="mdi mdi-email-outline mr-3"
            ></v-icon
            >Research Activities
          </h2>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-row v-for="(item, index) in researchData" :key="index">
            <v-col cols="12" lg="6">
              <v-img
                :src="item.image!==null?$axios.defaults.baseURL+item.image.url:'/image_placeholder.png'"
                lazy-src="/image_placeholder.png"
                aspect-ratio="1"
                class="grey lighten-2"
                max-width="500"
                max-height="300"
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
            <v-col cols="12" lg="6">
              <h2>{{item.annual_year}}</h2> <!-- Data Access example -->
              <p>{{item.title}}</p> <!-- Data Access example -->
              <pre>{{ item }}</pre> 
            </v-col>
          </v-row>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-header>
          <h2 class="font-weight-bold">
            <v-icon
              color="green darken-3"
              class="mdi mdi-email-outline mr-3"
            ></v-icon
            >Patents
          </h2>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-row v-for="(item, index) in patentsData" :key="index">
            <v-col cols="12" lg="6">
              <v-img
                :src="item.image!==null?$axios.defaults.baseURL+item.image.url:'/image_placeholder.png'"
                lazy-src="/image_placeholder.png"
                aspect-ratio="1"
                class="grey lighten-2"
                max-width="500"
                max-height="300"
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
            <v-col cols="12" lg="6">
              <h2>{{item.annual_year}}</h2> <!-- Data Access example -->
              <p>{{item.title}}</p> <!-- Data Access example -->
              <pre>{{ item }}</pre> 
            </v-col>
          </v-row>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script>
export default {
  props: [
    "recognitionsData",
    "presentationsData",
    "participationsData",
    "researchData",
    "patentsData"
  ]
};
</script>
