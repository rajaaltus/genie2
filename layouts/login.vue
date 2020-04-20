<template>
  <v-app>
    <v-content>
      <div class="backdrop">
        <div class="dark-overlay">
          <v-container fluid class="fill-height">
            <v-row align="center" justify="center">
              <v-col cols="12" sm="8" md="4">
                <v-card v-if="!registerForm" tile color="rgba(255,255,255,0.5)">
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
                        dense
                        outlined
                        v-model="loginData.login"
                        label="Email / Employee Id / Student Id"
                        type="text"
                        color="success"
                      />

                      <v-text-field
                        dense
                        outlined
                        id="password"
                        v-model="loginData.password"
                        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="show1 ? 'text' : 'password'"
                        label="Password"
                        name="password"
                        color="success"
                        @click:append="show1 = !show1"
                        @keypress.enter="signIn"
                      />
                    </v-form>
                  </v-card-text>
                  <v-card-actions>
                    <v-col cols="8">
                      <v-btn color="primary" small text @click="gotoRegister">
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
                        Login
                      </v-btn>
                    </v-col>
                  </v-card-actions>
                </v-card>

                <!-- register Form -->
                <!-- <pre>{{ register }}</pre> -->
                <v-card v-if="registerForm" tile color="rgba(255,255,255,0.6)">
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
                    <v-form ref="registerForm" lazy-validation @submit.prevent>
                      <v-select
                        dense
                        outlined
                        v-model="register.userType"
                        :rules="[v => !!v || 'Item is required']"
                        label="Select Role*"
                        :items="roles"
                        item-text="text"
                        item-value="value"
                        color="success"
                      >
                      </v-select>
                      <v-row>
                        <v-col cols="12">
                          <v-text-field
                            v-model="register.fullname"
                            :rules="[v => !!v || 'Fullname is required']"
                            label="Full Name"
                            type="text"
                            outlined
                            dense
                          />
                        </v-col>
                      </v-row>

                      <v-text-field
                        outlined
                        v-model="register.email"
                        :rules="[
                          v => !!v || 'E-mail is required',
                          v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
                        ]"
                        label="Email Address"
                        placeholder="Also your primary Login ID"
                        type="email"
                        color="success"
                      />
                      <v-text-field
                        outlined
                        v-model="register.username"
                        :rules="[v => !!v || 'Employee Id is required']"
                        label="Login ID (Employee / Student ID)"
                        placeholder="Also your alternative Login ID"
                        type="text"
                        color="success"
                      />
                      <v-text-field
                        dense
                        outlined
                        v-model="register.password"
                        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="show1 ? 'text' : 'password'"
                        label="Password"
                        color="success"
                        @click:append="show1 = !show1"
                      />
                      <v-select
                        dense
                        outlined
                        v-model="register.department"
                        :rules="[v => !!v || 'Item is required']"
                        label="Select your department*"
                        :items="departments"
                        item-text="name"
                        item-value="id"
                        color="success"
                      >
                      </v-select>
                    </v-form>
                  </v-card-text>
                  <v-card-actions>
                    <v-col cols="8">
                      <v-btn color="primary" small text @click="loginForm">
                        Login
                      </v-btn>
                    </v-col>
                    <v-col cols="4">
                      <v-btn
                        color="success"
                        small
                        class="float-right"
                        @click="registerMe"
                      >
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
  </v-app>
</template>

<script>
import Swal from "sweetalert2";
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
    registerData: {
      name: "",
      email: "",
      password: ""
    },
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
  async fetch({ store }) {
    await store.dispatch("user/getAllDepartment");
  },
  mounted() {
    this.departments = this.$store.state.user.departments.result;
  },
  methods: {
    async signIn () {
			await this.$auth.loginWith("local", {
				data: {
					identifier: this.loginData.login,
					password: this.loginData.password,
					rememberMe: true
				}
			})
				.then(data => {
					this.$router.push('/admin');
				})
				.catch(err => {
					Swal.fire({
						title: 'Login Failed!',
						text: err.response.data.data[0].messages[0].message,
						type: 'error'
					});
					this.resetLogin();
				});
		},
    async registerMe() {
      if (this.$refs.registerForm.validate()) {
        var payload = this.register;
        // console.log(payload);
        await this.$axios
          .$post("/auth/local/register", payload)
          .then(resp => {
            Swal.fire({
              title: "Successfully Registered your Account.",
              text: "Please login to continue using our system",
              type: "info"
            });
            this.reset();
            this.loginForm();
          })
          .catch(err => {
            Swal.fire({
              title: "Oops!",
              text: err.response.data.data[0].messages[0].message,
              type: "error",
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true
            });
            this.reset();
          });
      }
    },

    reset() {
      this.$refs.registerForm.reset();
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
  background-image: url("/bg-2.jpg");
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
