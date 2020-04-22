<template>
  <div>
    <v-alert border="left" color="indigo" dark>
      <v-row class="mb-2">
        <h4 class="py-0 mt-1 ml-4">FROM:</h4>
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-chip
              class="mx-2 my-0"
              color="green"
              text-color="white"
              v-on="on"
            >
              <v-avatar left>
                <v-icon>mdi-account-circle</v-icon>
              </v-avatar>
              {{
                $auth.user.userType !== "DEPARTMENT"
                  ? "You"
                  : info.user.fullname
              }}
            </v-chip>
          </template>
          <span>{{ info.user.userType }}</span>
        </v-tooltip>
        <span class="mt-1">
          Submitted on &nbsp;<strong>
            {{ $moment(info.created_at).fromNow() }}
          </strong>
        </span>
      </v-row>
      <v-divider class="my-4 info" style="opacity: 0.22"></v-divider>
      <v-row class="my-2 mx-1">
        <span
          >From:
          <strong>{{ $moment(info.from_date).format("DD MMM YYYY") }}</strong>
          to:
          <strong>{{
            $moment(info.to_date).format("DD MMM YYYY")
          }}</strong></span
        >
      </v-row>
      <v-row class="my-2 mx-1">
        <span
          >{{ info.forum }} {{ info.program_type }} on
          <strong>{{ info.name }},</strong> {{ info.location }}, Banglore.</span
        >
      </v-row>
      <v-row class="my-2 mx-1">
        <h4>Coordinators: &nbsp;</h4>
        <span>Authors, One, Three</span>
      </v-row>
      <div class="my-2">
        Brief Report
      </div>
      <v-divider class="my-4 info" style="opacity: 0.22"></v-divider>
      <v-row align="center" no-gutters>
        <v-row v-if="$auth.user.userType === 'DEPARTMENT'">
          <v-spacer></v-spacer>
          <v-btn class="mr-2" color="success" @click="handleApprove()">
            Approve
          </v-btn>
          <v-btn class="mr-2" color="error" @click="handleReject()">
            Reject
          </v-btn>
          <v-btn
            class="mx-2"
            fab
            dark
            small
            color="orange"
            @click="handleDelete()"
          >
            <v-icon dark>mdi-delete</v-icon>
          </v-btn>
        </v-row>
        <v-row v-else>
          <v-spacer></v-spacer>
          <v-chip
            class="ma-2"
            close
            :color="getColor(info.approval_status)"
            text-color="white"
          >
            <v-avatar left>
              <v-icon>mdi-checkbox-marked-circle</v-icon>
            </v-avatar>
            {{ info.approval_status }}
          </v-chip>
          <!-- <v-btn
            class="mx-2"
            fab
            dark
            small
            color="orange"
            @click="handleDelete()"
          >
            <v-icon dark>mdi-delete</v-icon>
          </v-btn> -->
        </v-row>
      </v-row>
    </v-alert>
    <!-- <pre>{{info}}</pre> -->
  </div>
</template>

<script>
import Swal from "sweetalert2";
import { mapState } from "vuex";
export default {
  props: ["info"],
  methods: {
    getColor(status) {
      if (status === "Approved") return "green";
      else if (status === "Pending") return "orange";
      else return "red";
    },
    handleApprove() {
      var payload = Object.assign(
        {},
        {
          id: this.info.id,
          approval_status: "Approved"
        }
      );
      this.$store.dispatch("public/updatePublic", payload).then(resp => {
        let queryString = "";
        queryString = `department.id=${this.$store.state.auth.user.department}&approval_status=Pending&deleted_ne=true`;
        this.$store.dispatch("public/setPublicData", { qs: queryString });
        Swal.fire({
          title: "Success",
          text: "Approved successfully!",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
          position: "top-end"
        });
      });
      this.$emit("approved", 2);
      console.log("handled");
    },
    handleReject() {
      var payload = Object.assign(
        {},
        {
          id: this.info.id,
          approval_status: "Rejected",
          approved_by: this.info.approved_by,
          rejected_reason: this.info.rejected_reason
        }
      );
      payload.approved_by = this.$store.state.auth.user.fullname;
      Swal.fire({
        title: "Reason for Rejection",
        input: "text",
        showCancelButton: true,
        confirmButtonText: "Confirm",
        showLoaderOnConfirm: true,
        preConfirm: reason => {
          payload.rejected_reason = reason;
        },
        allowOutsideClick: () => !Swal.isLoading()
      }).then(result => {
        if (!result.dismiss) {
          this.$store
            .dispatch("public/updatePublic", payload)
            .then(response => {
              Swal.fire({
                type: "success",
                title: "Status saved!",
                icon: "success",
                showConfirmButton: false,
                timer: 1500
              });
              let queryString = "";
              queryString = `department.id=${this.$store.state.auth.user.department}&approval_status=Pending&deleted_ne=true`;
              this.$store.dispatch("public/setPublicData", {
                qs: queryString
              });
            });
        }
      });
    },
    handleDelete() {
      var id = this.info.id;
      Swal.fire({
        title: "Are you sure you want to permanently delete this record?",
        showCancelButton: true,
        confirmButtonText: "Yes, I am Sure.",
        showLoaderOnConfirm: true,
        allowOutsideClick: () => !Swal.isLoading()
      }).then(result => {
        if (!result.dismiss) {
          this.$store
            .dispatch("public/deletePublic", { id: id })
            .then(response => {
              Swal.fire({
                type: "success",
                title: "Deleted Successfully!",
                position: "top-end",
                icon: "success",
                showConfirmButton: false,
                timer: 1500
              });
              let queryString = "";
              queryString = `department.id=${this.$store.state.auth.user.department}&approval_status=Pending&deleted_ne=true`;
              this.$store.dispatch("public/setPublicData", {
                qs: queryString
              });
            });
        }
      });
    }
  }
};
</script>
