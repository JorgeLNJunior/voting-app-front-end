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
          <v-btn color="primary" block rounded
            @click="vote()" :disabled="disableBlockBtn || voted">
            Votar
          </v-btn>
          <v-btn icon class="mt-3" v-show="voted && !show" @click="show = true">
            <v-icon>expand_more</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-card-text>
    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>
        <v-card-text>
          <div class="text-center" @click="show = false">
            <v-btn icon>
              <v-icon>expand_less</v-icon>
            </v-btn>
          </div>
          <v-list-item v-for="option in sortedOptions" :key="option.id">
            <v-list-item-content id="scroll">
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
    show: false,
    disableBlockBtn: true,
    voted: false
  }),
  methods: {
    disableSelection (inputID) {
      this.options.forEach(option => {
        if (option.id !== inputID) {
          option.ableToSelect = !option.ableToSelect
          this.disableBlockBtn = !this.disableBlockBtn
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
      this.options.forEach(option => {
        option.ableToSelect = false
      })
      this.voted = true
    },

    async sortOptions () {
      this.sortedOptions = this.options.slice() // fazendo cópia sem referência
      await this.sortedOptions.sort((a, b) => { return b.votes - a.votes })
    }
  }
}
</script>
