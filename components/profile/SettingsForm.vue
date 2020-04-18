<template>
  <div>
    <v-form ref="form" v-model="valid" lazy-validation>
      <h2>Personal Details</h2>
      <v-row>
        <v-col cols="6">
          <v-text-field
            color="green"
            label="Full Name"
            :rules="[v => !!v || 'Full Name is Required']"
          ></v-text-field>
        </v-col>
        <v-col cols="3">
          <v-text-field
            color="green"
            label="Designation"
            :rules="[v => !!v || 'Designation is Required']"
          ></v-text-field>
        </v-col>
        <v-col cols="3">
          <v-text-field
            color="green"
            label="Employee ID"
            :rules="[v => !!v || 'Employee ID is Required']"
          ></v-text-field>
        </v-col>
        <v-col cols="3">
          <v-text-field
            color="green"
            label="Batch (Years)"
            :rules="[v => !!v || 'Batch is Required']"
          ></v-text-field>
        </v-col>
        <v-col cols="3">
          <v-menu
            ref="menu"
            v-model="menu"
            :close-on-content-click="false"
            :return-value.sync="date"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                color="green"
                label="Date of Birth"
                readonly
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker no-title scrollable>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="menu = false">
                Cancel
              </v-btn>
              <v-btn text color="primary" @click="$refs.menu.save(date)">
                OK
              </v-btn>
            </v-date-picker>
          </v-menu>
        </v-col>
        <v-col cols="3">
          <v-text-field color="green" type="number" label="Age"></v-text-field>
        </v-col>
        <v-col cols="3">
          <v-select color="green" :items="genders" label="Gender" required>
          </v-select>
        </v-col>
        <v-col cols="3">
          <v-text-field color="green" label="Mobile No"></v-text-field>
        </v-col>
        <v-col cols="3">
          <v-text-field color="green" label="Office No"></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-text-field
            color="green"
            :rules="[v => !!v || 'Email ID is Required']"
            label="Email ID"
            placeholder="Also your Primary Login ID"
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-file-input
            color="green"
            :rules="rules"
            accept="image/png, image/jpeg, image/bmp"
            prepend-icon="mdi-camera"
            label="Profile Avatar"
          ></v-file-input>
        </v-col>
      </v-row>
      <v-layout align-end justify-end>
        <v-btn color="green darken-1" small dark>
          <v-icon small class="pr-2">mdi-content-save</v-icon>
          Save
        </v-btn>
      </v-layout>
    </v-form>
  </div>
</template>
