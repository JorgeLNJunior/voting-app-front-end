<template>
  <v-main>
    <v-container fluid class="fill-height">
      <v-row align="center" justify="center" v-if="userIsLoggedIn()">
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
      </v-row>
      <v-row v-else align="center" justify="center">
        <v-col cols="8" class="text-center">
          <h1 class="mb-6">Entre com uma conta para ver suas informações aqui!</h1>
          <RamdomSurveysCard />
        </v-col>
      </v-row>
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
  }),
  methods: {
    userIsLoggedIn () {
      if (!localStorage.getItem('AUTH_TOKEN')) {
        return false
      }
      return true
    }
  }
}
</script>
