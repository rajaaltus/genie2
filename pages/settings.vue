<template>
  <div>
    <v-tabs
      background-color="light-green lighten-5"
      color="green darken-3"
      light
      vertical
    >
      <v-tab>
        <span class="mdi mdi-account-plus cust-icon"></span>
        New User
      </v-tab>
      <v-tab>
        <span class="mdi mdi-account-check cust-icon"></span>
        User Approvals
      </v-tab>

      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <v-form ref="form" v-model="valid" lazy-validation>
              <h2>Personal Details</h2>
              <v-row>
                <v-col cols="6">
                  <v-text-field
                    color="green"
                    label="Full Name"
                    :rules="[v => !!v || 'Full Name is Required']"
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    color="green"
                    label="Designation"
                    :rules="[v => !!v || 'Designation is Required']"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    color="green"
                    :rules="[v => !!v || 'Email ID is Required']"
                    label="Email ID"
                    placeholder="Also your Primary Login ID"
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    color="green"
                    :rules="[v => !!v || 'Password is Required']"
                    label="Password"
                    type="password"
                    value="user@2020"
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-switch
                    color="red darken-3"
                    label="Approved"
                    input-value="true"
                    class="pl-2"
                  ></v-switch>
                </v-col>
              </v-row>
              <v-layout align-end justify-end>
                <v-btn color="green darken-1" small dark>
                  <v-icon small class="pr-2">mdi-account-plus</v-icon>
                  Create Account
                </v-btn>
              </v-layout>
            </v-form>
          </v-card-text>
        </v-card>
      </v-tab-item>

      <v-tab-item>
        <v-card flat>
          <v-card-text class="px-0 py-1">
            <v-data-table
              :items="staffs"
              :headers="headers"
              :loading="loading"
              loading-text="Loading... Please wait"
            >
              <template v-slot:item.userType="{ item }">
                <v-chip :color="getColor(item.userType)" dark>{{
                  item.userType
                }}</v-chip>
              </template>
              
              <template v-slot:item.actions="{ item }">
                <v-switch
                color="red darken-3"
                i
                nput-value="true"
                class="pl-2"
              ></v-switch>
              
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-tab-item>

      <v-tab-item>
        <v-card flat>
          <v-card-text class="px-0 py-1"> </v-card-text>
        </v-card>
      </v-tab-item>

    </v-tabs>
  </div>
</template>

<script>
import { mapState } from "vuex";
import wordcloud from "vue-wordcloud";
import PageHeader from "@/components/PageHeader";
import Swal from "sweetalert2";
export default {
  head() {
    return {
      title: "Settings"
    };
  },
  components: {
    PageHeader,
    wordcloud
  },
  data: () => ({
    loading: false,
    headers: [
      { text: "Full Name", value: "fullname" },
      { text: "Email", value: "email" },
      { text: "Role", value: "userType" },
      { text: "Approved", value: "actions" }
    ],
    chartOptions: {
      series: [
        {
          data: [1, 2, 3] // sample data
        }
      ]
    },
    myColors: ["#1f77b4", "#629fc9", "#94bedb", "#c9e0ef"],
    defaultWords: [
      {
        name: "Cat",
        value: 1
      },
      {
        name: "fish",
        value: 2
      },
      {
        name: "things",
        value: 3
      },
      {
        name: "look",
        value: 4
      },
      {
        name: "two",
        value: 5
      },
      {
        name: "fun",
        value: 6
      },
      {
        name: "know",
        value: 7
      },
      {
        name: "good",
        value: 8
      },
      {
        name: "play",
        value: 9
      },
      {
        name: "fish",
        value: 10
      },
      {
        name: "things",
        value: 11
      },
      {
        name: "look",
        value: 12
      },
      {
        name: "two",
        value: 13
      },
      {
        name: "fun",
        value: 14
      },
      {
        name: "know",
        value: 15
      },
      {
        name: "good",
        value: 16
      },
      {
        name: "play",
        value: 17
      }
    ]
  }),

  computed: {
    ...mapState({
      staffs: state => state.staffs
    })
  },
  async fetch({ store }) {
    let queryString = "";
    queryString = `department.id=${store.state.auth.user.department}&userType=FACULTY&blocked_ne=true`;
    store.dispatch("setStaffs", { qs: queryString });
  },
  mounted() {
    this.staffs = this.$store.state.staffs;
  },
  methods: {
    deleteItem(item) {
      let result = this.$store.dispatch("user/deleteUser", { id: item.id });
      if (result) {
        Swal.fire("deleted");
        this.reloadData();
      }
    },
    async reloadData() {
      this.loading = true;
      let queryString = "";
      queryString = `department.id=${this.$store.state.auth.user.department}&userType=FACULTY&blocked_ne=true`;
      await this.$store.dispatch("setStaffs", { qs: queryString });
      this.loading = false;
    },
    getColor(userType) {
      return userType === "FACULTY" ? "green" : "red";
    },
    wordClickHandler(name, value, vm) {
      console.log("wordClickHandler", name, value, vm);
    }
  }
};
</script>

<style scoped>
.my-card {
  border-top: 3px solid #7cb342;
}
.cust-icon {
  font-size: 20px;
  padding-right: 10px;
}
.disp {
  color: #ffffff;
  font-size: 12px;
  font-weight: normal;
}

.disp-icon {
  color: #ffffff;
  font-size: 24px;
  font-weight: normal;
}
</style>
