<template>
  <div>
    <v-row no-gutters v-if="$auth.user.userType==='DEPARTMENT'">
      <v-col cols="11" lg="11">
        <v-select
          v-model="publication.user"
          :items="dataFrom"
          item-value="id"
          item-text="fullname"
          outlined
          label="Data collected From?"
          :placeholder="section"
          color="success"
          :rules="[v => !!v || 'Item is required']"
        ></v-select>
      </v-col>
      <v-col cols="1" lg="1" sm="1">
        <AddUser @new-user="getLatestUsers()" @new-student="getLatestStudents()" />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="12">
        <v-row>
          <v-col cols="12">
            <v-select
              v-model="publication_type"
              :items="publicationTypes"
              :rules="[v => !!v || 'Item is required']"
              label="Select Publication Type *"
              item-text="text"
              item-value="id"
              @change="reset()"
            ></v-select>
          </v-col>
        </v-row>
        <v-form ref="form" v-model="valid" lazy-validation @submit.prevent>
          <v-row>
            <v-col v-if="publication_type <= 4" cols="8">
              <v-select
                v-model="publication.classification"
                :items="classifications"
                item-text="name"
                item-value="value"
                :rules="[v => !!v || 'Item is required']"
                label="Classification *"
                required
              >
              </v-select>
            </v-col>
            <v-col v-if="publication_type == 1" cols="4">
              <v-row justify="space-around">
                <v-text-field
                  v-model="publication.pmid"
                  :rules="[v => !!v || 'Item is required']"
                  label="Enter PMID to auto-fetch data / Publication ID"
                  required
                  @blur="fetchArticle"
                >
                </v-text-field>
                <v-dialog
                  v-model="loaderdialog"
                  hide-overlay
                  persistent
                  width="300"
                >
                  <v-card color="green" dark>
                    <v-card-text>
                      Please stand by
                      <v-progress-linear
                        indeterminate
                        color="white"
                        class="mb-0"
                      ></v-progress-linear>
                    </v-card-text>
                  </v-card>
                </v-dialog>
              </v-row>
            </v-col>
            <v-col v-if="publication_type == 1" cols="12">
              <v-combobox
                v-model="authorNames"
                :rules="[v => !!v || 'Item is required']"
                :items="authors"
                chips
                label="Authors *"
                full-width
                hide-details
                hide-selected
                multiple
                single-line
              >
                <template v-slot:no-data>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>
                        No results matching. Press <kbd>enter</kbd> to create a
                        new one. Press <kbd>tab</kbd> Complete the entry.
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </template>
              </v-combobox>
            </v-col>
            <v-col v-if="publication_type >= 2" cols="12">
              <v-text-field
                v-model="publication.authors"
                :rules="[v => !!v || 'Item is required']"
                label="Name of the Author(s) *"
                required
              >
              </v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-if="publication_type == 1"
                v-model="journalArticle.title"
                value="journalArticle.title"
                label="Article Title *"
                :rules="[v => !!v || 'Item is required']"
                text-val="journalArticle.title"
              >
              </v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-if="publication_type == 2"
                v-model="publication.article_title"
                label="Title *"
                :rules="[v => !!v || 'Item is required']"
              >
              </v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-if="publication_type == 3"
                v-model="publication.book_title"
                label="Book Title *"
                :rules="[v => !!v || 'Item is required']"
              >
              </v-text-field>
            </v-col>
            <v-col v-if="publication_type == 4" cols="12">
              <v-text-field
                v-model="publication.chapter_title"
                label="Title of the chapter *"
                :rules="[v => !!v || 'Item is required']"
              >
              </v-text-field>
            </v-col>
            <v-col v-if="publication_type > 4" cols="12">
              <v-text-field
                v-model="publication.article_title"
                label="Title *"
                :rules="[v => !!v || 'Item is required']"
              >
              </v-text-field>
            </v-col>
            <v-col v-if="publication_type == 4" cols="12">
              <v-text-field
                v-model="publication.editor_names"
                label="Name of the Editor *"
                :rules="[v => !!v || 'Item is required']"
              >
              </v-text-field>
            </v-col>
            <v-col v-if="publication_type == 1" cols="12">
              <v-text-field
                v-model="journalArticle.fulljournalname"
                value="journalArticle.fulljournalname"
                label="Title of Journal (With standard Abbrevation) *"
                :rules="[v => !!v || 'Item is required']"
              >
              </v-text-field>
            </v-col>
            <v-col v-if="publication_type == 2" cols="12">
              <v-text-field
                v-model="publication.journal_title"
                label="Title of Journal (With standard Abbrevation) *"
                :rules="[v => !!v || 'Item is required']"
              >
              </v-text-field>
            </v-col>
            <v-col v-if="publication_type == 1" cols="6">
              <v-text-field
                v-model="journalArticle.epubdate"
                label="Publication Date"
                hint="Example: 2011 Jan 26"
                persistent-hint
                @blur="dateValidate(journalArticle.epubdate)"
              >
              </v-text-field>
            </v-col>
            <v-col v-if="publication_type == 2" cols="3">
              <v-text-field
                v-model="publication.pub_date"
                label="Publication Date"
                hint="Example: YYYY-MM-DD"
                persistent-hint
                @blur="dateValidate1(publication.pub_date)"
              >
              </v-text-field>
            </v-col>
            <v-col v-if="publication_type == 1" cols="3">
              <v-text-field
                v-model="journalArticle.volume"
                value="jouralArticle.volume"
                label="Volume / Issue No"
              >
              </v-text-field>
            </v-col>
            <v-col v-if="publication_type == 2" cols="3">
              <v-text-field
                v-model="publication.volume_no"
                label="Volume / Issue No"
              >
              </v-text-field>
            </v-col>
            <v-col v-if="publication_type > 2" cols="3">
              <v-text-field
                v-model="publication.edition"
                label="Edition *"
                :rules="[v => !!v || 'Item is required']"
              >
              </v-text-field>
            </v-col>
            <v-col v-if="publication_type > 2" cols="3">
              <v-text-field v-model="publication.place" label="Place">
              </v-text-field>
            </v-col>
            <v-col v-if="publication_type > 2" cols="3">
              <v-text-field
                v-model="publication.publisher"
                label="Publisher *"
                :rules="[v => !!v || 'Item is required']"
              >
              </v-text-field>
            </v-col>
            <v-col v-if="publication_type > 2" cols="3">
              <v-text-field
                v-model="publication.year"
                label="Year *"
                :rules="[v => !!v || 'Item is required']"
              >
              </v-text-field>
            </v-col>
            <v-col v-if="publication_type == 1" cols="3">
              <v-text-field
                v-model="journalArticle.pages"
                value="jouralArticle.pages"
                label="Pages"
              >
              </v-text-field>
            </v-col>
            <v-col v-if="publication_type == 2" cols="3">
              <v-text-field v-model="publication.pages" label="Pages">
              </v-text-field>
            </v-col>
            <v-spacer></v-spacer>
            <v-btn class="mx-3 my-5" color="green" @click="composeReference()">
              Compose Reference
            </v-btn>
          </v-row>
          <span style="color:red; font-size:12px;">* Mandatory fields</span>
        </v-form>
        <v-row>
          <v-col cols="12">
            <v-textarea
              v-model="publication.reference"
              label="Reference *"
              :rules="[v => !!v || 'Item is required']"
              placeholder="Example: Andrade C, Prasad Y, Devaraj A, Pinto EF, Shukla L. ECT and Pronounced Impairment in Spatial Cognition: The Fallacy of Drawing Conclusions From a Single Case. J ECT. 2018 Jun;34(2):75–7."
            ></v-textarea>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row>
      <v-spacer></v-spacer>
      <v-btn medium color="#d74f4f" dark @click="reset" class="mr-4">
        Reset
      </v-btn>
      <v-btn medium color="#57a727" dark @click="publicationAdd" class="mr-4">
        Submit
      </v-btn>
    </v-row>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import { mapState } from "vuex";
