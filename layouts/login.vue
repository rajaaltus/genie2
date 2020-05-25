<template>
  <v-app>
    <v-content>
      <div class="backdrop">
        <div class="dark-overlay">
          <v-container fluid class="fill-height">
            <v-row align="center" justify="center">
              <v-col cols="12" sm="8" md="4">
                <v-card v-if="!registerForm" tile color="rgba(255,255,255,1)" style="border-bottom:3px solid #43A047;">
                  <v-toolbar flat tile color="rgba(255,255,255,0.1)">
                    <v-toolbar-title
                      ><img
                        src="/text-logo.png"
                        alt=""
                        width="100%"
                        class="pt-2"
                    /></v-toolbar-title>
                  </v-toolbar>

                  <v-card-text>
                    <v-form ref="login">
                      <v-text-field
                        color="green darken-1"
                        dense
                        outlined
                        v-model="loginData.login"
                        prepend-inner-icon= "mdi-account-box-outline"
                        label="Email / Employee ID / Student ID"
                        type="text"
                      />

                      <v-text-field
                        dense
                        outlined
                        prepend-inner-icon= "mdi-account-key"
                        id="password"
                        v-model="loginData.password"
                        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="show1 ? 'text' : 'password'"
                        label="Password"
                        name="password"
                        color="green darken-1"
                        @click:append="show1 = !show1"
                        @keypress.enter="signIn"
                      />
                    </v-form>
                  </v-card-text>
                  <v-card-actions>
                    <v-col cols="8">
                      <v-btn color="blue-grey darken-3" small text @click="gotoRegister">
                        <v-icon small class="pr-2">mdi-account-plus</v-icon>
                        Create Account
                      </v-btn>
                    </v-col>
                    <v-col cols="4">
                      <v-btn
                        color="success"
                        small
                        class="float-right"
                        @click="signIn"
                        
                      >
                       <v-icon small class="pr-2">mdi-login-variant</v-icon>
                        Login
                      </v-btn>
                    </v-col>
                  </v-card-actions>
                </v-card>

                <!-- register Form -->
                <!-- <pre>{{ register }}</pre> -->
                <v-card v-if="registerForm" tile color="rgba(255,255,255,1)">
                  <v-toolbar flat tile color="rgba(255,255,255,0.1)">
                    <v-toolbar-title
                      ><img
                        src="/text-logo.png"
                        alt=""
                        width="100%"
                        class="pt-2"
                    /></v-toolbar-title>
                  </v-toolbar>
                  <v-card-text>
                    <v-form ref="regForm" lazy-validation @submit.prevent>
                    <v-row>
                      <v-col cols="6" md="6" lg="6">
                      <v-select
                        dense
                        outlined
                        v-model="register.department"
                        :rules="[v => !!v || 'Please select your Department']"
                        label="Your Department"
                        :items="departments"
                        item-text="name"
                        item-value="id"
                        color="green darken-3"
                      >
                      </v-select>
                      </v-col>
                      <v-col cols="6" md="6" lg="6">
                      <v-select
                        dense
                        outlined
                        v-model="register.userType"
                        :rules="[v => !!v || 'Please select your Role']"
                        label="Your Role"
                        :items="roles"
                        item-text="text"
                        item-value="value"
                        color="green darken-3"
                      >
                      </v-select>
                      </v-col>

                      <v-col cols="12" md="12" lg="12">
                        <v-text-field
                          color="green darken-3"
                          v-model="register.fullname"
                          :rules="[v => !!v || 'Enter your Full Name']"
                          label="Full Name"
                          type="text"
                          outlined
                          dense
                        />
                      </v-col>

                      <v-col cols="12" md="12" lg="12">
                      <v-text-field
                        outlined
                        v-model="register.email"
                        :rules="[
                          v => !!v || 'E-mail is required',
                          v => /.+@.+\..+/.test(v) || 'Enter your valid Email ID'
                        ]"
                        label="Email Address"
                        placeholder="Also your primary Login ID"
                        type="email"
                        color="green darken-3"
                      />
                      </v-col>

                      <v-col cols="12" md="12" lg="12">
                      <v-text-field
                        outlined
                        v-model="register.username"
                        :rules="[v => !!v || 'Enter your Identification No']"
                        label="Login ID (Employee / Student ID)"
                        placeholder="Also your alternative Login ID"
                        type="text"
                        color="green darken-3"
                      />
                      </v-col>

                      <v-col cols="12" md="12" lg="12">
                      <v-text-field
                        dense
                        outlined
                        v-model="register.password"
                        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="show1 ? 'text' : 'password'"
                        label="Password"
                        color="green darken-3"
                        @click:append="show1 = !show1"
                      />
                      </v-col>
                    </v-row>
                    </v-form>
                  </v-card-text>
                  <v-card-actions>
                    <v-col cols="8">
                      <v-btn color="blue-grey darken-3" small text @click="loginForm">
                        <v-icon small class="pr-2">mdi-login-variant</v-icon>
                        Login
                      </v-btn>
                    </v-col>
                    <v-col cols="4">
                      <v-btn
                        color="green darken-3"
                        small
                        class="float-right"
                        @click="registerMe"
                        dark
                      >
                        <v-icon small class="pr-2">mdi-account-plus</v-icon>
                        Create Account
                      </v-btn>
                    </v-col>
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </div>
      </div>
    </v-content>
    <v-snackbar
      v-for="(snackbar, index) in snackbars.filter(s => s.showing)"
      right
      top
      :key="snackbar.text + Math.random()"
      :value="snackbar.showing"
      @input="removeSnackbar(snackbar)"
      :timeout="snackbar.timeout"
      :color="snackbar.color"
      :style="`top: ${(index * 60) + 8}px`"
    >
      {{snackbar.text}}

      <v-btn text @click="removeSnackbar(snackbar)">
        Close
      </v-btn>
    </v-snackbar>
  </v-app>
