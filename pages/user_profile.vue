<template>
  <div>
    <v-row>
      <v-col cols="12" md="3" lg="3">
        <ProfileCard :profile="userProfile" />
        <!-- <PublicationChart @fetched="reloadChart" :stats="stats" />
        <WordCloud /> -->
      </v-col>

      <v-col cols="12" md="9" lg="9">
        <v-tabs
          background-color="light-green lighten-5"
          color="green darken-3"
          light
        >
          <v-tab>
            <span class="mdi mdi-face cust-icon"></span>
            My Profile
          </v-tab>
          <v-tab>
            <span class="mdi mdi-account-settings cust-icon"></span>
            Settings
          </v-tab>
          <v-layout align-end justify-end class="pr-4 mb-4">
            <v-btn color="red lighten-1" x-small dark>
              <v-icon small class="px-1">mdi-file-pdf</v-icon>
              Download CV
            </v-btn>
          </v-layout>

          <v-tab-item class="pt-1">

            <v-skeleton-loader
                    v-if="loading"
                    height="120"
                    type="list-item-avatar-two-line"
                  >
                  </v-skeleton-loader>
                  <v-alert
                    v-else
                    tile
                    elevation="1"
                    border="left"
                    color="light-green lighten-1"
                    colored-border
                    icon="mdi-bookshelf"
                  >
                    <h2 class="font-weight-bold">Publications</h2>
                    <span class="display-2 font-weight-bold">39
                    </span>

                    <v-tooltip top color="black">
                      <template v-slot:activator="{ on }">
                        <v-btn
                          class="ml-12"
                          tile
                          x-small
                          color="green darken-3"
                          v-on="on"
                          >125</v-btn
                        >
                      </template>
                      <span>Journal Articles</span>
                    </v-tooltip>

                    <v-tooltip top color="black">
                      <template v-slot:activator="{ on }">
                        <v-btn tile x-small color="green darken-2" v-on="on"
                          >117</v-btn
                        >
                      </template>
                      <span
                        >Articles for Professionals in Souvenirs, Newsletters,
                        etc..</span
                      >
                    </v-tooltip>

                    <v-tooltip top color="black">
                      <template v-slot:activator="{ on }">
                        <v-btn tile x-small color="green darken-1" v-on="on"
                          >26</v-btn
                        >
                      </template>
                      <span>Books</span>
                    </v-tooltip>

                    <v-tooltip top color="black">
                      <template v-slot:activator="{ on }">
                        <v-btn tile x-small color="green lighten-1" v-on="on"
                          >85</v-btn
                        >
                      </template>
                      <span>Book Chapters</span>
                    </v-tooltip>

                    <v-tooltip top color="black">
                      <template v-slot:activator="{ on }">
                        <v-btn tile x-small color="green lighten-2" v-on="on"
                          >216</v-btn
                        >
                      </template>
                      <span>Monographs</span>
                    </v-tooltip>

                    <v-tooltip top color="black">
                      <template v-slot:activator="{ on }">
                        <v-btn tile x-small color="green lighten-3" v-on="on"
                          >47</v-btn
                        >
                      </template>
                      <span>Manuals</span>
                    </v-tooltip>

                    <v-tooltip top color="black">
                      <template v-slot:activator="{ on }">
                        <v-btn tile x-small color="green lighten-4" v-on="on"
                          >112</v-btn
                        >
                      </template>
                      <span>Reports</span>
                    </v-tooltip>

                    <v-tooltip top color="black">
                      <template v-slot:activator="{ on }">
                        <v-btn tile x-small color="green lighten-5" v-on="on"
                          >8</v-btn
                        >
                      </template>
                      <span>Articles for General Public / IEC Materials</span>
                    </v-tooltip>
                  </v-alert>

            <v-skeleton-loader
              v-if="loading"
              height="130"
              width="50%"
              class="mb-6"
              type="list-item-avatar-three-line"
            >
            </v-skeleton-loader>
            <Qualification
              v-else
              :qualifications="qualifications"
              @new-qualification="updateQualification"
            />

            <Experience
              :experiences="experiences"
              @new-experience="updateExperience"
            />

            <Expansion
              :recognitionsData="recognitionsData"
              :presentationsData="presentationsData"
              :participationsData="participationsData"
              :researchData="researchData"
              :patentsData="patentsData"
              :publicationsData="publicationsData"
            />
          </v-tab-item>

          <v-tab-item>
            <v-card flat style="border:1px solid #f5f5f5;">
              <v-skeleton-loader
                v-if="loading"
                height="350"
                class="mb-6"
                type="article, article, actions"
              >
              </v-skeleton-loader>
              <v-card-text v-else class="px-3 py-4">
                <SettingsForm
                  :userProfile="userProfile"
                  @profile-update="reloadProfile()"
                />
              </v-card-text>
            </v-card>
            <v-card flat style="border:1px solid #f5f5f5;" class="mt-4">
              <v-card-text class="px-3 py-4">
                <PasswordForm />
              </v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import { mapState } from "vuex";
