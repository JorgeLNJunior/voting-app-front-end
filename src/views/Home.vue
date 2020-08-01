<template>
  <v-content>
    <v-container fluid class="fill-height">
      <v-row align="center" justify="center">
        <v-col cols="6">
          <VoteCard></VoteCard>
        </v-col>
      </v-row>
    </v-container>
  </v-content>
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