</template>

<script>
import Swal from "sweetalert2";
import {mapState} from 'vuex';
export default {
  head() {
    return {
      title: "ARMS Admin Login Page"
    };
  },
  data: () => ({
    show1: false,
    password: "Password",
    registerForm: false,
    loginData: {
      login: "",
      password: ""
    },
    departments: [],
    // registerData: {
    //   name: "",
    //   email: "",
    //   password: ""
    // },
    recoverPassEmail: "",
    roles: [
      {
        text: "Faculty / Staff",
        value: "FACULTY"
      },
      {
        text: "Student",
        value: "STUDENT"
      }
    ],
    register: {
      username: "",
      email: "",
      password: "",
      confirmed: true,
      fullname: "",
      userType: "",
      blocked: true,
      role: 1,
      department: 0
    }
  }),
  computed: {
   ...mapState({
      snackbars: state => state.snackbar.snackbars
    }),
  },
  async fetch({ store }) {
    await store.dispatch("user/getAllDepartment");
  },
  mounted() {
    this.departments = this.$store.state.user.departments.result;
  },
  methods: {
    removeSnackbar(snackbar) {
      this.$store.dispatch('snackbar/remove', snackbar)
    },
    async signIn () {
			await this.$auth.loginWith("local", {
				data: {
					identifier: this.loginData.login,
					password: this.loginData.password,
					rememberMe: true
				}
			})
				.then(data => {
          console.log(data.data.user)
          if(data.data.user.userType==='SUPER_ADMIN') {
            this.$store.dispatch('setUserData',data.data.user);
            this.$router.push('/super');
          }
          else
            this.$router.push('/admin');
				})
				.catch(err => {
          this.$store.dispatch('snackbar/setSnackbar', {color: 'red', text: err.response.data.data[0].messages[0].message, timer: '1000'})
					this.resetLogin();
				});
		},
    async registerMe() {
      if (this.$refs.regForm.validate()) {
        var regPayload = this.register;
        let res = this.$store.dispatch('user/addUser', regPayload)
        res.then((data) => {
          console.log('Result:' , data);
          if(data==true) {
            Swal.fire({
              title: "Successfully Registered your Account.",
              text: "Please contact to your department to activate your account.",
              icon: "info"
            });
            this.reset();
            this.loginForm(); 
          } else {
            Swal.fire({
              title: "Failure!",
              text: data.response.data.message?data.response.data.message[0].messages[0].message:'Something Wrong! Please try again.',
              icon: "error"
            });
            // console.log('Reg Failure:', data.response.data.message[0].messages[0].message)
          }
          
        });
        // this.$axios
        //   .$post("/auth/local/register", regPayload)
        //   .then(resp => {
            
        //   .catch(err => {
        //     Swal.fire({
        //       title: "Oops!",
        //       text: err.response.data.data[0].messages[0].message,
        //       icon: "error",
        //       showConfirmButton: false,
        //       timer: 3000,
        //       timerProgressBar: true
        //     });
        //     this.reset();
        //   });
      }
    },

    reset() {
      this.$refs.regForm.reset();
    },
    resetLogin() {
      this.$refs.login.reset();
    },
    gotoRegister() {
      this.show1 = false;
      this.registerForm = true;
      this.$axios
        .$get("/departments")
        .then(response => {
          return (this.departments = response);
        })
        .catch(e => {
        });
    },
    loginForm() {
      this.show1 = false;
      this.registerForm = false;
    }
  }
};
</script>

<style scoped>
.backdrop {
  background-image: url("/bg-3.jpg");
  background-size: cover;
  background-position: center center;
  width: 100vw;
  height: 100%;
  vertical-align: middle;
}

.dark-overlay {
  width: 100vw;
  height: 100vh !important;
  vertical-align: middle;
  overflow: hidden;
}

.text-input-style {
  border: none;
}
</style>
