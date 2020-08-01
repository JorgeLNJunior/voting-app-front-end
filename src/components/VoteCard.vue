<template>
  <v-card shaped>
    <v-card-title class="justify-center primary">Front-end framework</v-card-title>
      <v-card-text class="text-center mt-6">
        Enquete para saber a preferência de framework front-end
        por parte dos desenvolvedores
      </v-card-text>
    <v-card-actions></v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'VoteCard',
  data: () => ({
    options: ['Angular', 'React', 'Vue', 'Outro']
  })
}
</script>
