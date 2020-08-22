<template>
  <v-main>
    <v-container fluid class="fill-height">
      <v-row align="center" justify="center">
        <v-col cols="12" md="6" sm="8" xs="10">
          <VoteCard v-if="apiCallEnded" :survey="survey"></VoteCard>
          <v-skeleton-loader v-else type="card"></v-skeleton-loader>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>

import VoteCard from '../components/VoteCard'
import SurveyService from '../services/SurveyService'

export default {
  name: 'Home',
  components: {
    VoteCard
  },
  data: () => ({
    survey: {},
    apiCallEnded: false
  }),
  beforeMount () {
    SurveyService.getByID(1)
      .then((response) => {
        this.survey = response.data.survey
        this.apiCallEnded = true
      })
      .catch((error) => {
        this.$router.push('/error')
        console.log(error)
      })
  },
  methods: {

  }
}
</script>