import PageHeader from "@/components/PageHeader";
import ProfileCard from "@/components/profile/ProfileCard";
import PublicationChart from "@/components/profile/PublicationChart";
import WordCloud from "@/components/profile/WordCloud";
import Qualification from "@/components/profile/Qualification";
import Experience from "@/components/profile/Experience";
import Expansion from "@/components/profile/Expansion";
import SettingsForm from "@/components/profile/SettingsForm";
import PasswordForm from "@/components/profile/PasswordForm";
export default {
  head() {
    return {
      title: "User Profile"
    };
  },
  components: {
    PageHeader,
    ProfileCard,
    PublicationChart,
    WordCloud,
    Qualification,
    Experience,
    Expansion,
    SettingsForm,
    PasswordForm
  },
  data: () => ({
    loading: false,
    basicProfile: {
      name: "",
      email: "",
      user: 0,
      active_status: true
    },
  }),
  computed: {
    ...mapState({
      userProfile: state => state.user.userProfile,
      qualifications: state => state.profile.educationData.result,
      experiences: state => state.profile.experienceData.result,
      recognitionsData: state => state.recognition.recognitionsData.result,
      presentationsData: state => state.presentation.presentationsData.result,
      participationsData: state => state.participation.participationsData.result,
      publicationsData: state => state.publication.publicationsData.result,
      researchData: state => state.research.researchData.result,
      patentsData: state => state.patent.patentsData.result,
      stats: state => state.publication.stats
    })
  },
  async fetch({ store }) {
    let id = store.state.auth.user.id;
    await store.dispatch("user/setUserProfile", {
      id: store.state.auth.user.id
    });
    await store.dispatch("profile/setEducationData", { id: id });
    await store.dispatch("profile/setExperienceData", { id: id });
    let queryString = "";
    queryString = `department.id=${store.state.auth.user.department}&user.id=${id}&deleted_ne=true`;
    await store.dispatch("recognition/setRecognitionsData", {
      qs: queryString
    });
    await store.dispatch("presentation/setPresentationsData", {
      qs: queryString
    });
    await store.dispatch("participation/setParticipationsData", {
      qs: queryString
    });
    await store.dispatch("research/setResearchData", { qs: queryString });
    await store.dispatch("patent/setPatentsData", { qs: queryString });
    await store.dispatch("publication/setPublicationsData", { qs: queryString });
  },
  mounted() {
    console.log(this.userProfile);
    if (this.userProfile === undefined) {
      Swal.fire({
        title: "Alert",
        text:
          "Your profile seems empty! Please wait... we create your basic profile first.",
        icon: "info",
        showConfirmButton: false,
        timer: 1500
      });
      this.$nuxt.$loading.start();
      this.basicProfile = Object.assign(
        {},
        {
          name: this.$auth.user.fullname,
          personal_email: this.$auth.user.email,
          employee_id: this.$auth.user.username,
          active_status: true,
          user: this.$auth.user.id,
          image: null
        }
      );
      var payload = this.basicProfile;
      this.$store
        .dispatch("user/addProfile", payload)
        .then(resp => {
          console.log(resp);
        })
        .catch(e => {})
        .finally(() => {
          this.$nuxt.$loading.finish();
        });
    }
  },
  methods: {
    async updateQualification() {
      this.loading = true;
      let id = this.$store.state.auth.user.id;
      await this.$store
        .dispatch("profile/setEducationData", { id: id })
        .then(resp => {
          console.log(resp);
        })
        .catch(e => {})
        .finally(() => {
          this.loading = false;
        });
    },
    async updateExperience() {
      let id = this.$store.state.auth.user.id;
      await this.$store.dispatch("profile/setExperienceData", { id: id });
    },
    async reloadProfile() {
      this.loading = true;
      console.log("Receiving...");
      await this.$store
        .dispatch("user/setUserProfile", { id: this.$store.state.auth.user.id })
        .then(resp => {
          console.log(resp.message);
        })
        .catch(e => {})
        .finally(() => {
          this.loading = false;
        });
    },
    async reloadChart() {
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
