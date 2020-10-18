<template>
  <div>
    <v-card v-if="states.destroyCard"> <!-- Survey Url Card -->
      <v-card-title class="justify-center">Compartilhar</v-card-title>
      <v-card-text>
        <v-row justify="center" no-gutters>
          <v-col cols="md-6">
            <v-text-field label="Link" :value="getSurveyUrl()" hint="Copiado"
              append-icon="content_copy" @click:append="copyUrl()" @click="copyUrl()">
            </v-text-field>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <v-card v-if="!states.destroyCard"> <!-- Survey Create Card -->
      <v-snackbar v-model="states.snackBar" shaped timeout="5000" top elevation="10">{{ states.snackBarMsg }}</v-snackbar>
      <v-card-title class="justify-center">Nova Pesquisa</v-card-title>
      <v-card-text>
        <v-form ref="form" lazy-validation v-model="states.formIsValid">
          <v-row justify="center" no-gutters>
            <v-col cols="md-8">
              <v-text-field label="Título" prepend-icon="title" v-model="survey.title" :rules="[rules.title.required, rules.title.max]"></v-text-field>
              <v-text-field label="Descrição" prepend-icon="description" v-model="survey.description" :rules="[rules.description.required, rules.description.max]">
              </v-text-field>
              <v-text-field v-model.trim="insertOption.name" label="Opções" prepend-icon="rule" append-icon="add" @click:append="pushOption()" v-on:keyup.enter="pushOption()" :rules="[rules.options.max]">
              </v-text-field>
              <v-chip-group v-if="survey.options.length > 0">
                <v-chip v-for="(option, index) in survey.options" color="primary" :key="index" close @click:close="survey.options.splice(index, 1)" outlined>
                  <v-icon left>label</v-icon>
                  {{ option.name }}
                </v-chip>
              </v-chip-group>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-card-actions class="justify-center">
        <v-btn class="mb-5" color="primary" @click="createSurvey()" :loading="states.submitBtnLoad" :disabled="!states.formIsValid || survey.options.length <= 0">
          Criar
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import Survey from '../../services/api/Survey'

export default {
  name: 'SurveyCreateDialog',
  data: () => ({
    survey: {
      title: '',
      description: '',
      options: []
    },
    insertOption: {
      name: ''
    },
    responseData: { },
    states: {
      formIsValid: true,
      submitBtnLoad: false,
      snackBar: false,
      snackBarMsg: '',
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
      options: {
        max: (value) =>
          value.length <= 30 || 'Deve ter no máximo 30 caracteres'
      }
    }
  }),
  methods: {
    pushOption () {
      const option = { name: this.insertOption.name }
      this.survey.options.push(option)
      this.insertOption.name = ''
    },
    getSurveyUrl () {
      const DEV_URL = 'http://localhost:8080'
      const PROD_URL = 'https://api-voting-app.herokuapp.com'
      const APP_URL = process.env.NODE_ENV === 'production' ? PROD_URL : DEV_URL

      return `${APP_URL}/survey/${this.responseData.survey.id}`
    },
    copyUrl () {
      navigator.clipboard.writeText(this.getSurveyUrl())
    },
    createSurvey () {
      if (!this.$refs.form.validate()) {
        return false
      }
      this.states.submitBtnLoad = true
      Survey.create(this.survey)
        .then((response) => {
          console.log(response.data)
          this.responseData = response.data

          this.states.snackBarMsg = 'Pesquisa criada com sucesso'
          this.states.snackBar = true

          this.states.destroyCard = true

          this.survey.title = ''
          this.survey.description = ''
          this.survey.options = []
        })
        .catch((error) => {
          console.log(error)
          this.snackBarMsg = 'Ocorreu um erro'
          this.snackBar = true
        })
        .finally(() => {
          this.states.submitBtnLoad = false
        })
    }
  }
}
</script>
