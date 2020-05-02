<template>
  <div>
    <ClientOnly>
      <tiptap-vuetify v-model="content" :extensions="extensions" :native-extensions="nativeExtensions"/>
      <template #placeholder>
        Loading...
      </template>
    </ClientOnly>
  </div>
</template>

<script>
import {
  TiptapVuetify,
  Heading,
  Bold,
  Italic,
  Strike,
  Underline,
  Code,
  Paragraph,
  BulletList,
  OrderedList,
  ListItem,
  Link,
  Blockquote,
  HardBreak,
  HorizontalRule,
  History,
} from "tiptap-vuetify";
import { Table, TableHeader, TableCell, TableRow } from "tiptap-extensions";
export default {
  props: ["content"],
  components: { TiptapVuetify },
  data() {
    return {
      extensions: [
        History,
        Blockquote,
        Link,
        Underline,
        Strike,
        Italic,
        ListItem,
        BulletList,
        OrderedList,
        [
          Heading,
          {
            options: {
              levels: [1, 2, 3],
            },
          },
        ],
        Bold,
        Link,
        Code,
        HorizontalRule,
        Paragraph,
        HardBreak,
      ],
      nativeExtensions: [
        new Table({
          resizable: true,
        }),
        new TableHeader(),
        new TableCell(),
        new TableRow(),
      ],
    };
  },
  methods: {
    beforeDestroy() {
			this.editor.destroy()
		},
  }
};
</script>
