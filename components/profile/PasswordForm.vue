<template>
  <div>
    <v-form ref="form" v-model="valid" lazy-validation>
      <h2>Password Change</h2>
      <v-row>
        <v-col cols="6">
          <v-text-field
            color="green"
            label="New Password"
            type="password"
            :rules="[v => !!v || 'New Password is Required']"
          ></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-text-field
            color="green"
            label="Confirm the New Password"
            type="password"
            :rules="[v => !!v || 'Confirmation is Required']"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-layout align-end justify-end>
        <v-btn color="green darken-1" small dark>
          <v-icon small class="pr-2">mdi-key-change</v-icon>
          Update Password
        </v-btn>
      </v-layout>
    </v-form>
  </div>
</template>
