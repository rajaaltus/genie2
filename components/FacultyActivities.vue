<template>
  <v-list color="#f2f2f2">
    <v-list-item-group color="success">
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
<style scoped>
.disp
{
  font-size: 15px;
  font-weight: normal;
}
</style>
