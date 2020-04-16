<template>
  <div>
    <YearDialog
      :reportYears="reportYears"
      v-if="$store.state.selectedYear == 0"
    />
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
              <v-col cols="12" lg="3">
                <v-select
                  :items="reportYears"
                  item-value="id"
                  item-text="val"
                  label="Reporting Year"
                  color="success"
                ></v-select>
              </v-col>

              <v-col cols="11" lg="3">
                <v-autocomplete
                  v-model="friends"
                  :disabled="isUpdating"
                  :items="people"
                  color="blue-grey lighten-2"
                  label="Faculty / Staff / Student"
                  item-text="name"
                  item-value="name"
                >
                  <template v-slot:selection="data">
                    <v-chip
                      v-bind="data.attrs"
                      :input-value="data.selected"
                      @click="data.select"
                      
                    >
                      <v-avatar left>
                        <v-img :src="data.item.avatar"></v-img>
                      </v-avatar>
                      {{ data.item.name }}
                    </v-chip>
                  </template>
                  <template v-slot:item="data">
                    <template v-if="typeof data.item !== 'object'">
                      <v-list-item-content
                        v-text="data.item"
                      ></v-list-item-content>
                    </template>
                    <template v-else>
                      <v-list-item-avatar>
                        <img :src="data.item.avatar" />
                      </v-list-item-avatar>
                      <v-list-item-content>
                        <v-list-item-title
                          v-html="data.item.name"
                        ></v-list-item-title>
                        <v-list-item-subtitle
                          v-html="data.item.group"
                        ></v-list-item-subtitle>
                      </v-list-item-content>
                    </template>
                  </template>
                </v-autocomplete>
              </v-col>

              <v-col cols="1" lg="1">
                <div class="my-4">
                  <v-btn color="green darken-2" fab x-small dark>
                    <v-icon>mdi-reload</v-icon>
                  </v-btn>
                </div>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12" lg="3" sm="6">
                <v-card tile>
                  <v-card-title>
                    Programmes &amp; Events
                  </v-card-title>
                  <v-card-subtitle>
                    302
                  </v-card-subtitle>
                </v-card>
              </v-col>

              <v-col cols="12" lg="3" sm="6">
                <v-card tile>
                  <v-card-title>
                    Department Visitors
                  </v-card-title>
                  <v-card-subtitle>
                    302
                  </v-card-subtitle>
                </v-card>
              </v-col>

              <v-col cols="12" lg="3" sm="6">
                <v-card tile>
                  <v-card-title>
                    Training Underwent
                  </v-card-title>
                  <v-card-subtitle>
                    302
                  </v-card-subtitle>
                </v-card>
              </v-col>

              <v-col cols="12" lg="3" sm="6">
                <v-card tile>
                  <v-card-title>
                    Presentations/Posters
                  </v-card-title>
                  <v-card-subtitle>
                    302
                  </v-card-subtitle>
                </v-card>
              </v-col>

              <v-col cols="12" lg="3" sm="6">
                <v-card tile>
                  <v-card-title>
                    Participations
                  </v-card-title>
                  <v-card-subtitle>
                    302
                  </v-card-subtitle>
                </v-card>
              </v-col>

              <v-col cols="12" lg="3" sm="6">
                <v-card tile>
                  <v-card-title>
                    Public Engagement
                  </v-card-title>
                  <v-card-subtitle>
                    302
                  </v-card-subtitle>
                </v-card>
              </v-col>

              <v-col cols="12" lg="3" sm="6">
                <v-card tile>
                  <v-card-title>
                    Research Activities
                  </v-card-title>
                  <v-card-subtitle>
                    302
                  </v-card-subtitle>
                </v-card>
              </v-col>

              <v-col cols="12" lg="3" sm="6">
                <v-card tile>
                  <v-card-title>
                    Publications
                  </v-card-title>
                  <v-card-subtitle>
                    302
                  </v-card-subtitle>
                </v-card>
              </v-col>

              <v-col cols="12" lg="3" sm="6">
                <v-card tile>
                  <v-card-title>
                    Recognitions
                  </v-card-title>
                  <v-card-subtitle>
                    302
                  </v-card-subtitle>
                </v-card>
              </v-col>

              <v-col cols="12" lg="3" sm="6">
                <v-card tile>
                  <v-card-title>
                    Patents
                  </v-card-title>
                  <v-card-subtitle>
                    302
                  </v-card-subtitle>
                </v-card>
              </v-col>

              <v-col cols="12" lg="3" sm="6">
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
              <v-col cols="12" lg="4">
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
              <v-col cols="12" lg="8">
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
import YearDialog from "@/components/YearDialog";
export default {
  head() {
    return {
      title: "Dashboard"
    };
  },
  components: {
    PageHeader,
    YearDialog
  },
  data() {
    const srcs = {
        1: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
        2: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
        3: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
        4: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
        5: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
      }
    return {
    reportYears: [
      {
        id: 2017,
        val: "2017-2018"
      },
      {
        id: 2018,
        val: "2018-2019"
      },
      {
        id: 2019,
        val: "2019-2020"
      },
      {
        id: 2020,
        val: "2020-2021"
      }
    ],
    isUpdating: false,
    friends: ['Sandra Adams', 'Britta Holt'],
    people: [
          { header: 'Faculty' },
          { name: 'Sandra Adams', group: 'Faculty', avatar: srcs[1] },
          { name: 'Ali Connors', group: 'Faculty', avatar: srcs[2] },
          { name: 'Trevor Hansen', group: 'Faculty', avatar: srcs[3] },
          { name: 'Tucker Smith', group: 'Faculty', avatar: srcs[2] },
          { divider: true },
          { header: 'Student' },
          { name: 'Britta Holt', group: 'Student', avatar: srcs[4] },
          { name: 'Jane Smith ', group: 'Student', avatar: srcs[5] },
          { name: 'John Smith', group: 'Student', avatar: srcs[1] },
          { name: 'Sandra Williams', group: 'Student', avatar: srcs[3] },
        ],
    }
  },
  async fetch({ store }) {
    let userId = store.state.auth.user.id;
    await store.dispatch("user/setFullUser", { id: userId });
  },
   watch: {
      isUpdating (val) {
        if (val) {
          setTimeout(() => (this.isUpdating = false), 3000)
        }
      },
    },

    methods: {
      remove (item) {
        const index = this.friends.indexOf(item.name)
        if (index >= 0) this.friends.splice(index, 1)
      },
    },
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
