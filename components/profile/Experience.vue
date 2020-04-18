<template>
  <div>
    <v-alert
      tile
      elevation="1"
      border="left"
      color="amber lighten-1"
      colored-border
      icon="mdi-briefcase"
    >
      <h2 class="font-weight-bold">Experiance</h2>
      <v-timeline dense>
        <v-timeline-item small>
          <template>
            <span class="font-weight-bold">1985 - Present</span>
          </template>
          <div class="py-4">
            <h2>
              Senior Professor
            </h2>
            <div>
              NIMHANS, Bengaluru.
            </div>
          </div>
        </v-timeline-item>
      </v-timeline>

      <v-layout align-end justify-end>
        <v-btn color="red lighten-1" fab x-small dark>
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
      </v-layout>
    </v-alert>
  </div>
</template>
