<template>
  <div>
    <v-dialog v-model="dialog" persistent max-width="50%">
      <v-card>
        <v-card-title>
          <span class="headline">Edit Experience</span>
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="4">
              <v-text-field
                color="green"
                v-model="editedItem.designation"
                label="Designation *"
                required
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="8">
              <v-text-field
                color="green"
                v-model="editedItem.organization"
                label="Organization *"
                outlined
                :rules="[v => !!v || 'Please Enter organization Name']"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-text-field
                color="green"
                v-model="editedItem.place"
                label="Place *"
                outlined
                :rules="[v => !!v || 'Please Enter Place ']"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" lg="6">
              <v-menu
                ref="menu"
                v-model="editedFrom"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="editedItem.duration_from"
                    :return-value.sync="editedFrom"
                    :rules="[v => !!v || 'Item is required']"
                    readonly
                    outlined
                    label="From Date "
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="editedItem.duration_from"
                  color="green lighten-1"
                  no-title
                  scrollable
                >
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="reset">
                    Cancel
                  </v-btn>
                  <v-btn
                    text
                    color="primary"
                    @click="$refs.menu.save(editedFrom)"
                  >
                    OK
                  </v-btn>
                </v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="12" lg="6">
              <v-menu
                ref="menu1"
                v-model="editedTo"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="editedItem.duration_to"
                    :rules="[v => !!v || 'Item is required']"
                    :return-value.sync="editedTo"
                    readonly
                    outlined
                    label="To Date "
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="editedItem.duration_to"
                  no-title
                  scrollable
                >
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="editeTo = false">
                    Cancel
                  </v-btn>
                  <v-btn
                    text
                    color="primary"
                    @click="$refs.menu1.save(editedTo)"
                  >
                    OK
                  </v-btn>
                </v-date-picker>
              </v-menu>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-textarea
                v-model="editedItem.brief_summary"
                label="Brief Summary "
              ></v-textarea>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions class="pr-5">
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" small dark @click="dialog = false"
            >Close</v-btn
          >
          <v-btn color="green darken-1" small dark @click="save"
            ><v-icon small class="pr-2">mdi-check</v-icon>Edit
          </v-btn>
        </v-card-actions>

        <!-- <pre>{{ editedItem }}</pre> -->
      </v-card>
    </v-dialog>

    <v-alert
      tile
      elevation="1"
      border="left"
      color="amber lighten-1"
      colored-border
      icon="mdi-briefcase"
    >
      <h2 class="font-weight-bold">Experiance</h2>

      <v-form ref="form" v-model="valid" lazy-validation v-if="form">
        <v-row>
          <v-col cols="12" lg="6">
            <v-text-field
              v-model="experience.deignation"
              :rules="[v => !!v || 'Please type Designation']"
              label="Designation *"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" lg="6">
            <v-text-field
              v-model="experience.organization"
              :rules="[v => !!v || 'Please type Organization']"
              label="Organization *"
              required
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model="experience.place"
              :rules="[v => !!v || 'Please type Place']"
              label="Place *"
              required
            ></v-text-field>
            </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" lg="6">
            <v-menu
              ref="menu"
              v-model="from"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="experience.duration_from"
                  :return-value.sync="from"
                  :rules="[v => !!v || 'Item is required']"
                  readonly
                  label="From Date "
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="experience.duration_from"
                color="green lighten-1"
                no-title
                scrollable
              >
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="reset">
                  Cancel
                </v-btn>
                <v-btn text color="primary" @click="$refs.menu.save(from)">
                  OK
                </v-btn>
              </v-date-picker>
            </v-menu>
          </v-col>
          <v-col cols="12" lg="6">
            <v-menu
              ref="menu1"
              v-model="to"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="experience.duration_to"
                  :rules="[v => !!v || 'Item is required']"
                  :return-value.sync="to"
                  readonly
                  label="To Date "
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="experience.duration_to"
                no-title
                scrollable
              >
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="to = false">
                  Cancel
                </v-btn>
                <v-btn text color="primary" @click="$refs.menu1.save(to)">
                  OK
                </v-btn>
              </v-date-picker>
            </v-menu>
          </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
              <v-textarea
                v-model="experience.brief_summary"
                label="Brief Summary "
              ></v-textarea>
            </v-col>
          </v-row>

        <v-btn small color="success" class="mr-4" @click="addExperience">
          Add Experience
        </v-btn>

        <v-btn small color="error" class="mr-4" @click="reset">
          Reset Form
        </v-btn>
      </v-form>
      <v-timeline dense>
        <v-timeline-item small v-for="(item, index) in experience" :key="index">
          <template>
            <span class="font-weight-bold"
              >{{ $moment(item.duration_from).format("YYYY") }} -
              {{ $moment(item.duration_to).format("YY") }}
            </span>
          </template>
          <div class="py-4">
            <h2>
              {{ item.designation
              }}<v-btn
                v-if="edit"
                @click="editExperience(item)"
                class="ma-2"
                outlined
                x-small
                fab
                color="indigo"
              >
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-btn
                v-if="edit"
                @click="deleteItem(item)"
                class="ma-2"
                outlined
                x-small
                fab
                color="indigo"
              >
                <v-icon @click="deleteItem(item)">mdi-delete</v-icon>
              </v-btn>
            </h2>
            <div>{{ item.organization }}, {{ item.place }}.</div>
          </div>
        </v-timeline-item>
      </v-timeline>

      <v-layout align-end justify-end>
        <v-speed-dial
          v-model="fab"
          right
          open-on-hover
          direction="top"
          transition="slide-y-reverse-transition"
        >
          <template v-slot:activator>
            <v-btn
              v-model="fab"
              color="blue darken-2"
              dark
              fab
              x-small
              @click="edit = false"
            >
              <v-icon>{{ edit ? "mdi-close" : "mdi-pencil" }}</v-icon>
            </v-btn>
          </template>
          <v-btn fab dark x-small color="green" @click="activateForm">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
          <v-btn fab dark x-small color="indigo" @click="activateEdit">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
        </v-speed-dial>
      </v-layout>
    </v-alert>
  </div>
