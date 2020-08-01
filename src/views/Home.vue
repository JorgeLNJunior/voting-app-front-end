<template>
  <v-main>
    <v-container fluid class="fill-height">
      <v-row align="center" justify="center">
        <v-col cols="12" md="6" sm="8" xs="10">
          <VoteCard></VoteCard>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>

import VoteCard from '../components/VoteCard'

export default {
  name: 'Home',
  components: {
    VoteCard
  }
}
</script>
