<template>
  <v-navigation-drawer bottom temporary v-model="$store.navigationDrawer" app>
      <v-list class="text-center">
        <v-list-item>
          <v-list-item-content>
            <h1>VotingApp</h1>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <RegisterDialog />
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <LoginDialog />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
</template>

<script>

import RegisterDialog from './Auth/RegisterDialog'
import LoginDialog from './Auth/LoginDialog'

export default {
  name: 'NavigationDrawer',
  components: {
    RegisterDialog,
    LoginDialog
  }
}
</script>
