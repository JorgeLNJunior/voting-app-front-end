<template>
  <v-main>
    <v-container fluid class="fill-height">
      <v-row align="center" justify="center">
        <v-col cols="12" md="6" sm="8" xs="10">
          <VoteCard v-if="apiCallEnded" :survey="surveys[0]"></VoteCard>
          <v-skeleton-loader v-else type="card"></v-skeleton-loader>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>

import VoteCard from '../components/VoteCard'
import Survey from '../services/api/Survey'

export default {
  name: 'Survey',
  components: {
    VoteCard
  },
  data: () => ({
    surveys: [],
    apiCallEnded: false
  }),
  created () {
    const id = this.$route.params.id
    Survey.getByID(id)
      .then((response) => {
        this.surveys = response.data.surveys
        this.apiCallEnded = true
      })
      .catch((error) => {
        console.log(error)
        if (error.response.data.error === 'survey not found') {
          return this.$router.push('/404')
        }
        this.$router.push('/error')
      })
  }
}
</script>