</template>

<script>
import Swal from "sweetalert2";
export default {
  props: ["experience"],
  data() {
    return {
      dialog: false,
      editedFrom: false,
      editedTo: false,
      edit: false,
      form: false,
      to: false,
      experience: {
        designation: "",
        organization: "",
        duration_from: "",
        duration_to: "",
        place: "",
        brief_summary: "",
        user: 0
      },
      editedItem: {
        designation: "",
        organization: "",
        duration_from: "",
        duration_to: "",
        place: "",
        brief_summary: "",
        user: 0
      }
    };
  },
  methods: {
    reset() {
      this.$refs.form.reset();
    },
    activateForm() {
      this.form = true;
      // this.edit = false;
    },
    activateEdit() {
      this.form = false;
      this.edit = true;
    },
    closeEdit() {
      this.form = false;
      this.edit = false;
    },
    async addExperience() {
      if (this.$refs.form.validate()) {
        this.experience.user = this.$store.state.auth.user.id;
        var payload = this.experience;
        console.log(payload);
        await this.$store
          .dispatch("profile/addExperience", payload)
          .then(resp => {
            Swal.fire({
              title: "Added",
              text: "Your experience has been added successfully!",
              icon: "success",
              showConfirmButton: false,
              timer: 1500
            });
            this.$emit("new-experience");
            this.reset();
            this.form=false;
          })
          .catch(Swal.fire("something wrong"));
      }
    },
    editExperience(item) {
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    deleteItem(item) {
      this.$store
        .dispatch("profile/deleteExperience", { id: item.id })
        .then(resp => {
          Swal.fire({
            title: "Deleted",
            text: "removed successfully!",
            icon: "success",
            showConfirmButton: false,
            timer: 1500
          });
          this.$emit("new-experience");
        })
        .catch(e => {
          Swal.fire("something Wrong!");
        });
    },
    save() {
      var payload = this.editedItem;
      this.$store
        .dispatch("profile/updateEducation", payload)
        .then(resp => {
          Swal.fire({
            title: "Added",
            text: "Your experience has been updated successfully!",
            icon: "success",
            showConfirmButton: false,
            timer: 1500
          });
          this.$emit("new-experience");
        })
        .catch(e => {
          Swal.fire("something Wrong!");
        });
    }
  }
};
</script>
