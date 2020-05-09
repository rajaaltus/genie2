<template>
  <div>
    <v-form ref="form" v-model="valid" lazy-validation>
      <h2>Personal Details</h2>
      <v-row>
        <!-- <pre>{{userProfile[0]}}</pre> -->
        <v-col cols="12" lg="6">
          <v-text-field
            v-model="profile.name"
            color="green"
            label="Full Name"
            :rules="[v => !!v || 'Full Name is Required']"
          ></v-text-field>
        </v-col>
        <v-col cols="12" lg="3">
          <v-text-field
            v-model="profile.designation"
            color="green"
            label="Designation"
            :rules="[v => !!v || 'Designation is Required']"
          ></v-text-field>
        </v-col>
        <v-col cols="12" lg="3">
          <v-text-field
            v-model="profile.employee_id"
            color="green"
            label="Employee ID"
            :rules="[v => !!v || 'Employee ID is Required']"
          ></v-text-field>
        </v-col>
        <v-col cols="12" lg="3" v-if="$auth.user.userType === 'STUDENT'">
          <v-text-field
            v-model="profile.stu_batch"
            color="green"
            label="Batch (Years)"
            :rules="[v => !!v || 'Batch is Required']"
          ></v-text-field>
        </v-col>
        <v-col cols="12" lg="3" v-else>
          <v-text-field
            v-model="profile.stu_batch"
            color="green"
            label="Batch (Years)"
            :rules="[v => !!v || 'Batch is Required']"
            disabled
          ></v-text-field>
        </v-col>
        <v-col cols="12" lg="3">
          <v-menu
            ref="menu"
            v-model="menu"
            :close-on-content-click="false"
            :return-value.sync="menu"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="profile.dob"
                color="green"
                label="Date of Birth"
                readonly
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="profile.dob" no-title scrollable>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="menu = false">
                Cancel
              </v-btn>
              <v-btn text color="primary" @click="$refs.menu.save(menu)">
                OK
              </v-btn>
            </v-date-picker>
          </v-menu>
        </v-col>
        <v-col cols="12" lg="3">
          <v-text-field
            v-model="profile.age"
            color="green"
            type="number"
            label="Age"
          ></v-text-field>
        </v-col>
        <v-col cols="12" lg="3">
          <v-select
            v-model="profile.gender"
            color="green"
            :items="genders"
            label="Gender"
            required
          >
          </v-select>
        </v-col>
        <v-col cols="12" lg="4">
          <v-text-field
            v-model="profile.contact_no"
            color="green"
            label="Mobile No"
          ></v-text-field>
        </v-col>
        <v-col cols="12" lg="4">
          <v-text-field
            v-model="profile.extension_no"
            color="green"
            label="Office No"
          ></v-text-field>
        </v-col>
        <v-col cols="12" lg="4">
          <v-text-field
            v-model="profile.personal_email"
            color="green"
            :rules="[v => !!v || 'Email ID is Required']"
            label="Email ID"
            placeholder="Also your Primary Login ID"
          ></v-text-field>
        </v-col>
        <!-- <v-col cols="12">
          <v-file-input
            color="green"
            :rules="rules"
            accept="image/png, image/jpeg, image/bmp"
            prepend-icon="mdi-camera"
            label="Profile Avatar"
          ></v-file-input>
        </v-col> -->
      </v-row>
      <v-layout align-end justify-end>
        <v-btn color="green darken-1" small dark @click="updateProfile">
          <v-icon small class="pr-2">mdi-content-save</v-icon>
          Save
        </v-btn>
      </v-layout>
    </v-form>
    <!-- <pre>{{profile}}</pre> -->
  </div>
</template>

<script>
import { mapState } from "vuex";
import Swal from "sweetalert2";
export default {
  // props: ["userProfile"],
  data() {
    return {
      menu: false,
      valid: false,
      profile: {
        name: "",
        designation: "",
        employee_id: "",
        dob: null,
        age: null,
        gender: "",
        contact_no: "",
        extension_no: "",
        official_email: "",
        personal_email: "",
        linkedin_url: "",
        stu_batch: "",
        deleted: false,
        active_status: true,
        user: 0,
        image: null
      },
      genders: ["Male", "Female", "Others"]
    };
  },
  computed: {
    ...mapState({
      userProfile: state => state.user.userProfile
    })
  },
  async mounted() {
    this.profile = Object.assign({}, this.userProfile);
  },
  methods: {
     updateProfile() {
      var payload = this.profile;
      console.log(payload);
       this.$store
        .dispatch("user/updateUserProfile", payload)
        .then(resp => {
          Swal.fire({
            title: "Updated",
            text: "Your Profile has been updated successfully!",
            icon: "success",
            showConfirmButton: false,
            timer: 1500
          });
          this.$emit("profile-update");
          // this.profile = Object.assign({}, this.$store.state.user.userProfile);
        })
        .catch(e => {
          Swal.fire("something Wrong!");
          
        });
    },
    
  }
};
</script>
