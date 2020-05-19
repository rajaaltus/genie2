<template>
  <v-app>
    <v-system-bar height="120" color="grey lighten-4">
      <v-container>
        <!-- <h1>#{{$route.params.id}}. User Profile: </h1> -->
        <v-row>
          <v-col cols="12" md="auto" lg="auto">
            <v-img src="/logo-left.png"></v-img>
          </v-col>
          <v-spacer></v-spacer>
          <v-col cols="12" md="auto" lg="auto">
            <v-img src="/nimhans-gov-logo.png" class="mt-5"></v-img>
          </v-col>
        </v-row>
      </v-container>
    </v-system-bar>

    <v-system-bar height="40" color="#f4bd2d">
      <v-container>
        <v-row>
          <v-col cols="6" md="3" lg="3">
            <v-icon small class="pr-1" color="black">mdi-lightbulb-on</v-icon>
            <span class="font-weight-normal black--text text-uppercase"
              >Profile ID: {{ userProfile.employee_id }}</span
            >
          </v-col>
          <v-col cols="6" md="4" lg="4">
            <v-icon small class="pr-1" color="black">mdi-account-edit</v-icon>
            <span class="font-weight-normal black--text text-uppercase"
              >Edit Profile</span
            >
          </v-col>
        </v-row>
      </v-container>
    </v-system-bar>

    <v-container>
      <v-row>
        <v-col cols="12" md="3" lg="3">
          <v-card tile elevation="1">
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title class="headline font-weight-medium">{{
                  userProfile.name
                }}</v-list-item-title>
                <v-list-item-subtitle>{{
                  userProfile.designation
                }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <div>
              <v-hover>
                <template v-if="userProfile.gender === 'Male'">
                  <v-img src="/boy.png" max-width="100%"> </v-img>
                </template>
                <template v-else>
                  <v-img src="/girl.png" max-width="100%"> </v-img>
                </template>
              </v-hover>
            </div>

            <v-card-text>
              <v-icon small class="mdi mdi-email-outline mr-3"></v-icon>
              <span class="body-2 black-text">
                {{ userProfile.personal_email }}</span
              ><br />
              <v-icon small class="mdi mdi-phone mr-3"></v-icon>
              <span class="body-2 text--black">
                {{ userProfile.contact_no }}
              </span>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" md="7" lg="7" class="pro-content">
          <!-- <pre>{{ userProfile }}</pre> -->
          <v-alert
            tile
            elevation="0"
            border="left"
            color="light-green lighten-1"
            colored-border
            icon="mdi-bookshelf"
          >
            <h2 class="font-weight-bold">Publications</h2>
            <span class="display-2 font-weight-bold"
              >{{ publicationsData.length }}
            </span>

            <v-tooltip top color="black">
              <template v-slot:activator="{ on }">
                <v-btn
                  tile
                  x-small
                  color="green darken-3"
                  v-on="on"
                  class="mb-4"
                  >{{ journalArticles }}</v-btn
                >
              </template>
              <span>Journal Articles</span>
            </v-tooltip>
            <v-tooltip top color="black">
              <template v-slot:activator="{ on }">
                <v-btn
                  tile
                  x-small
                  color="green darken-2"
                  v-on="on"
                  class="mb-4"
                  >{{ articles }}</v-btn
                >
              </template>
              <span
                >Articles for Professionals in Souvenirs, Newsletters,
                etc..</span
              >
            </v-tooltip>

            <v-tooltip top color="black">
              <template v-slot:activator="{ on }">
                <v-btn
                  tile
                  x-small
                  color="green darken-1"
                  v-on="on"
                  class="mb-4"
                  >{{ books }}</v-btn
                >
              </template>
              <span>Books</span>
            </v-tooltip>

            <v-tooltip top color="black">
              <template v-slot:activator="{ on }">
                <v-btn
                  tile
                  x-small
                  color="green lighten-1"
                  v-on="on"
                  class="mb-4"
                  >{{ bookChapters }}</v-btn
                >
              </template>
              <span>Book Chapters</span>
            </v-tooltip>

            <v-tooltip top color="black">
              <template v-slot:activator="{ on }">
                <v-btn
                  tile
                  x-small
                  color="green lighten-2"
                  v-on="on"
                  class="mb-4"
                  >{{ monoGraphs }}</v-btn
                >
              </template>
              <span>Monographs</span>
            </v-tooltip>

            <v-tooltip top color="black">
              <template v-slot:activator="{ on }">
                <v-btn
                  tile
                  x-small
                  color="green lighten-3"
                  v-on="on"
                  class="mb-4"
                  >{{ manuals }}</v-btn
                >
              </template>
              <span>Manuals</span>
            </v-tooltip>

            <v-tooltip top color="black">
              <template v-slot:activator="{ on }">
                <v-btn
                  tile
                  x-small
                  color="green lighten-4"
                  v-on="on"
                  class="mb-4"
                  >{{ reports }}</v-btn
                >
              </template>
              <span>Reports</span>
            </v-tooltip>

            <v-tooltip top color="black">
              <template v-slot:activator="{ on }">
                <v-btn
                  tile
                  x-small
                  color="green lighten-5"
                  v-on="on"
                  class="mb-4"
                  >{{ general }}</v-btn
                >
              </template>
              <span>Articles for General Public / IEC Materials</span>
            </v-tooltip>
          </v-alert>

          <v-alert
            tile
            elevation="0"
            border="left"
            color="blue lighten-1"
            colored-border
            icon="mdi-hospital-building"
          >
            <h2 class="font-weight-bold mb-4">Qualifications</h2>

            <v-card
              flat
              class="mb-3"
              v-for="(item, index) in qualifications"
              :key="index"
            >
              <v-chip label small color="light-blue darken-1 mb-2" dark>
                <span class="font-weight-normal">{{ item.qualification }}</span>
              </v-chip>
              <v-chip label small color="light-blue lighten-4 mb-2">{{
                item.institute
              }}</v-chip>
              <v-chip label small color="light-blue lighten-5 mb-2">
                From {{ $moment(item.duration_from).format("YYYY") }} - to
                {{ $moment(item.duration_to).format("YYYY") }}
              </v-chip>
            </v-card>
          </v-alert>

          <v-alert
            tile
            elevation="1"
            border="left"
            color="amber lighten-1"
            colored-border
            icon="mdi-briefcase"
          >
            <h2 class="font-weight-bold">Experiance</h2>

            <v-timeline dense>
              <v-timeline-item
                small
                color="yellow"
                v-for="(item, index) in experiences"
                :key="index"
              >
                <div class="py-4">
                  <v-chip label small color="amber lighten-2 mb-2">
                    <span class="body-1 font-weight-bold"
                      >{{ $moment(item.duration_from).format("YYYY") }} -
                      {{ $moment(item.duration_to).format("YYYY") }}</span
                    >
                  </v-chip>
                  <h2>{{ item.designation }}</h2>
                  <div>{{ item.organization }}, {{ item.place }}.</div>
                </div>
              </v-timeline-item>
            </v-timeline>
          </v-alert>

          <v-expansion-panels accordion multiple>
            <v-expansion-panel>
              <v-expansion-panel-header>
                <h2 class="font-weight-bold">
                  <v-icon
                    color="red darken-3"
                    class="mdi mdi-bookshelf mr-3"
                  ></v-icon
                  >Publications
                </h2>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-row v-for="(item, index) in publicationsData" :key="index">
                  <v-col cols="12" lg="12">
                    <v-card flat class="my-card">
                      <v-btn
                        label
                        class="mb-2"
                        x-small
                        color="green darken-2"
                        dark
                      >
                        {{ item.publication_type }}
                      </v-btn>
                      <v-btn
                        v-if="item.classification !== 'Not_Applicable'"
                        label
                        class="mb-2"
                        x-small
                        color="green lighten-4"
                      >
                        {{ item.classification }} </v-btn
                      ><br />
                      <template
                        v-if="item.publication_type == 'Journal_Article'"
                      >
                        <span class="body-2 font-weight-bold">{{
                          item.article_title
                        }}</span
                        ><br />
                        <span class="body-2 font-weight-light"
                          >{{ item.authors }}.</span
                        ><br />
                        <span class="body-2 font-weight-light">{{
                          item.journal_title
                        }}</span>
                        <span
                          v-if="item.pub_date !== 'null'"
                          class="body-2 font-weight-light"
                          >{{ item.pub_date }};</span
                        >
                        <span
                          v-if="item.volume_no !== 'null'"
                          class="body-2 font-weight-light"
                          >{{ item.volume_no }}:</span
                        >
                        <span
                          v-if="item.pages !== 'null'"
                          class="body-2 font-weight-light"
                          >{{ item.pages }}.</span
                        ><br />
                        <v-btn
                          v-if="item.pmid !== 'null'"
                          label
                          class="mt-2"
                          x-small
                          color="grey lighten-4"
                        >
                          PubMed ID: {{ item.pmid }}
                        </v-btn>
                      </template>
                      <template
                        v-else-if="
                          item.publication_type == 'Articles_for_Professionals'
                        "
                      >
                        <span class="body-2 font-weight-bold">{{
                          item.article_title
                        }}</span
                        ><br />
                        <span class="body-2 font-weight-light"
                          >{{ item.authors }}.</span
                        ><br />
                        <span class="body-2 font-weight-light">{{
                          item.journal_title
                        }}</span>
                        <span
                          v-if="item.pub_date !== 'null'"
                          class="body-2 font-weight-light"
                          >{{ item.pub_date }};</span
                        >
                        <span
                          v-if="item.volume_no !== 'null'"
                          class="body-2 font-weight-light"
                          >{{ item.volume_no }}:</span
                        >
                        <span
                          v-if="item.pages !== 'null'"
                          class="body-2 font-weight-light"
                          >{{ item.pages }}.</span
                        >
                      </template>
                      <template v-else-if="item.publication_type == 'Book'">
                        <span class="body-2 font-weight-bold">{{
                          item.book_title
                        }}</span
                        ><br />
                        <span class="body-2 font-weight-light"
                          >{{ item.authors }}.</span
                        ><br />
                        <span
                          v-if="item.edition !== 'null'"
                          class="body-2 font-weight-light"
                          >{{ item.edition }}.</span
                        >
                        <span
                          v-if="item.place !== 'null'"
                          class="body-2 font-weight-light"
                          >{{ item.place }};</span
                        >
                        <span
                          v-if="item.publisher !== 'null'"
                          class="body-2 font-weight-light"
                          >{{ item.publisher }}:</span
                        >
                        <span
                          v-if="item.year !== 'null'"
                          class="body-2 font-weight-light"
                          >{{ item.year }}.</span
                        >
                      </template>
                      <template
                        v-else-if="item.publication_type == 'Book_Chapter'"
                      >
                        <span class="body-2 font-weight-bold">{{
                          item.chapter_title
                        }}</span
                        ><br />
                        <span class="body-2 font-weight-light"
                          >{{ item.authors }}; Editors:
                          {{ item.editor_names }}.</span
                        ><br />
                        <span
                          v-if="item.edition !== 'null'"
                          class="body-2 font-weight-light"
                          >{{ item.edition }}.</span
                        >
                        <span
                          v-if="item.place !== 'null'"
                          class="body-2 font-weight-light"
                          >{{ item.place }};</span
                        >
                        <span
                          v-if="item.publisher !== 'null'"
                          class="body-2 font-weight-light"
                          >{{ item.publisher }}:</span
                        >
                        <span
                          v-if="item.year !== 'null'"
                          class="body-2 font-weight-light"
                          >{{ item.year }}.</span
                        >
                      </template>
                      <template v-else>
                        <span class="body-2 font-weight-bold">{{
                          item.article_title
                        }}</span
                        ><br />
                        <span class="body-2 font-weight-light">{{
                          item.authors
                        }}</span
                        ><br />
                        <span
                          v-if="item.edition !== 'null'"
                          class="body-2 font-weight-light"
                          >{{ item.edition }}.</span
                        >
                        <span
                          v-if="item.place !== 'null'"
                          class="body-2 font-weight-light"
                          >{{ item.place }};</span
                        >
                        <span
                          v-if="item.publisher !== 'null'"
                          class="body-2 font-weight-light"
                          >{{ item.publisher }}:</span
                        >
                        <span
                          v-if="item.year !== 'null'"
                          class="body-2 font-weight-light"
                          >{{ item.year }}.</span
                        >
                      </template>
                    </v-card>
                  </v-col>
                </v-row>
              </v-expansion-panel-content>
            </v-expansion-panel>

            <v-expansion-panel>
              <v-expansion-panel-header>
                <h2 class="font-weight-bold">
                  <v-icon
                    color="cyan darken-3"
                    class="mdi mdi-crown mr-3"
                  ></v-icon
                  >Awards &amp; Honors
                </h2>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-row v-for="(item, index) in recognitionsData" :key="index">
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
                            class="grey lighten-2 expandimg"
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
                          <v-btn
                            label
                            class="mb-2"
                            x-small
                            color="green darken-2"
                            dark
                          >
                            Date Awarded: {{ item.date }} </v-btn
                          ><br />
                          <span class="body-2 font-weight-normal">
                            {{ item.award_title }} from {{ item.organization }},
                            {{ item.place }}. </span
                          ><br />
                          <v-btn
                            v-if="item.faculty_name !== 'null'"
                            label
                            class="mt-2"
                            x-small
                            color="grey lighten-4"
                            >Awardee(s): {{ item.faculty_name }}</v-btn
                          >
                        </v-col>
                      </v-row>
                    </v-card>
                  </v-col>
                </v-row>
              </v-expansion-panel-content>
            </v-expansion-panel>

            <v-expansion-panel>
              <v-expansion-panel-header>
                <h2 class="font-weight-bold">
                  <v-icon
                    color="amber darken-3"
                    class="mdi mdi-billboard mr-3"
                  ></v-icon
                  >Presentations / Posters
                </h2>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-row v-for="(item, index) in presentationsData" :key="index">
                  <v-col cols="12" md="12" lg="12">
                    <v-card flat class="my-card">
                      <v-row>
                        <v-col cols="3" md="3" lg="3">
                          <v-img
                            :src="
                              item.image !== null && item.image !== undefined
                                ? $axios.defaults.baseURL + item.image.url
                                : '/presentation_ph.jpg'
                            "
                            lazy-src="/presentation_ph.jpg"
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
                          <v-btn
                            label
                            class="mb-2"
                            x-small
                            color="green darken-2"
                            dark
                          >
                            {{ item.type }}
                          </v-btn>
                          <v-btn
                            label
                            class="mb-2"
                            x-small
                            color="green lighten-4"
                          >
                            {{ item.forum }} </v-btn
                          ><br />
                          <span class="body-2 font-weight-normal">
                            {{ item.title }}</span
                          ><br />
                          <span
                            v-if="item.faculty_name !== 'null'"
                            class="body-2 font-weight-normal"
                          >
                            {{ item.faculty_name }}.</span
                          ><br />
                          <span
                            v-if="item.coauthors !== ''"
                            class="body-2 font-weight-normal"
                          >
                            Co-Authors: {{ item.coauthors }}</span
                          >
                        </v-col>
                      </v-row>
                    </v-card>
                  </v-col>
                </v-row>
              </v-expansion-panel-content>
            </v-expansion-panel>

            <v-expansion-panel>
              <v-expansion-panel-header>
                <h2 class="font-weight-bold">
                  <v-icon
                    color="light-green darken-3"
                    class="mdi mdi-atom mr-3"
                  ></v-icon
                  >Participations
                </h2>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-row v-for="(item, index) in participationsData" :key="index">
                  <v-col cols="12" md="12" lg="12">
                    <v-card flat class="my-card">
                      <v-row>
                        <v-col cols="3" md="3" lg="3">
                          <v-img
                            :src="
                              item.image !== null && item.image !== undefined
                                ? $axios.defaults.baseURL + item.image.url
                                : '/participation_ph.jpg'
                            "
                            lazy-src="/participation_ph.jpg"
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
                          <v-btn
                            label
                            class="mb-2"
                            x-small
                            color="green lighten-3"
                          >
                            {{ item.forum }}
                          </v-btn>
                          <v-btn
                            label
                            class="mb-2"
                            x-small
                            color="green lighten-4"
                          >
                            From {{ item.from_date }} to
                            {{ item.to_date }} </v-btn
                          ><br />
                          <span class="body-2 font-weight-normal">
                            {{ item.program_name }}</span
                          ><br />
                          <span
                            v-if="item.faculty_name !== 'null'"
                            class="body-2 font-weight-normal"
                          >
                            {{ item.faculty_name }}.</span
                          ><br />
                          <v-btn
                            label
                            class="mt-2"
                            x-small
                            v-if="item.place !== ''"
                            >Place: {{ item.place }}</v-btn
                          >
                        </v-col>
                      </v-row>
                    </v-card>
                  </v-col>
                </v-row>
              </v-expansion-panel-content>
            </v-expansion-panel>

            <v-expansion-panel>
              <v-expansion-panel-header>
                <h2 class="font-weight-bold">
                  <v-icon
                    color="pink darken-3"
                    class="mdi mdi-book-lock mr-3"
                  ></v-icon
                  >Patents
                </h2>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-row v-for="(item, index) in patentsData" :key="index">
                  <v-col cols="12" md="12" lg="12">
                    <v-card flat class="my-card">
                      <v-row>
                        <v-col cols="12" md="12" lg="12">
                          <v-btn
                            label
                            class="mb-2"
                            x-small
                            color="green lighten-3"
                          >
                            {{ item.registration_no }} </v-btn
                          ><br />
                          <span class="body-2 font-weight-normal">
                            {{ item.title }}</span
                          ><br />
                          <span class="body-2 font-weight-normal">
                            {{ item.brief_report }}</span
                          >
                        </v-col>
                      </v-row>
                    </v-card>
                  </v-col>
                </v-row>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-col>

        <v-col cols="12" md="2" lg="2">
          <v-icon>mdi-account-multiple</v-icon>
          <span class="body-2 font-weight-normal"> Same Department</span>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import { mapState } from "vuex";
export default {
  layout: "profile",
  auth: false,
  data() {
    return {};
  },
  computed: {
    userProfile() {
      return this.$store.state.user.userProfile;
    },
    ...mapState({
      userProfile: (state) => state.user.userProfile,
      qualifications: (state) => state.profile.educationData.result,
      experiences: (state) => state.profile.experienceData.result,
      recognitionsData: (state) => state.recognition.recognitionsData.result,
      presentationsData: (state) => state.presentation.presentationsData.result,
      participationsData: (state) =>
        state.participation.participationsData.result,
      publicationsData: (state) => state.publication.publicationsData.result,
      researchData: (state) => state.research.researchData.result,
      patentsData: (state) => state.patent.patentsData.result,
      stats: (state) => state.publication.stats,
      journalArticles() {
        var result = this.$store.state.publication.publicationsData.result.filter(
          (publication) => publication.publication_type === "Journal_Article"
        ).length;
        return result;
      },
      articles() {
        var result = this.$store.state.publication.publicationsData.result.filter(
          (publication) =>
            publication.publication_type === "Articles_for_Professionals"
        ).length;
        return result;
      },
      books() {
        var result = this.$store.state.publication.publicationsData.result.filter(
          (publication) => publication.publication_type === "Book"
        ).length;
        return result;
      },
      bookChapters() {
        var result = this.$store.state.publication.publicationsData.result.filter(
          (publication) => publication.publication_type === "Book_Chapter"
        ).length;
        return result;
      },
      monoGraphs() {
        var result = this.$store.state.publication.publicationsData.result.filter(
          (publication) => publication.publication_type === "Monograph"
        ).length;
        return result;
      },
      manuals() {
        var result = this.$store.state.publication.publicationsData.result.filter(
          (publication) => publication.publication_type === "Manual"
        ).length;
        return result;
      },
      reports() {
        var result = this.$store.state.publication.publicationsData.result.filter(
          (publication) => publication.publication_type === "Report"
        ).length;
        return result;
      },
      general() {
        var result = this.$store.state.publication.publicationsData.result.filter(
          (publication) =>
            publication.publication_type === "Article_for_General_public"
        ).length;
        return result;
      },
      people() {
        return this.$store.state.user.activeUsersList.result;
      },
      reportYears() {
        return this.$store.state.reportYears;
      },
    }),
  },
  async fetch({ store, params }) {
    let id = params.id;
    await store.dispatch("user/setUserProfile", {
      id: id,
    });
    await store.dispatch("profile/setEducationData", { id: id });
    await store.dispatch("profile/setExperienceData", { id: id });
    let queryString = "";
    queryString = `department.id=${store.state.auth.user.department}&user.id=${id}&deleted_ne=true`;
    await store.dispatch("recognition/setRecognitionsData", {
      qs: queryString,
    });
    await store.dispatch("presentation/setPresentationsData", {
      qs: queryString,
    });
    await store.dispatch("participation/setParticipationsData", {
      qs: queryString,
    });
    await store.dispatch("research/setResearchData", { qs: queryString });
    await store.dispatch("patent/setPatentsData", { qs: queryString });
    await store.dispatch("publication/setPublicationsData", {
      qs: queryString,
    });
  },
};
</script>

<style scoped>
.pro-content {
  margin: 10px 0 0 0;
  /* padding: 0px; */
  background-color: #f9f9f9;
}
</style>
