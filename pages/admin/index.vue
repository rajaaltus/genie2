<template>
  <div>
    <v-tabs flat background-color="#323232" color="#6ac447" dark>
      <v-tab>
        <span class="mdi mdi-view-dashboard cust-icon"></span>
        Dashboard
      </v-tab>
      <v-tab>
        <span class="mdi mdi-file-word cust-icon"></span>
        Consolidated Report
      </v-tab>

      <v-tab-item>
        <v-card flat>
          <v-card-text class="px-0 py-1">
            <v-row>
              <v-col cols="3" md="3">
                <v-select
                  item-value="id"
                  item-text="year"
                  label="Reporting Year"
                  color="success"
                ></v-select>
              </v-col>

              <v-col cols="3" md="3">
                <v-select
                  item-value="id"
                  item-text="fullname"
                  label="Faculty / Staff / Student"
                  color="success"
                ></v-select>
              </v-col>

              <v-col cols="1" md="1">
                <div class="my-4">
                  <v-btn color="green darken-2" fab x-small dark>
                    <v-icon>mdi-reload</v-icon>
                  </v-btn>
                </div>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="3">
                <v-card tile>
                  <v-card-title>
                    Programmes &amp; Events
                  </v-card-title>
                  <v-card-subtitle>
                    302
                  </v-card-subtitle>
                </v-card>
              </v-col>

              <v-col cols="3">
                <v-card tile>
                  <v-card-title>
                    Department Visitors
                  </v-card-title>
                  <v-card-subtitle>
                    302
                  </v-card-subtitle>
                </v-card>
              </v-col>

              <v-col cols="3">
                <v-card tile>
                  <v-card-title>
                    Training Underwent
                  </v-card-title>
                  <v-card-subtitle>
                    302
                  </v-card-subtitle>
                </v-card>
              </v-col>

              <v-col cols="3">
                <v-card tile>
                  <v-card-title>
                    Presentations/Posters
                  </v-card-title>
                  <v-card-subtitle>
                    302
                  </v-card-subtitle>
                </v-card>
              </v-col>

              <v-col cols="3">
                <v-card tile>
                  <v-card-title>
                    Participations
                  </v-card-title>
                  <v-card-subtitle>
                    302
                  </v-card-subtitle>
                </v-card>
              </v-col>

              <v-col cols="3">
                <v-card tile>
                  <v-card-title>
                    Public Engagement
                  </v-card-title>
                  <v-card-subtitle>
                    302
                  </v-card-subtitle>
                </v-card>
              </v-col>

              <v-col cols="3">
                <v-card tile>
                  <v-card-title>
                    Research Activities
                  </v-card-title>
                  <v-card-subtitle>
                    302
                  </v-card-subtitle>
                </v-card>
              </v-col>

              <v-col cols="3">
                <v-card tile>
                  <v-card-title>
                    Publications
                  </v-card-title>
                  <v-card-subtitle>
                    302
                  </v-card-subtitle>
                </v-card>
              </v-col>

              <v-col cols="3">
                <v-card tile>
                  <v-card-title>
                    Recognitions
                  </v-card-title>
                  <v-card-subtitle>
                    302
                  </v-card-subtitle>
                </v-card>
              </v-col>

              <v-col cols="3">
                <v-card tile>
                  <v-card-title>
                    Patents
                  </v-card-title>
                  <v-card-subtitle>
                    302
                  </v-card-subtitle>
                </v-card>
              </v-col>

              <v-col cols="3">
                <v-card tile>
                  <v-card-title>
                    Key Assignments
                  </v-card-title>
                  <v-card-subtitle>
                    302
                  </v-card-subtitle>
                </v-card>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="4">
                <v-card class="mx-auto">
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title class="headline"
                        >Publications</v-list-item-title
                      >
                    </v-list-item-content>
                  </v-list-item>

                  <v-img
                    src="https://cdn.vuetifyjs.com/images/cards/mountain.jpg"
                    height="194"
                  ></v-img>
                </v-card>
              </v-col>
              <v-col cols="8">
                <v-card class="mx-auto">
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title class="headline"
                        >Research Activities</v-list-item-title
                      >
                    </v-list-item-content>
                  </v-list-item>

                  <v-img
                    src="https://cdn.vuetifyjs.com/images/cards/mountain.jpg"
                    height="194"
                  ></v-img>
                </v-card>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-tab-item>

      <v-tab-item>
        <v-card tile>
          <v-card-text class="px-0 py-1">
            <v-row class="px-5">
              <v-col cols="3" md="3">
                <v-select
                  item-value="id"
                  item-text="year"
                  label="Reporting Year"
                  color="success"
                ></v-select>
              </v-col>

              <v-col cols="3" md="3">
                <v-select
                  item-value="id"
                  item-text="fullname"
                  label="Faculty / Staff / Student"
                  color="success"
                ></v-select>
              </v-col>

              <v-col cols="1" md="1">
                <div class="my-4">
                  <v-btn color="green darken-2" fab x-small dark>
                    <v-icon>mdi-reload</v-icon>
                  </v-btn>
                </div>
              </v-col>
            </v-row>

            <v-expansion-panels flat multiple>
              <v-expansion-panel v-for="(item, i) in 5" :key="i">
                <v-expansion-panel-header>Item</v-expansion-panel-header>
                <v-expansion-panel-content>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs>
  </div>
</template>

<script>
import PageHeader from "@/components/PageHeader";
export default {
  head() {
    return {
      title: "Dashboard"
    };
  },
  components: {
    PageHeader
  },
  async fetch({ store }) {
    let userId = store.state.auth.user.id;
    await store.dispatch("user/setFullUser", { id: userId });
  }
};
</script>

<style scoped>
.cust-icon {
  font-size: 20px;
  color: #ff7e00;
  padding-right: 10px;
}
.disp {
  color: #ffffff;
  font-size: 15px;
  font-weight: normal;
}

.disp-icon {
  color: #ffffff;
  font-size: 24px;
  font-weight: normal;
}
</style>
