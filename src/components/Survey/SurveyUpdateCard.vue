<template>
  <div>
    <v-card v-if="states.destroyCard" shaped>
      <!-- Survey Url Card -->
      <v-card-title class="justify-center">Sucesso</v-card-title>
      <v-card-text>
        <v-row justify="center" no-gutters>
          <v-col class="text-center">
            <span>Enquete atualizada com sucesso</span>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-row justify="center" no-gutters>
          <v-btn class="primary mb-3" @click="$router.go(0)">OK</v-btn>
        </v-row>
      </v-card-actions>
    </v-card>
    <v-card v-if="!states.destroyCard" shaped>
      <!-- Survey Update Card -->
      <v-snackbar v-model="states.snackBar.active" shaped timeout="5000" top elevation="10" app>{{ states.snackBar.msg }}</v-snackbar>
      <v-card-title class="justify-center">Editar Enquete</v-card-title>
      <v-card-text>
        <v-form ref="form" lazy-validation v-model="states.formIsValid">
          <v-row justify="center" no-gutters>
            <v-col cols="md-8">
              <v-text-field label="Título" prepend-icon="title" v-model="updateForm.title" :rules="[rules.title.required, rules.title.max]"></v-text-field>
              <v-text-field label="Descrição" prepend-icon="description" v-model="updateForm.description" :rules="[rules.description.required, rules.description.max]">
              </v-text-field>
              <v-file-input v-model="banner" accept="image/png, image/jpeg, image/jpg" :rules="[rules.banner.max]" show-size label="Banner" prepend-icon="add_photo_alternate"></v-file-input>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-card-actions class="justify-center">
        <v-btn class="mb-5" color="primary" @click="updateSurvey()" :loading="states.submitBtnLoad" :disabled="!states.formIsValid">
          Editar
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import Survey from '../../services/api/Survey'

export default {
  name: 'SurveyUpdateCard',
  props: {
    survey: Object
  },
  data: () => ({
    banner: undefined,
    updateForm: {},
    states: {
      formIsValid: true,
      submitBtnLoad: false,
      snackBar: {
        active: false,
        msg: ''
      },
      destroyCard: false
    },
    rules: {
      title: {
        required: (value) => !!value || 'Obrigatório',
        max: (value) =>
          value.length <= 50 || 'Deve ter no máximo 50 caracteres'
      },
      description: {
        required: (value) => !!value || 'Obrigatório',
        max: (value) =>
          value.length <= 150 || 'Deve ter no máximo 150 caracteres'
      },
      banner: {
        max: (value) =>
          !value || value.size <= 2000000 || 'Deve ter no máximo 2MB'
      }
    }
  }),
  created () {
    this.updateForm = {
      title: this.survey.title,
      description: this.survey.description
    }
  },
  methods: {
    getSurveyUrl () {
      const DEV_URL = 'http://localhost:8080'
      const PROD_URL = 'https://api-voting-app.herokuapp.com'
      const APP_URL =
        process.env.NODE_ENV === 'production' ? PROD_URL : DEV_URL

      return `${APP_URL}/survey/${this.survey.id}`
    },
    updateSurvey () {
      if (!this.$refs.form.validate()) {
        return false
      }
      this.states.submitBtnLoad = true

      const promises = []
      promises.push(Survey.update(this.survey.id, this.updateForm))
      if (this.banner) promises.push(Survey.uploadBanner(this.survey.id, this.banner))

      Promise.all(promises)
        .then((response) => {
          this.states.snackBar.msg = 'Enquete atualizada com sucesso'
          this.states.snackBar.active = true
          this.states.destroyCard = true
        })
        .catch((error) => {
          console.log(error)
          this.snackBarMsg = 'Desculpe, ocorreu um erro'
          this.snackBar = true
        })
        .finally(() => {
          this.states.submitBtnLoad = false
        })
    }
  }
}
</script>
