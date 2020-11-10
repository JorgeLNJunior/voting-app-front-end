<template>
  <div>
    <v-dialog width="600" origin="top" overlay-opacity="0.6">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="secondary mr-2" small :loading="states.updateBtnLoad" v-bind="attrs" v-on="on">
          Editar
          <v-icon right>create</v-icon>
        </v-btn>
      </template>
      <SurveyUpdateCard v-if="states.apiCallEnded" :survey="survey"/>
      <v-card v-else>
        <v-skeleton-loader type="card" />
      </v-card>
    </v-dialog>
  </div>
</template>

<script>

import SurveyUpdateCard from './SurveyUpdateCard'
import Survey from '../../services/api/Survey'

export default {
  name: 'SurveyUpdateDialog',
  components: {
    SurveyUpdateCard
  },
  props: {
    surveyId: Number
  },
  data: () => ({
    survey: { },
    states: {
      updateBtnLoad: false,
      apiCallEnded: false
    }
  }),
  created () {
    this.updateBtnLoad = true
    Survey.getByID(this.surveyId)
      .then((response) => {
        this.survey = response.data.surveys[0]
        this.states.apiCallEnded = true
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => {
        this.states.updateBtnLoad = false
      })
  }
}
</script>
