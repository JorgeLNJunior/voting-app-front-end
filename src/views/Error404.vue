<template>
  <v-main>
    <v-container fluid class="fill-height">
      <v-row align="center" justify="center">
        <v-col cols="10" md="4" lg="4">
          <v-img :src="svg"></v-img>
          <div class="text-center body-1">
            <p>Página não encontrada...</p>
          </div>
          <div class="text-center caption">
            Icons made by
            <a href="https://www.flaticon.com/authors/freepik" title="Freepik">
              Freepik
            </a>
            from
            <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>
          </div>
          <div class="text-center mt-4">
            <v-btn color="blue" to="/" outlined>
              <v-icon>arrow_left</v-icon>
              Voltar
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
export default {
  data: () => ({
    svg: require('../assets/error404.svg')
  })
}
</script>
