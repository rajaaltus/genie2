<template>
  <v-list>
    <v-subheader>Activities</v-subheader>
    <v-list-item-group v-model="item" color="success">
      <v-list-item
        v-for="(item, i) in $store.state.activities"
        :key="i"
        :to="item.path"
      >
        <v-list-item-icon>
          <v-icon v-text="item.icon"></v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title v-text="item.title"></v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list-item-group>
  </v-list>
</template>
