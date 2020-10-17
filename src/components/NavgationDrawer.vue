<template>
  <v-navigation-drawer bottom temporary v-model="$store.navigationDrawer" app>
      <v-list>
        <v-list-item>
          <v-list-item-content>
            <h1 class="text-center">VotingApp</h1>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content class="text-center">
            <RegisterDialog></RegisterDialog>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
</template>

<script>

import RegisterDialog from './Auth/RegisterDialog'

export default {
  name: 'NavigationDrawer',
  components: {
    RegisterDialog
  }
}
</script>
