<template>
  <div class="about">
    <div v-for="todo in todos" v-bind:key="todo">
      <dev
        :picture="todo.picture"
        v-bind:name="todo.name"
        v-bind:position="todo.position"
      />
      <!-- <dev :picture="item['picture']" :name="item['name']" :position="['position']"></dev> -->
    </div>
  </div>
</template>

<script>
import dev from "@/components/Dev.vue";
export default {
  components: {
    dev
  },
  data() {
    return {
      todos: [
        {
          picture: require("@/assets/burce.jpg"),
          name: "Jerome P. Burce",
          position: "Front-End Developer"
        },
        {
          picture: require("@/assets/cabia-an.jpg"),
          name: "John Patrick Cabia-an",
          position: "Project Manager"
        },
        {
          picture: require("@/assets/morre.jpg"),
          name: "Josephine Morre",
          position: "Back-End Developer"
        },
        {
          picture: require("@/assets/rufo.jpg"),
          name: "Irish Rufo",
          position: "Back-End Developer"
        }
      ]
    };
  }
};
</script>
