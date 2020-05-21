<template>
  <div>
    <v-card tile class="mx-auto my-card">
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="headline">{{
            profile.name
          }}</v-list-item-title>
          <v-list-item-subtitle>{{ profile.designation }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <div>
        <v-hover>
          <template v-slot:default="{ hover }">
            <v-img
              :src="
                image_url !== null
                  ? `${$axios.defaults.baseURL}${image_url}`
                  : '/image_placeholder.png'
              "
              class="mt-3"
              max-width="100%"
            >
              <v-fade-transition>
                <v-overlay v-if="hover" absolute color="#00564c">
                  <v-btn @click="$refs.image.click()">
                    {{ image_url ? "Edit Image" : "Upload Image" }}
                  </v-btn>
                </v-overlay>
              </v-fade-transition>
            </v-img>
          </template>
        </v-hover>
        <input
          ref="image"
          type="file"
          style="display: none;"
          label="File input"
          @change="handleFileUpload"
        />
      </div>
      <!-- <v-img
        v-if="image_url !== null"
        :src="`${$axios.defaults.baseURL}${image_url}`"
        height="auto"
      ></v-img>
      <v-img v-else src="/image_placeholder.png" height="auto"></v-img> -->

      <v-card-text>
        <v-icon small color="red" class="mdi mdi-email-outline mr-3"></v-icon>
        <span class="body-2">{{ profile.personal_email }}</span
        ><br />
        <v-icon small color="blue" class="mdi mdi-phone mr-3"></v-icon>
        <span class="body-2">{{ profile.contact_no }}</span>
      </v-card-text>

      <v-card-actions>
        <v-switch
          v-if="$auth.user.userType !== 'DEPARTMENT'"
          v-model="publicProfile"
          color="green darken-3"
          label="Public Access"
          class="pl-2"
        ></v-switch>
      </v-card-actions>
      <v-divider></v-divider>
      <nuxt-link :to="`/profile/${profile.employee_id}`">
      <v-chip class="ma-2" label>
        {{$nuxt.context.env.baseUrl+'/profile/'+profile.employee_id}}
      </v-chip>
      </nuxt-link>
    </v-card>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import { mapState } from "vuex";
export default {
  props: ["profile"],
  data() {
    return {
      image_url: null,
      imageToDelete: null,
    };
  },
  computed: {
    publicProfile() {
      if (this.profile.active_status !== null)
        return this.profile.active_status;
      else return false;
    },
  },
  mounted() {
    console.log(this.profile);
    if (this.profile.image !== null) this.image_url = this.profile.image.url;
    // console.log('its not null')
    // else
    //   console.log('its null')
  },
  methods: {
    async handleFileUpload(event) {
      console.log(this.image_url);
      if (this.image_url !== null) {
        this.imageToDelete = this.profile.image.id;
        this.selectedFile = event.target.files[0];
        const data = new FormData();
        data.append("files", this.selectedFile);
        const uploadRes = await this.$axios({
          method: "POST",
          url: "/upload",
          data,
        });
        this.image_url = uploadRes.data[0].url;
        var payload = Object.assign(
          {},
          {
            id: this.profile.id,
            image: uploadRes.data[0].id,
          }
        );
        var userPayload = Object.assign(
          {},
          {
            id: this.$auth.user.id,
            avatar: uploadRes.data[0].id,
          }
        );
        this.$store
          .dispatch("user/updateUserProfile", payload)
          .then((resp) => {
            Swal.fire({
              title: "Success",
              text: "Updated Successfully!",
              icon: "success",
              showConfirmButton: false,
              timer: 1500,
            });

            if (this.imageToDelete) {
              this.$store.dispatch("deleteFile", { id: this.imageToDelete });
              this.imageToDelete = null;
            }
          })
          .catch((err) => {
            Swal.fire({
              title: "Something Wrong!",
              text: err,
              icon: "warning",
              showConfirmButton: false,
              timer: 4500,
            });
          });
        this.$store.dispatch("user/updateUser", userPayload);
      } else {
        this.profile.image = null;
        this.selectedFile = event.target.files[0];
        const data = new FormData();
        data.append("files", this.selectedFile);
        const uploadRes = await this.$axios({
          method: "POST",
          url: "/upload",
          data,
        });
        this.image_url = uploadRes.data[0].url;
        var payload = Object.assign(
          {},
          {
            id: this.profile.id,
            image: uploadRes.data[0].id,
          }
        );
        var userPayload = Object.assign(
          {},
          {
            id: this.$auth.user.id,
            avatar: uploadRes.data[0].id,
          }
        );
        this.$store
          .dispatch("user/updateUserProfile", payload)
          .then((resp) => {
            Swal.fire({
              title: "Success",
              text: "Updated Successfully!",
              icon: "success",
              showConfirmButton: false,
              timer: 1500,
            });

            if (this.imageToDelete) {
              this.$store.dispatch("deleteFile", { id: this.imageToDelete });
              this.imageToDelete = null;
            }
          })
          .catch((err) => {
            Swal.fire({
              title: "Something Wrong!",
              text: err,
              icon: "warning",
              showConfirmButton: false,
              timer: 4500,
            });
          });
        this.$store.dispatch("user/updateUser", userPayload);
      }
    },
  },
};
</script>
