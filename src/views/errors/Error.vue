<template>
  <v-main>
    <v-container fluid class="fill-height">
      <v-row align="center" justify="center">
        <v-col cols="10" md="4" lg="4">
          <v-img :src="svg"></v-img>
          <div class="text-center body-1">
            <p>Desculpe, ocorreu um erro...</p>
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
    <v-footer color="#121212" padless>
      <v-col class="text-center">
        <div class="caption">
          Icons made by
          <a href="https://www.flaticon.com/authors/pixel-perfect" title="Pixel perfect">
            Pixel perfect
          </a>
          from
          <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>
        </div>
      </v-col>
    </v-footer>
  </v-main>
</template>

<script>
export default {
  data: () => ({
    svg: require('../../assets/errors/error.svg')
  })
}
</script>
