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
                <v-text-field v-model="fullname" label="Full name *" required outlined hint="Ex: Mr. Mighty Joe" prepend-inner-icon="mdi-account"></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="email" label="Email Address *" required hint="Primary login id" outlined  prepend-inner-icon="email"></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <small>*Both are required fields</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">Reset</v-btn>
          <v-btn color="blue darken-1" text @click="dialog = false">Create</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
   
  </div>
</template>

<script>
  export default {
    data: () => ({
      dialog: false,
      newUser: {

      }
    }),
  }
</script>