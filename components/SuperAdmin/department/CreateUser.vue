<template>
  <div>
    <v-form ref="form" lazy-validation>
          <h2>Personal Details</h2>
          <v-row>
            <v-col cols="12" lg="6">
              <v-text-field
                color="green"
                label="Full Name"
                :rules="[(v) => !!v || 'Full Name is Required']"
              ></v-text-field>
            </v-col>
            <v-col cols="12" lg="3">
              <v-text-field
                color="green"
                label="Designation"
                :rules="[(v) => !!v || 'Designation is Required']"
              ></v-text-field>
            </v-col>
            <v-col cols="12" lg="3">
              <v-text-field
                color="green"
                label="Employee ID"
                :rules="[(v) => !!v || 'Employee ID is Required']"
              ></v-text-field>
            </v-col>
             <v-col cols="12" lg="3">
              <v-select
                color="green"
                label="Department"
                :rules="[(v) => !!v || 'Department is Required']"
              ></v-select>
            </v-col>
            <v-col cols="12" lg="6">
              <v-text-field
                color="green"
                :rules="[(v) => !!v || 'Email ID is Required']"
                label="Email ID"
                placeholder="Also your Primary Login ID"
              ></v-text-field>
            </v-col>
             <v-col cols="12" lg="3">
              <v-text-field
                color="green"
                label="Password"
                type="password"
                :rules="[(v) => !!v || 'Password is Required']"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-layout align-end justify-end>
            <v-btn color="red darken-1" small dark class="mr-1">
              <v-icon small class="pr-2">mdi-notification-clear-all</v-icon>
              Reset
            </v-btn>
            <v-btn color="green darken-1" small dark >
              <v-icon small class="pr-2">mdi-account-plus</v-icon>
              Create
            </v-btn>
          </v-layout>
        </v-form>
  </div>
</template>