import AddUser from "@/components/forms/AddUser";
export default {
  props: ["dataFrom", "publicationTypes", "section"],
  components: {
    AddUser
  },
  data: () => ({
    loading: false,
    search: "",
    loader: null,
    loading5: false,
    date: false,
    valid: true,
    authorNames: "",
    publicationTypes: [],
    dataFrom: [],
    publication_type: 0,
    publication: {
      annual_year: 0,
      publication_type: "",
      classification: "",
      pmid: "",
      article_title: "",
      journal_title: "",
      pub_date: "",
      volume_no: "",
      book_title: "",
      edition: "",
      place: "",
      publisher: "",
      year: 0,
      chapter_title: "",
      editor_names: "",
      reference: "",
      approved_by: "",
      approved_date: "",
      deleted: false,
      authors: "",
      approval_status: "Pending",
      department: 0,
      user: 0,
      pages: ""
    },
    journalArticle: {
      title: null,
      fulljournalname: null,
      epubdate: null,
      volume: null,
      pages: null
    },
    editedJournal: {
      title: null,
      fulljournalname: null,
      epubdate: "",
      volume: "",
      pages: ""
    },
    loaderdialog: false,
    classifications: ["International", "National", "NotApplicable", "Others"],
    selectedFile: null,
    image_url: null
  }),
  methods: {
    getLatestUsers() {
      console.log("recieving....");
      let queryString = "";
      queryString = `department.id=${this.$store.state.auth.user.department}&userType=FACULTY&blocked_ne=true`;
      this.$store.dispatch("setStaffs", { qs: queryString });
      this.dataFrom = this.$store.state.staffs;
    },
     getLatestStudents() {
      console.log("recieving...");
      let queryString = "";
      queryString = `department.id=${this.$store.state.auth.user.department}&userType=STUDENT&blocked_ne=true`;
      this.$store.dispatch("setStudents", { qs: queryString });
      this.dataFrom = this.$store.state.students;
    },
    reset() {
      this.$refs.form.reset();
      this.image_url = null;
    },
    dateValidate(date) {
      if (date) {
        this.journalArticle.epubdate = this.$moment(date).format("YYYY MMM DD");
      }
    },
    dateValidate1(date) {
      if (date) {
        this.publication.pub_date = this.$moment(date).format("YYYY-MM-DD");
      }
    },
    getPublicationType(id) {
      return this.publicationTypes[id - 1].publicationType;
    },
    async fetchArticle() {
      var pmid = this.publication.pmid;
      this.loaderdialog = true;
      this.$store
        .dispatch("publication/setJournalArticle", { id: pmid })
        .then(resp => {
          this.journalArticle = Object.assign(
            {},
            this.$store.state.publication.journalArticle
          );
          // this.authors = this.journalArticle.authors;
          console.log(this.journalArticle);
          var authors = [];
          this.journalArticle.authors.forEach(function(item, index) {
            authors.push(item.name);
          });
          this.authors = authors;
          if (this.$store.state.publication.journalArticle.epubdate === "")
            this.journalArticle.epubdate = "";
          if (this.$store.state.publication.journalArticle.volume === "")
            this.journalArticle.volume = "";
          if (this.$store.state.publication.journalArticle.pages === "")
            this.journalArticle.pages = "";
          this.loaderdialog = true;
        })
        .catch(err => {
          this.snackbar = true;
          this.submitMessage = "No data found!";
          this.journalArticle = Object.assign({}, this.editedJournal);
        })
        .finally(() => (this.loaderdialog = false));
    },
    composeReference() {
      console.log("Publication Type:" + this.publication_type);
      if (this.$refs.form.validate()) {
        if (this.publication_type == 1) {
          if (this.authorNames == [])
            Swal.fire("Enter Author Name before composing...");
          else {
            console.log(
              "Journal Article:" + JSON.stringify(this.journalArticle)
            );
            this.publication.reference =
              this.authorNames.join() +
              ". " +
              this.journalArticle.title +
              " " +
              this.journalArticle.fulljournalname +
              " " +
              this.journalArticle.epubdate +
              ";" +
              this.journalArticle.volume +
              ":" +
              this.journalArticle.pages;
          }
        }
        if (this.publication_type == 2) {
          // console.log(this.publication.reference)
          this.publication.reference =
            this.publication.authors +
            ". " +
            this.publication.article_title +
            ". " +
            this.publication.journal_title +
            ". " +
            this.publication.pub_date +
            ":" +
            this.publication.pages;
        }
        if (this.publication_type == 3) {
          this.publication.reference =
            this.publication.authors +
            ". " +
            this.publication.book_title +
            ". " +
            this.publication.edition +
            ". " +
            this.publication.place +
            ":" +
            this.publication.publisher +
            ";" +
            this.publication.year;
        }
        if (this.publication_type == 4)
          this.publication.reference =
            this.publication.authors +
            ". " +
            this.publication.chapter_title +
            ". In: " +
            this.publication.editor_names +
            ". " +
            this.publication.book_title +
            "." +
            this.publication.edition +
            "." +
            this.publication.place +
            ":" +
            this.publication.publisher +
            ";" +
            this.publication.year;
        if (this.publication_type > 4)
          this.publication.reference =
            this.publication.authors +
            ". " +
            this.publication.article_title +
            "." +
            this.publication.edition +
            "." +
            this.publication.place +
            ":" +
            this.publication.publisher +
            ";" +
            this.publication.year;
      }
    },
    async publicationAdd() {
      if (this.$refs.form.validate()) {
        this.publication.annual_year = this.$store.state.selectedYear;
        this.publication.publication_type = this.publicationTypes[
          this.publication_type - 1
        ].value;
        if (this.publication.user == 0)
          this.publication.user = this.$store.state.auth.user.id;
        this.publication.department = this.$store.state.auth.user.department;

        if (this.$store.state.auth.user.userType === "DEPARTMENT") {
          var today = new Date();
          this.publication.approved_date = this.$moment(today).format();
          this.publication.approval_status = "Approved";
          // this.publication.approved_by = this.$store.state.auth.user.fullname;
        }
        if (this.publication_type == 1) {
          this.publication.journal_title = this.journalArticle.fulljournalname;
          this.publication.article_title = this.journalArticle.title;
          this.publication.pages = this.journalArticle.pages;
          this.publication.volume_no = this.journalArticle.volume;
          this.publication.pub_date =
            this.journalArticle.epubdate === ""
              ? null
              : this.$moment(this.journalArticle.epubdate).format("YYYY-MM-DD");
          this.publication.authors = this.authorNames.join();
        }
        if (this.publication.pub_date === "") this.publication.pub_date = null;

        if (this.publication_type > 2) this.publication.pub_date = null;

        if (this.publication_type > 4)
          this.publication.classification = "National";

        var payload = this.publication;
        console.log(payload);
        // var vm = this;
        this.$store
          .dispatch("publication/publicationAdd", payload)
          .then(resp => {
            Swal.fire({
              title: "Success",
              text: "Publication Submitted successfully!",
							icon: "success",
							showConfirmButton: false,
              timer: 1500
            });
            this.reset();
          })
          .catch(err => {
            Swal.fire(err.response);
          });
      }
    },
    async handleFileUpload(event) {
      this.selectedFile = event.target.files[0];
      // console.log(this.selectedFile);
      const data = new FormData();
      data.append("files", this.selectedFile);
      const uploadRes = await this.$axios({
        method: "POST",
        url: "/upload",
        data
      });
      this.image_url = uploadRes.data[0].url;
      this.publication.image = uploadRes.data[0].id;
    }
  }
};
</script>
