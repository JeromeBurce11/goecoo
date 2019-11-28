<template>
<div>
  <Sidebar />
  <Developer />
  <!-- <EventCard  /> -->
</div>
</template>
<script>
import Sidebar from '../components/Sidebar.vue'
import Developer from '../components/Developer.vue'
// import VImageInput from 'vuetify-image-input/a-la-carte';
// import EventCard from '../components/EventCard.vue';
// import InputEvent from '../components/InputEvent.vue'
export default {
  name:"AboutUs",
  data: () => ({
 
    posts:[{},{}]
  }),
  components: {
    Sidebar,
    Developer
    // EventCard 
    // InputEvent
  },
  methods: {
  }
};
</script>