<template>
  <div>
    <v-card v-if="states.userCallEnded">
      <v-card-title>
        <v-col cols="6">
          <v-row justify="start">
            <v-avatar class="mr-4" size="40px">
              <v-img src="https://picsum.photos/200"></v-img>
            </v-avatar>
            <strong class="mt-1">{{ user.name }}</strong>
          </v-row>
        </v-col>
        <v-col cols="6" class="pa-0 ma-0">
          <v-row justify="end" align="end" no-gutters>
            <v-switch value="false" v-model="states.enableEdit" prepend-icon="edit"></v-switch>
          </v-row>
        </v-col>
      </v-card-title>
      <v-form ref="form" lazy-validation v-model="states.formIsValid">
        <v-card-text>
          <v-row align="center" justify="center">
            <v-col cols="6">
              <v-text-field label="Nome" v-model="editData.name" :disabled="!states.enableEdit" :rules="[rules.name.max, rules.name.min]">
              </v-text-field>
              <v-text-field label="*Email" :value="user.email" disabled></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field label="Senha" disabled value="em breve"></v-text-field>
              <v-text-field label="Avatar" value="em breve" disabled></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
      </v-form>
      <v-card-actions class="justify-center">
        <v-col class="ma-0 pa-0">
          <v-row justify="center" no-gutters>
            <v-btn color="primary" class="justify-center" :loading="states.editBtnLoad" :disabled="!states.enableEdit || !states.formIsValid" @click="editUser()">
              Editar
              <v-icon right>edit</v-icon>
            </v-btn>
          </v-row>
          <v-row justify="center" no-gutters>
            <p class="caption mt-2">*Algumas opções não podem ser alteradas</p>
          </v-row>
        </v-col>
      </v-card-actions>
    </v-card>
    <v-skeleton-loader v-else type="card" height="200"></v-skeleton-loader>
  </div>
</template>

<script>

import Decode from 'jwt-decode'

import User from '../../services/api/User'

export default {
  name: 'UserCard',
  data: () => ({
    user: {},
    editData: { name: '' },
    states: {
      userCallEnded: false,
      enableEdit: false,
      formIsValid: true,
      editBtnLoad: false
    },
    rules: {
      name: {
        min: value => value.length >= 3 || 'Deve ter no mínimo 3 caracteres',
        max: value => value.length <= 50 || 'Deve ter no máximo de 40 caracteres'
      }
    }
  }),
  methods: {
    decodeAuthToken () {
      const token = localStorage.getItem('AUTH_TOKEN')
      const decoded = Decode(token)
      return decoded
    },
    editUser () {
      if (!this.$refs.form.validate()) {
        return false
      }
      const token = this.decodeAuthToken()
      this.states.editBtnLoad = true
      User.editUser(token.uid, this.editData)
        .then((respose) => {
          this.$$router.go(0)
          console.log(respose.data)
        })
        .catch((error) => {
          console.log(error)
        })
        .finally(() => {
          this.states.editBtnLoad = false
        })
    }
  },
  created () {
    User.getUser(this.decodeAuthToken().uid)
      .then((response) => {
        this.user = response.data.users[0]
        this.states.userCallEnded = true
        this.editData.name = this.user.name
      })
      .catch((error) => {
        this.$router.push('/error')
        console.log(error)
      })
  }
}
</script>

<style>
</style>
