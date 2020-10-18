<template>
  <v-card>
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
    createSurvey () {
      if (!this.$refs.form.validate()) {
        return false
      }
      this.states.submitBtnLoad = true
      Survey.create(this.survey)
        .then((response) => {
          console.log(response.data)

          this.states.snackBarMsg = 'Pesquisa criada com sucesso'
          this.states.snackBar = true

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
