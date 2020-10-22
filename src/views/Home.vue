<template>
  <v-main>
    <v-container fluid class="fill-height">
      <v-row align="start" justify="center" v-if="userIsLoggedIn()"> <!-- authenticated user -->
        <v-col cols="6">
          <v-row align="center" justify="center">
            <v-col>
              <UserSurveysCard />
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="6">
          <v-row justify="center" align="center">
            <v-col cols="12">
              <RamdomSurveysCard />
            </v-col>
          </v-row>
          <v-row justify="center" align="center">
            <v-col cols="12">
              <UserCard />
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-row v-else align="center" justify="center"> <!-- unauthenticated user -->
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
import UserCard from '../components/Home/UserCard'

export default {
  name: 'Home',
  components: {
    RamdomSurveysCard,
    UserSurveysCard,
    UserCard
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
