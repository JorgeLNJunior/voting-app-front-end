<template>
  <v-hover v-slot="{ hover }" open-delay="200">
    <v-card v-if="states.randomSurveysCallEnded" shaped :elevation="hover ? 12 : 5" class="mx-auto">
      <v-card-text>
        <v-carousel show-arrows cycle continuous height="150">
          <v-carousel-item style="cursor: pointer" @click="goToSurveyPage(s.id)" v-for="s in randomSurveys" :key="s.id" :src="s.banner">
            <p class="title text-center font-weight-medium">{{ s.title }}</p>
          </v-carousel-item>
        </v-carousel>
      </v-card-text>
    </v-card>
    <v-skeleton-loader v-else type="card" height="150"></v-skeleton-loader>
  </v-hover>
</template>

<script>

import Survey from '../../services/api/Survey'

export default {
  name: 'RandomSurveysCard',
  data: () => ({
    randomSurveys: [],
    states: {
      randomSurveysCallEnded: false
    }
  }),
  created () {
    Survey.get()
      .then(async (response) => {
        this.randomSurveys = response.data.surveys.slice(0, 5) || response.data.surveys
        this.states.randomSurveysCallEnded = true
      })
      .catch((error) => {
        this.$router.push('/error')
        console.log(error)
      })
  },
  methods: {
    goToSurveyPage (surveyId) {
      this.$router.push(`/survey/${surveyId}`)
    }
  }
}
</script>

<style>
</style>
