<template>
  <div>
    <v-dialog width="600" origin="top" overlay-opacity="0.6">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" outlined v-bind="attrs" v-on="on">
          Criar
          <v-icon right>create</v-icon>
        </v-btn>
      </template>
      <SurveyCreateCard />
    </v-dialog>
  </div>
</template>

<script>

import SurveyCreateCard from './SurveyCreateCard'

export default {
  name: 'SurveyCreateDialog',
  components: {
    SurveyCreateCard
  },
  data: () => ({
    //
  })
}
</script>
