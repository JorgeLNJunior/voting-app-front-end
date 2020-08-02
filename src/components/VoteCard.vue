<template>
  <v-card shaped>
    <v-card-title class="justify-center primary">Front-end framework</v-card-title>
    <v-card-text class="text-center">
      <p class="body-2 mt-4">
        Enquete para saber a preferência de framework front-end
        por parte dos desenvolvedores.
      </p>
      <v-row justify="center" align="center">
        <v-col cols="4"></v-col> <!--Coluna gambiarra-->
        <v-col cols="4" md="2" sm="2" xm="2">
          <v-switch v-for="option in options" :key="option.id" :label="option.name"
            v-model="option.selected" :readonly="!option.ableToSelect"
            v-on:change="disableSelection(option.id)" hide-details>
          </v-switch>
        </v-col>
        <v-col cols="4"></v-col> <!--Coluna gambiarra-->
        <v-col cols="12" md="5" sm="7" xm="9">
          <p>Selecione somente uma opção</p>
          <v-btn color="primary" block rounded @click="vote()">Votar</v-btn>
        </v-col>
      </v-row>
    </v-card-text>
    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>
        <v-card-text>
          <v-list-item v-for="option in sortedOptions" :key="option.id">
            <v-list-item-content>
              <v-list-item-title>{{ option.name }}</v-list-item-title>
              <v-list-item-subtitle>{{ option.votes }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-card-text>
      </div>
    </v-expand-transition>
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
    ],
    sortedOptions: [],
    show: false
  }),
  methods: {
    disableSelection (inputID) {
      this.options.forEach(option => {
        if (option.id !== inputID) {
          option.ableToSelect = !option.ableToSelect
        }
      })
    },

    async vote () {
      this.options.forEach(option => {
        if (option.selected) {
          option.votes++
        }
      })
      await this.sortOptions()
      this.show = true
    },

    async sortOptions () {
      this.sortedOptions = await this.options.sort((a, b) => { return b.votes - a.votes })
    }
  }
}
</script>
