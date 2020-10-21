<template>
  <div>
    <v-card v-if="states.userSurveysCallEnded" elevation="5" class="mx-auto scroll" height="450" shaped>
      <v-card-title class="justify-center primary">Suas enquetes</v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-list v-if="userSurveys.length > 0">
          <v-list-group v-for="(s, i) in userSurveys.slice(0, 15)" :key="s.id" no-action prepend-icon="description">
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
                <router-link :to="{ name: 'SurveyShow', params: { id: s.id} }" target="_blank">
                  <v-btn color="primary">Ver</v-btn>
                </router-link>
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

export default {
  name: 'UserSurveysCard',
  data: () => ({
    surveys: [],
    apiCallEnded: false,
    userSurveys: [],
    states: {
      userSurveysCallEnded: false
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
    }
  }
}
</script>

<style>
.scroll {
  overflow-y: scroll;
}
</style>
