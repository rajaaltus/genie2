<template>
  <div>
    <v-row>
      <v-col cols="12" md="3" lg="3">
        <ProfileCard :profile="profile" />
        <PublicationChart />
        <WordCloud />
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
              height="94"
              type="list-item-two-line"
            >
            </v-skeleton-loader>
            <Qualification
              v-else
              :qualifications="qualifications"
              @new-qualification="updateQualification"
            />

            <Experience :experience="experience" @new-experience="updateExperience" />

            <Expansion />
          </v-tab-item>

          <v-tab-item>
            <v-card flat style="border:1px solid #f5f5f5;">
              <v-card-text class="px-3 py-4">
                <SettingsForm />

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
    loading: false
  }),
  computed: {
    ...mapState({
      profile: state => state.user.userProfile,
      qualifications: state => state.profile.educationData.result,
      experience: state => state.profile.experienceData.result,
    })
  },
  async fetch({ store }) {
    let id = store.state.auth.user.id;
    await store.dispatch("user/setUserProfile", { id: id });
    await store.dispatch("profile/setEducationData", { id: id });
    await store.dispatch("profile/setExperienceData", {id: id})
  },
  methods: {
    async updateQualification() {
      this.loading = true;
      let id = this.$store.state.auth.user.id;
      await this.$store.dispatch("profile/setEducationData", { id: id });
      this.loading = false;
    },
    async updateExperience() {
      let id = this.$store.state.auth.user.id;
      await this.$store.dispatch("profile/setExperienceData", { id: id });
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
