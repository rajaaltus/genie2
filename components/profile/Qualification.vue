<template>
  <div>
    <v-dialog v-model="dialog" persistent max-width="50%">
      <template v-slot:activator="{ on }">
        <v-btn small color="warning" fab dark v-on="on" class="mt-2">
          <v-icon>mdi-account-plus</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Create New Account</span>
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="4">
              <v-text-field
                color="green"
                v-model="editedItem.qualification"
                label="Qualification *"
                required
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="8">
              <v-text-field
                color="green"
                v-model="editedItem.institute"
                label="Institute *"
                outlined
                :rules="[v => !!v || 'Please Enter institute Name']"
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
        </v-card-text>
        <v-card-actions class="pr-5">
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" small dark @click="dialog = false"
            >Close</v-btn
          >
          <v-btn color="green darken-1" small dark @click="save"
            ><v-icon small class="pr-2">mdi-account-plus</v-icon>Create
            Account</v-btn
          >
        </v-card-actions>

        <!-- <pre>{{ editedItem }}</pre> -->
      </v-card>
    </v-dialog>
    <v-alert
      tile
      elevation="1"
      border="left"
      color="blue lighten-1"
      colored-border
      icon="mdi-hospital-building"
    >
      <h2 class="font-weight-bold">Qualifications</h2>

      <v-form ref="form" v-model="valid" lazy-validation v-if="form">
        <v-row>
          <v-col cols="12" lg="6">
            <v-text-field
              v-model="qualification.qualification"
              :rules="[v => !!v || 'Please type qualification']"
              label="Qualification *"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" lg="6">
            <v-text-field
              v-model="qualification.institute"
              :rules="[v => !!v || 'Please type qualification']"
              label="Institution *"
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
                  v-model="qualification.duration_from"
                  :return-value.sync="from"
                  :rules="[v => !!v || 'Item is required']"
                  readonly
                  label="From Date "
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="qualification.duration_from"
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
                  v-model="qualification.duration_to"
                  :rules="[v => !!v || 'Item is required']"
                  :return-value.sync="to"
                  readonly
                  label="To Date "
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="qualification.duration_to"
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

        <v-btn small color="success" class="mr-4" @click="addQualification">
          Add Qualification
        </v-btn>

        <v-btn small color="error" class="mr-4" @click="reset">
          Reset Form
        </v-btn>
      </v-form>

      <v-card
        flat
        class="py-0"
        v-for="(item, index) in qualifications"
        :key="index"
      >
        <v-card-title class="title font-weight-bold px-0"
          >{{ $moment(item.duration_from).format("YYYY") }} -
          {{ $moment(item.duration_to).format("YY") }}
          <v-btn
            v-if="edit"
            @click="editQualification(item)"
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
            @click="deleteQ(item)"
            class="ma-2"
            outlined
            x-small
            fab
            color="indigo"
          >
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-subtitle class="body-2 font-weight-bold px-0"
          >{{ item.qualification }}, {{ item.institute }}
        </v-card-subtitle>
      </v-card>

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
              small
              @click="edit = false"
            >
              <v-icon>{{ edit ? "mdi-close" : "mdi-pencil" }}</v-icon>
            </v-btn>
          </template>
          <v-btn fab dark small color="green" @click="activateForm">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
          <v-btn fab dark small color="indigo" @click="activateEdit">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
        </v-speed-dial>
      </v-layout>
    </v-alert>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import { mapState } from "vuex";
export default {
  props: ["qualifications"],
  data() {
    return {
      dialog: false,
      editedFrom: false,
      editedTo: false,
      edit: false,
      form: false,
      to: false,
      qualification: {
        qualification: "",
        duration_from: "",
        duration_to: "",
        institute: "",
        deleted: false,
        user: 0
      },
      editedItem: {
        qualification: "",
        duration_from: "",
        duration_to: "",
        institute: "",
        deleted: false,
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
    async addQualification() {
      if (this.$refs.form.validate()) {
        this.qualification.user = this.$store.state.auth.user.id;
        var payload = this.qualification;
        console.log(payload);
        await this.$store
          .dispatch("profile/addEducation", payload)
          .then(resp => {
            Swal.fire({
              title: "Added",
              text: "Your Qualification has been added successfully!",
              icon: "success",
              showConfirmButton: false,
              timer: 1500
            });
            this.$emit("new-qualification");
          })
          .catch(Swal.fire("something wrong"));
      }
    },
    editQualification(item) {
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    save() {
      var payload = this.editedItem;
      this.$store
        .dispatch("profile/updateEducation", payload)
        .then(resp => {
          Swal.fire({
            title: "Added",
            text: "Your Qualification has been updated successfully!",
            icon: "success",
            showConfirmButton: false,
            timer: 1500
          });
          this.$emit("new-qualification");
        })
        .catch((e) => {
          Swal.fire('something Wrong!')
			})
    }
  }
};
</script>
