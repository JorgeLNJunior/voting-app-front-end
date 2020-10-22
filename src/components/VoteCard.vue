<template>
  <div>
    <v-dialog v-model="dialog" width="600">
      <v-card>
        <v-card-title class="justify-center">Autenticação</v-card-title>
        <v-divider></v-divider>
        <v-card-text class="text-center body-1 mt-2">
          Você precisa entrar com uma conta para poder votar.
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-card shaped elevation="6">
      <v-card-title class="justify-center primary">{{ survey.title }}</v-card-title>
      <v-card-text class="text-center">
        <v-snackbar shaped top v-model="error" timeout="3000">
          Desculpe, ocorreu um erro...
        </v-snackbar>
        <p class="body-2 mt-4">
          {{ survey.description }}
        </p>
        <v-row justify="center" align="center">
          <v-col cols="4"></v-col> <!--Coluna gambiarra-->
          <v-col cols="4" md="2" sm="2" xm="2">
            <v-switch v-for="option in survey.options" :key="option.id" :label="option.name"
              v-model="option.selected" :disabled="!option.ableToSelect"
              v-on:change="disableSelection(option.id)" hide-details>
            </v-switch>
          </v-col>
          <v-col cols="4"></v-col> <!--Coluna gambiarra-->
          <v-col cols="12" md="5" sm="7" xm="9">
            <p>Selecione somente uma opção</p>
            <v-btn color="primary" block rounded
              @click="vote()" :disabled="disableBlockBtn || voted" :loading="btnLoading">
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
    dialog: false
  }),
  props: {
    survey: Object
  },
  created () {
    this.survey.options.forEach(option => {
      option.selected = false
      option.ableToSelect = true
    })
  },
  methods: {
    disableSelection (inputID) {
      this.survey.options.forEach(option => {
        if (option.id !== inputID) {
          option.ableToSelect = false
          this.disableBlockBtn = false
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
