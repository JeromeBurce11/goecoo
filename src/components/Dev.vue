<template>
  <center>
    <v-card id="card">
      <v-flex justify-center>
        <v-row>
          <v-col>
            <v-img id="picture" v-bind:src="picture"></v-img>
          </v-col>
          <v-col cols="10" class="text-left">
            <h1>{{name}}</h1>
            <p>{{position}}</p>
          </v-col>
        </v-row>
      </v-flex>
    </v-card>
    <br>
  </center>
</template>
<script>
export default {
  name: "dev",
  props: {
    name: String,
    position: String,
    picture: String
  }
};
</script>
<style scoped>
#card{
    margin-left:20%;
    margin-right:20%;
  }
img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}
#picture{
  width: 100px;
  height: 100px;
  border-radius: 50%;
}
</style>