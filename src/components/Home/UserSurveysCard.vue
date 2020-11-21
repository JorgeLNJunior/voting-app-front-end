<template>
  <div>
    <v-card v-if="states.userSurveysCallEnded" elevation="5" class="mx-auto scroll" height="600" shaped>
      <v-card-title class="justify-center primary">Suas enquetes</v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-list v-if="userSurveys.length > 0">
          <v-list-group v-for="(s, i) in userSurveys" :key="s.id" no-action prepend-icon="description">
            <template v-slot:activator>
              <v-list-item-content class="justify-center">
                <v-list-item-title>{{ (i + 1) + ' - ' + s.title }}</v-list-item-title>
              </v-list-item-content>
            </template>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-subtitle>{{ s.description.slice(0, 50) + '...' }}</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <v-list-item-action-text></v-list-item-action-text>
                <v-row>
                    <v-btn color="primary mr-2" small :to="{ name: 'SurveyShow', params: { id: s.id} }" target="_blank">
                      Ver
                      <v-icon right>visibility</v-icon>
                    </v-btn>
                  <SurveyUpdateDialog :surveyId="s.id" />
                  <v-btn color="error" @click="deleteSurvey(s.id)" :loading="states.deleteBtnLoad" small>
                    Excluir
                    <v-icon right>delete</v-icon>
                  </v-btn>
                </v-row>
              </v-list-item-action>
            </v-list-item>
          </v-list-group>
        </v-list>
        <p v-else class="text-center subtitle-1">Nenhuma enquete criada...</p>
      </v-card-text>
    </v-card>
    <v-skeleton-loader v-else type="card" height="200"></v-skeleton-loader>
  </div>
</template>

<script>

import Survey from '../../services/api/Survey'
import Decode from 'jwt-decode'

import SurveyUpdateDialog from '../Survey/SurveyUpdateDialog'

export default {
  name: 'UserSurveysCard',
  components: {
    SurveyUpdateDialog
  },
  data: () => ({
    surveys: [],
    apiCallEnded: false,
    userSurveys: [],
    states: {
      userSurveysCallEnded: false,
      deleteBtnLoad: false,
      updateBtnLoad: false
    }
  }),
  created () {
    Survey.getUserSurveys(this.decodeAuthToken().uid)
      .then((response) => {
        this.userSurveys = response.data.surveys
        this.states.userSurveysCallEnded = true
      })
      .catch((error) => {
        this.$router.push('/error')
        console.log(error)
      })
  },
  methods: {
    goToSurveyPage (surveyId) {
      this.$router.push(`/survey/${surveyId}`)
    },

    decodeAuthToken () {
      const token = localStorage.getItem('AUTH_TOKEN')
      const decoded = Decode(token)
      return decoded
    },

    deleteSurvey (id) {
      this.states.deleteBtnLoad = true
      Survey.delete(id)
        .then((response) => {
          this.$router.go(0)
        })
        .catch((error) => {
          console.log(error)
        })
        .finally(() => {
          this.states.deleteBtnLoad = false
        })
    }
  }
}
</script>

<style>
.scroll {
  overflow-y: scroll;
}
</style>
