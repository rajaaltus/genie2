<template>
  <div>
    <v-card class="mx-auto mb-1" outlined>
      <v-list-item three-line>
        <v-list-item-content>
          <div class="overline mb-4">
          Submitted By {{ info.user.fullname }} on {{ $moment(info.created_at).format("DD MMM YYYY, HH:MM") }}  
          </div>
          <!-- Main Content -->
          
          <p class="body-2 font-weight-medium">{{ info.forum }} {{ info.type }} on {{ info.name }} from {{ $moment(info.from_date).format("DD MMM YYYY") }} to {{ $moment(info.to_date).format("DD MMM YYYY") }} held at {{ info.location }}</p>
					<p class="body-2"><b>Coordinators:</b> {{ info.coordinators }}</p>
				  <p class="body-2 font-weight-medium"><b><u>Brief Report</u></b></p>
					<p class="body-2 font-weight-normal">{{ info.brief_report }}</p>


          <!-- Main Content End -->
          </v-list-item-content>
          <v-list-item-avatar tile size="100" color="grey" v-if="info.image">
            <v-img
            :src="info.image?`${$axios.defaults.baseURL}${info.image.url}`:''"
            max-width="100%"
            >
            </v-img>
          </v-list-item-avatar>
      </v-list-item>

      <v-card-actions>
        <v-layout align-end justify-end>
        <v-btn small color="red darken-3" class="mr-2" dark @click="handleReject()"><v-icon small class="pr-2">mdi-message-bulleted-off</v-icon>Reject</v-btn>
        <v-btn small color="green darken-3" dark @click="handleApprove()"><v-icon small class="pr-2">mdi-check-all</v-icon> Approve</v-btn>
        </v-layout>
      </v-card-actions>
    </v-card>
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
          approval_status: "Approved",
        }
      );
      this.$store.dispatch("program/updateProgram", payload).then((resp) => {
        let queryString = "";
        queryString = `department.id=${this.$store.state.auth.user.department}&approval_status=Pending&deleted_ne=true`;
        this.$store.dispatch("program/setProgrammesData", { qs: queryString });
        Swal.fire({
          title: "Success",
          text: "Approved successfully!",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
          position: "top-end",
        });
      });
      this.$emit("approved", 1);
      console.log("handled");
    },
    handleReject() {
      var payload = Object.assign(
        {},
        {
          id: this.info.id,
          approval_status: "Rejected",
          approved_by: this.info.approved_by,
          rejected_reason: this.info.rejected_reason,
        }
      );
      payload.approved_by = this.$store.state.auth.user.fullname;
      Swal.fire({
        title: "Reason for Rejection",
        input: "text",
        showCancelButton: true,
        confirmButtonText: "Confirm",
        showLoaderOnConfirm: true,
        preConfirm: (reason) => {
          payload.rejected_reason = reason;
        },
        allowOutsideClick: () => !Swal.isLoading(),
      }).then((result) => {
        if (!result.dismiss) {
          this.$store
            .dispatch("program/updateProgram", payload)
            .then((response) => {
              Swal.fire({
                type: "success",
                title: "Status saved!",
                icon: "success",
                showConfirmButton: false,
                timer: 1500,
              });
              let queryString = "";
              queryString = `department.id=${this.$store.state.auth.user.department}&approval_status=Pending&deleted_ne=true`;
              this.$store.dispatch("program/setProgrammesData", {
                qs: queryString,
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
        allowOutsideClick: () => !Swal.isLoading(),
      }).then((result) => {
        if (!result.dismiss) {
          this.$store
            .dispatch("program/deleteProgram", { id: id })
            .then((response) => {
              Swal.fire({
                type: "success",
                title: "Deleted Successfully!",
                position: "top-end",
                icon: "success",
                showConfirmButton: false,
                timer: 1500,
              });
              let queryString = "";
              queryString = `department.id=${this.$store.state.auth.user.department}&approval_status=Pending&deleted_ne=true`;
              this.$store.dispatch("program/setProgrammesData", {
                qs: queryString,
              });
            });
        }
      });
    },
  },
};
</script>
