<template>
  <div>
    <LoginCard v-if="states.registerFinished" />
    <v-card shaped v-else>
      <v-snackbar v-model="states.snackBar" shaped timeout="5000" top elevation="10">{{ states.snackBarMsg }}</v-snackbar>
      <v-card-title>Criar Conta</v-card-title>
      <v-card-text>
        <v-row no-gutters justify="center">
          <v-col cols="md-6">
            <v-form ref="form" lazy-validation v-model="states.formIsValid">
              <v-text-field label="Nome" prepend-icon="account_box" v-model="user.name" :rules="[rules.name.required, rules.name.max]">
              </v-text-field>
              <v-text-field label="Email" prepend-icon="email" type="email" v-model="user.email" :rules="[rules.email.required, rules.email.max, rules.email.email]">
              </v-text-field>
              <v-text-field label="Senha" prepend-icon="lock" type="password" v-model="user.password" :rules="[rules.password.required, rules.password.min, rules.password.max]">
              </v-text-field>
            </v-form>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-row justify="center" no-gutters>
          <v-col class="text-center">
            <v-btn class="mb-5" color="primary" right @click="register()" :loading="states.registerBtnLoad" :disabled="!states.formIsValid">Criar Conta</v-btn>
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import Auth from '../../services/api/Auth'
import LoginCard from './LoginCard'

export default {
  name: 'RegisterCard',
  components: {
    LoginCard
  },
  data: () => ({
    user: {
      name: '',
      email: '',
      password: ''
    },
    states: {
      registerBtnLoad: false,
      formIsValid: true,
      snackBar: false,
      snackBarMsg: '',
      registerFinished: false
    },
    rules: {
      name: {
        required: (value) => !!value || 'Obrigatório',
        max: (value) =>
          value.length <= 50 || 'Deve ter no máximo de 40 caracteres'
      },
      email: {
        required: (value) => !!value || 'Obrigatório',
        max: (value) =>
          value.length <= 50 || 'Deve ter no máximo de 50 caracteres',
        email: (value) => {
          const patern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return patern.test(value) || 'Email inválido'
        }
      },
      password: {
        required: (value) => !!value || 'Obrigatório',
        min: (value) => value.length >= 6 || 'Deve ter no mínimo 6 caracteres',
        max: (value) =>
          value.length <= 20 || 'Deve ter no máximo 20 caracteres'
      }
    }
  }),
  methods: {
    register () {
      if (!this.$refs.form.validate()) {
        return false
      }
      this.states.registerBtnLoad = true
      Auth.register(this.user)
        .then((response) => {
          this.states.snackBarMsg = 'Conta criada com sucesso'
          this.states.snackBar = true
          this.states.registerFinished = true
        })
        .catch((error) => {
          console.log(error)
          this.states.snackBarMsg = `Erro: ${error.response.message}`
        })
        .finally(() => {
          this.states.registerBtnLoad = false
        })
    }
  }
}
</script>

<style>
</style>
