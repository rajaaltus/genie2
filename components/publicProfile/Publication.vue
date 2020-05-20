<template>
  <v-alert
    tile
    elevation="0"
    border="left"
    color="light-green lighten-1"
    colored-border
    icon="mdi-bookshelf"
  >
    <h2 class="font-weight-bold">Publications</h2>
    <span class="display-2 font-weight-bold"
      >{{ publicationsData.length }}
    </span>

    <v-tooltip top color="black">
      <template v-slot:activator="{ on }">
        <v-btn tile x-small color="green darken-3" v-on="on" class="mb-4">{{
          journalArticles
        }}</v-btn>
      </template>
      <span>Journal Articles</span>
    </v-tooltip>
    <v-tooltip top color="black">
      <template v-slot:activator="{ on }">
        <v-btn tile x-small color="green darken-2" v-on="on" class="mb-4">{{
          articles
        }}</v-btn>
      </template>
      <span>Articles for Professionals in Souvenirs, Newsletters, etc..</span>
    </v-tooltip>

    <v-tooltip top color="black">
      <template v-slot:activator="{ on }">
        <v-btn tile x-small color="green darken-1" v-on="on" class="mb-4">{{
          books
        }}</v-btn>
      </template>
      <span>Books</span>
    </v-tooltip>

    <v-tooltip top color="black">
      <template v-slot:activator="{ on }">
        <v-btn tile x-small color="green lighten-1" v-on="on" class="mb-4">{{
          bookChapters
        }}</v-btn>
      </template>
      <span>Book Chapters</span>
    </v-tooltip>

    <v-tooltip top color="black">
      <template v-slot:activator="{ on }">
        <v-btn tile x-small color="green lighten-2" v-on="on" class="mb-4">{{
          monoGraphs
        }}</v-btn>
      </template>
      <span>Monographs</span>
    </v-tooltip>

    <v-tooltip top color="black">
      <template v-slot:activator="{ on }">
        <v-btn tile x-small color="green lighten-3" v-on="on" class="mb-4">{{
          manuals
        }}</v-btn>
      </template>
      <span>Manuals</span>
    </v-tooltip>

    <v-tooltip top color="black">
      <template v-slot:activator="{ on }">
        <v-btn tile x-small color="green lighten-4" v-on="on" class="mb-4">{{
          reports
        }}</v-btn>
      </template>
      <span>Reports</span>
    </v-tooltip>

    <v-tooltip top color="black">
      <template v-slot:activator="{ on }">
        <v-btn tile x-small color="green lighten-5" v-on="on" class="mb-4">{{
          general
        }}</v-btn>
      </template>
      <span>Articles for General Public / IEC Materials</span>
    </v-tooltip>
  </v-alert>
</template>

<script>
export default {
  props: [
    "publicationsData",
    "journalArticles",
    "articles",
    "books",
    "bookChapters",
    "monoGraphs",
    "manuals",
    "reports",
    "general"
  ],
};
</script>
