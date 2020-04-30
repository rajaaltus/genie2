<template>
<div>
  <ClientOnly>
    <tiptap-vuetify v-model="content" :extensions="extensions" @next="handleNext" />
    <template #placeholder>
      Loading...
    </template>
  </ClientOnly>
  <div class="my-8">
  {{content}}
  </div>
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
  History
} from 'tiptap-vuetify'

export default {
  props: ['content'],
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
            levels: [1, 2, 3]
          }
        }
      ],
      Bold,
      Link,
      Code,
      HorizontalRule,
      Paragraph,
      HardBreak
    ],
    
    }
  },
  methods: {
    handleNext() {
      console.log('Data to Save: '+ this.content);
    }
  }
    
 
}
</script>
