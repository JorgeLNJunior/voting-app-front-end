<template>
  <v-main>
    <v-container fluid class="fill-height">
      <v-row align="center" justify="center">
        <v-col cols="12" md="6" sm="8" xs="10">
          <VoteCard v-if="apiCallEnded" :survey="surveys[0]" :userVotes="userVotes"></VoteCard>
          <v-skeleton-loader v-else type="card"></v-skeleton-loader>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>

import VoteCard from '../components/VoteCard'
import Survey from '../services/api/Survey'
import User from '../services/api/User'
import Decode from 'jwt-decode'

export default {
  name: 'Survey',
  components: {
    VoteCard
  },
  data: () => ({
    surveys: [],
    userVotes: [],
    apiCallEnded: false
  }),
  created () {
    const id = this.$route.params.id
    const token = localStorage.getItem('AUTH_TOKEN')

    const promises = []
    promises.push(Survey.getByID(id))

    if (token) {
      const userId = Decode(token).uid
      promises.push(User.getVotes(userId))
    }

    Promise.all(promises)
      .then((response) => {
        const surveysLength = response[0].data.surveys.length
        if (surveysLength <= 0) return this.$router.push('/404')

        this.surveys = response[0].data.surveys

        if (response[1]) this.userVotes = response[1].data.votes

        this.apiCallEnded = true
      })
      .catch((error) => {
        console.log(error)
        this.$router.push('/error')
      })
  }
}
</script>
