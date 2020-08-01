<template>
  <v-card shaped>
    <v-card-title class="justify-center primary">Front-end framework</v-card-title>
      <v-card-text class="text-center">
        <p class="body-2 mt-4">
          Enquete para saber a preferência de framework front-end
          por parte dos desenvolvedores
        </p>
        <v-row justify="center">
          <v-col cols="12" md="4">
            <v-switch v-for="option in options" :key="option.id" :label="option.name"
              v-model="option.selected" :readonly="!option.ableToSelect"
              v-on:change="disableSelection(option.id)" hide-details>
            </v-switch>
          </v-col>
        </v-row>
      </v-card-text>
    <v-card-actions></v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'VoteCard',
  data: () => ({
    options: [
      { id: 1, name: 'Angular', votes: 0, selected: false, ableToSelect: true },
      { id: 2, name: 'React', votes: 0, selected: false, ableToSelect: true },
      { id: 3, name: 'Vue', votes: 0, selected: false, ableToSelect: true },
      { id: 4, name: 'Outro', votes: 0, selected: false, ableToSelect: true }
    ]
  }),
  methods: {
    disableSelection (inputID) {
      this.options.forEach(option => {
        if (option.id !== inputID) {
          option.ableToSelect = !option.ableToSelect
        }
      })
    }
  }
}
</script>
