<template>
  <div>
    <v-dialog v-model="dialog" width="600">
      <!-- Auth warning dialog -->
      <v-card>
        <v-card-title class="justify-center">Autenticação</v-card-title>
        <v-divider></v-divider>
        <v-card-text class="text-center body-1 mt-2">
          Você precisa entrar com uma conta para poder votar.
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-card shaped elevation="6" class="mx-auto">
      <!-- Vote card -->
      <template v-if="survey.banner && survey.banner.length > 0">
        <v-img class="align-center" :src="survey.banner" height="70px"></v-img>
        <v-card-title class="justify-center">{{ survey.title }}</v-card-title>
        <p class="body-2 text-center">
          {{ survey.description }}
        </p>
      </template>
      <template v-else>
        <v-card-title class="justify-center primary">{{ survey.title }}</v-card-title>
        <p class="body-2 mt-4 text-center">
          {{ survey.description }}
        </p>
      </template>
      <v-card-text class="text-center">
        <v-snackbar shaped top v-model="error" timeout="3000" app>
          Desculpe, ocorreu um erro...
        </v-snackbar>
        <v-row justify="center" align="center">
          <v-col cols="4">
            <v-switch class="ml-8" v-for="option in survey.options" :key="option.id" :label="option.name" v-model="option.selected" :disabled="!option.ableToSelect" v-on:change="disableOptionsController(option.id)" hide-details>
            </v-switch>
          </v-col>
        </v-row>
        <v-row align="center" justify="center">
          <v-col cols="4">
            <p>{{ bottomMsg }}</p>
            <v-btn color="primary" block rounded @click="vote()" :disabled="disableBlockBtn || voted" :loading="btnLoading">
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
  </div>
</template>

<script>

import Survey from '../services/api/Survey'

export default {
  name: 'VoteCard',
  data: () => ({
    sortedOptions: [],
    show: false,
    disableBlockBtn: true,
    btnLoading: false,
    voted: false,
    error: false,
    dialog: false,
    bottomMsg: 'Selecione somente uma opção'
  }),
  props: {
    survey: Object,
    userVotes: Array
  },
  created () {
    this.survey.options.forEach(option => {
      option.selected = false
      option.ableToSelect = true
    })
    if (this.userVotes.length > 0) {
      this.userVotes.forEach(vote => {
        if (vote.survey_id == this.survey.id) { // eslint-disable-line
          this.voted = true
          this.sortOptions()
          this.bottomMsg = 'Você já votou nesta enquete'
          this.survey.options.forEach(option => {
          if (vote.option_id == option.id) option.selected = true // eslint-disable-line
            option.ableToSelect = false
          })
        }
      })
    }
  },
  methods: {

    disableOptionsController (inputID) {
      this.survey.options.forEach(option => {
        if (option.id === inputID) {
          if (option.selected) {
            this.survey.options.forEach(o => {
              if (o.id !== inputID) {
                o.ableToSelect = false
                this.disableBlockBtn = false
              }
            })
          } else {
            this.survey.options.forEach(o => {
              if (o.id !== inputID) {
                o.ableToSelect = true
                this.disableBlockBtn = true
              }
            })
          }
        }
      })
    },

    disableAllOptions () {
      this.survey.options.forEach(option => {
        option.ableToSelect = false
      })
    },

    addVoteToSelectedOption () {
      this.survey.options.forEach(option => {
        if (option.selected) {
          option.votes++
        }
      })
    },

    getSelectedOption () {
      for (var option of this.survey.options) {
        if (option.selected) {
          return option
        }
      }
    },

    async vote () {
      if (!localStorage.getItem('AUTH_TOKEN')) {
        this.dialog = true
        return
      }
      this.btnLoading = true
      this.addVoteToSelectedOption()
      await this.sortOptions()
      this.disableAllOptions()
      const selectedOption = this.getSelectedOption()
      try {
        await Survey.vote(this.survey.id, selectedOption.id)
        this.show = true
        this.voted = true
      } catch (error) {
        this.error = true
        console.log(error)
      }
      this.btnLoading = false
    },

    async sortOptions () {
      this.sortedOptions = this.survey.options.slice() // fazendo cópia sem referência
      await this.sortedOptions.sort((a, b) => { return b.votes - a.votes })
    }
  }
}
</script>
