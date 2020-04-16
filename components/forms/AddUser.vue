<template>
  <div class="text-center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn color="warning" fab dark v-on="on">
          <v-icon>mdi-account-plus</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Create new user</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-select
                  v-model="newUser.userType"
                  label="Full name *"
                  required
                  outlined
                  :items="userTypes"
                  prepend-inner-icon="mdi-account-question"
                ></v-select>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="newUser.fullname"
                  label="Full name *"
                  outlined
                  hint="Ex: Mr. Mighty Joe"
                  :rules="[v => !!v || 'Please enter user\'s full name']"
                  prepend-inner-icon="mdi-account-settings"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="newUser.email"
                  label="Email Address *"
                  required
                  hint="Primary login id"
                  outlined
                  :rules="[
                    v => !!v || 'Please enter email',
                    v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
                  ]"
                  prepend-inner-icon="email"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <small>*Both are required fields</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false"
            >Reset</v-btn
          >
          <v-btn color="blue darken-1" text @click="addUser">Create</v-btn>
        </v-card-actions>

        <!-- <pre>{{ newUser }}</pre> -->
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import Swal from "sweetalert2";
export default {
  data() {
    return {
      dialog: false,
      newUser: {
        username: "",
        fullname: "",
        email: "",
        password: "",
        userType: "",
        department: 0,
        confirmed: true,
        blocked: false
      },
      userTypes: [
        {
          text: "Faculty / Staff",
          value: "FACULTY"
        },
        {
          text: "Student",
          value: "STUDENT"
        }
      ]
    };
  },
  async mounted() {},
  methods: {
    addUser() {
      this.newUser.department = this.$store.state.auth.user.department;
      this.newUser.password = "changemenow";
      this.newUser.username = this.newUser.email;
      var payload = this.newUser;
      // console.log(payload);
      this.$store
        .dispatch("user/addUser", payload)
        .then(resp => {
          console.log(resp);
          Swal.fire({
            title: "Test",
            text: "User added",
            icon: "success",
            showConfirmButton: false,
            timer: 1500
          });
          this.dialog = false;
          this.$emit('new-user');
          console.log('emitting....')
        })
        .catch(e => {});
    }
  }
};
</script>
