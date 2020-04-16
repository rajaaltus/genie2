<template>
  <div>
    <PageHeader :title="$metaInfo.title" />
    <v-data-table :items="staffs" :headers="headers" :loading="loading"
      loading-text="Loading... Please wait" class="elevation-1">
      <template v-slot:item.userType="{ item }">
        <v-chip :color="getColor(item.userType)" dark>{{
          item.userType
        }}</v-chip>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon centre @click="editItem(item)" color="green"
          >mdi-pencil-box</v-icon
        >
        <v-icon centre @click="deleteItem(item)" color="error"
          >mdi-delete-circle</v-icon
        >
      </template>
    </v-data-table>
    <v-row>
      <v-col cols="12" lg="4">
        <wordcloud
        :data="defaultWords"
        nameKey="name"
        valueKey="value"
        :color="myColors"
        :showTooltip="true"
        :wordClick="wordClickHandler">
        </wordcloud>
      </v-col>
    </v-row>
    
    <!-- <highcharts :options="chartOptions"></highcharts> -->
  </div>
</template>

<script>
import { mapState } from "vuex";
import wordcloud from 'vue-wordcloud'
import PageHeader from "@/components/PageHeader";
import Swal from 'sweetalert2'
export default {
  head() {
      return {
        title: "Settings",
      }
  },
  components: {
    PageHeader,
    wordcloud
  },
  data: () => ({
      loading: false,
      headers: [
        { text: "Full name", value: "fullname" },
        { text: "Email", value: "email" },
        { text: "Designation", value: "userType" },
        { text: "Actions", value: "actions"}
      ],
      chartOptions: {
        series: [{
          data: [1,2,3] // sample data
        }]
      },
      myColors: ['#1f77b4', '#629fc9', '#94bedb', '#c9e0ef'],
      defaultWords: [{
          "name": "Cat",
          "value": 1
        },
        {
          "name": "fish",
          "value": 2
        },
        {
          "name": "things",
          "value": 3
        },
        {
          "name": "look",
          "value": 4
        },
        {
          "name": "two",
          "value": 5
        },
        {
          "name": "fun",
          "value": 6
        },
        {
          "name": "know",
          "value": 7
        },
        {
          "name": "good",
          "value": 8
        },
        {
          "name": "play",
          "value": 9
        },
        {
          "name": "fish",
          "value": 10
        },
        {
          "name": "things",
          "value": 11
        },
        {
          "name": "look",
          "value": 12
        },
        {
          "name": "two",
          "value": 13
        },
        {
          "name": "fun",
          "value": 14
        },
        {
          "name": "know",
          "value": 15
        },
        {
          "name": "good",
          "value": 16
        },
        {
          "name": "play",
          "value": 17
        }
      ]
      
  
  }),
  
  computed: {
    ...mapState({
      staffs: state => state.staffs
    })
  },
  async fetch({ store }) {
    let queryString = "";
    queryString = `department.id=${store.state.auth.user.department}&userType=FACULTY&blocked_ne=true`;
    store.dispatch("setStaffs", { qs: queryString });
  },
  mounted() {
    this.staffs = this.$store.state.staffs;
  },
  methods: {
    deleteItem(item) {
      let result = this.$store.dispatch('user/deleteUser', {id: item.id})
        if (result) {
          Swal.fire('deleted');
          this.reloadData();
        }
    },
    async reloadData () {
      this.loading = true;
      let queryString = "";
      queryString = `department.id=${this.$store.state.auth.user.department}&userType=FACULTY&blocked_ne=true`;
      await this.$store.dispatch("setStaffs", { qs: queryString });
      this.loading = false;
    },
    getColor(userType) {
      return userType === "FACULTY" ? "green" : "red";
    },
    wordClickHandler(name, value, vm) {
      console.log('wordClickHandler', name, value, vm);
    }
  }
};
</script>

<style scoped>
.highcharts-figure, .highcharts-data-table table {
  min-width: 320px; 
  max-width: 800px;
  margin: 1em auto;
}

.highcharts-data-table table {
	font-family: Verdana, sans-serif;
	border-collapse: collapse;
	border: 1px solid #EBEBEB;
	margin: 10px auto;
	text-align: center;
	width: 100%;
	max-width: 500px;
}
.highcharts-data-table caption {
  padding: 1em 0;
  font-size: 1.2em;
  color: #555;
}
.highcharts-data-table th {
	font-weight: 600;
  padding: 0.5em;
}
.highcharts-data-table td, .highcharts-data-table th, .highcharts-data-table caption {
  padding: 0.5em;
}
.highcharts-data-table thead tr, .highcharts-data-table tr:nth-child(even) {
  background: #f8f8f8;
}
.highcharts-data-table tr:hover {
  background: #f1f7ff;
}
</style>
