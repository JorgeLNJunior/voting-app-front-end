<template>
  <v-card shaped>
    <v-snackbar v-model="states.snackBar" shaped timeout="5000" top elevation="10">{{ states.snackBarMsg }}</v-snackbar>
    <v-card-title>Entrar</v-card-title>
    <v-card-text>
      <v-row no-gutters justify="center">
        <v-col cols="md-6">
          <v-form ref="form" lazy-validation v-model="states.formIsValid">
            <v-text-field label="Email" type="email" prepend-icon="email" v-model="user.email"
              :rules="[rules.email.isEmail, rules.email.required, rules.email.max]">
            </v-text-field>
            <v-text-field label="Senha" type="password" prepend-icon="lock"
              v-model="user.password" :rules="[rules.password.min, rules.password.max, rules.password.required]">
            </v-text-field>
          </v-form>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions>
      <v-row justify="center" no-gutters>
        <v-col class="text-center">
          <v-btn class="mb-5" color="primary" @click="login()"
            :disabled="!states.formIsValid" :loading="states.loginBtnLoad">
            Entrar
          </v-btn>
        </v-col>
      </v-row>
    </v-card-actions>
  </v-card>
</template>

<script>

import Auth from '../../services/api/Auth'

export default {
  name: 'LoginCard',
  data: () => ({
    user: {
      email: '',
      password: ''
    },
    states: {
      formIsValid: true,
      loginBtnLoad: false,
      snackBar: false,
      snackBarMsg: ''
    },
    rules: {
      email: {
        required: value => !!value || 'Obrigatório',
        max: value => value.length <= 50 || 'Deve ter no máximo de 50 caracteres',
        isEmail: value => {
          const patern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return patern.test(value) || 'Email inválido'
        }
      },
      password: {
        required: value => !!value || 'Obrigatório',
        min: value => value.length >= 6 || 'Deve ter no mínimo 6 caracteres',
        max: value => value.length <= 20 || 'Deve ter no máximo 20 caracteres'
      }
    }
  }),
  methods: {
    login () {
      if (!this.$refs.form.validate()) {
        return false
      }
      this.states.loginBtnLoad = true
      Auth.login(this.user)
        .then((response) => {
          localStorage.setItem('AUTH_TOKEN', response.data.token)
          this.states.snackBarMsg = 'Login efetuado com sucesso'
          this.states.snackBar = true
        })
        .catch((error) => {
          console.log(error)
          if (error.response.data.error === 'unregistered email') {
            this.states.snackBarMsg = 'Email não registrado'
            this.states.snackBar = true
          }
          if (error.response.data.error === 'invalid credentials ') {
            this.states.snackBarMsg = 'Credenciais inválidas'
            this.states.snackBar = true
          }
          if (error.response.data.error) {
            this.states.snackBarMsg = 'Erro inesperado'
            this.states.snackBar = true
          }
        })
        .finally(() => {
          this.states.loginBtnLoad = false
        })
    }
  }
}
</script>

<style>

</style>
