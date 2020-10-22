<template>
  <v-navigation-drawer bottom temporary v-model="$store.navigationDrawer" app>
      <v-list class="text-center">
        <v-list-item>
          <v-list-item-content>
            <h1>VotingApp</h1>
          </v-list-item-content>
        </v-list-item>
        <v-divider class="mb-2"/>
        <v-list-item v-if="!isLoged">
          <v-list-item-content>
            <RegisterDialog />
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="!isLoged">
          <v-list-item-content>
            <LoginDialog />
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="isLoged">
          <v-list-item-content>
            <SurveyCreateDialog />
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="isLoged">
          <v-list-item-content>
            <LogoutBtn />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
</template>

<script>

import RegisterDialog from './Auth/RegisterDialog'
import LoginDialog from './Auth/LoginDialog'
import LogoutBtn from './Auth/LogoutBtn'
import SurveyCreateDialog from './Survey/SurveyCreateDialog'

export default {
  name: 'NavigationDrawer',
  components: {
    RegisterDialog,
    LoginDialog,
    LogoutBtn,
    SurveyCreateDialog
  },
  data: () => ({
    isLoged: false
  }),
  created () {
    if (!localStorage.getItem('AUTH_TOKEN')) {
      this.isLoged = false
      return
    }
    this.isLoged = true
  }
}
</script>
