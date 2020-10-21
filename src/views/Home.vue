<template>
  <v-main>
    <v-container fluid class="fill-height">
      <v-col cols="6">
        <v-row align="center" justify="center">
          <v-col cols="12">
            <UserSurveysCard />
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="6">
        <v-row justify="center" align="center">
          <v-col cols="12">
            <h1>Direita cima</h1>
          </v-col>
        </v-row>
        <v-row justify="center" align="center">
          <v-col cols="12">
            <RamdomSurveysCard />
          </v-col>
        </v-row>
      </v-col>
    </v-container>
  </v-main>
</template>

<script>

import RamdomSurveysCard from '../components/Home/RandomSurveysCard'
import UserSurveysCard from '../components/Home/UserSurveysCard'

export default {
  name: 'Home',
  components: {
    RamdomSurveysCard,
    UserSurveysCard
  },
  data: () => ({
    //
  })
}
</script>
