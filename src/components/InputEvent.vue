
<template>
  <v-row justify="center">
    <v-col cols="12" sm="10" md="8" lg="6">
      <v-card ref="form">
        <h2 class="teal--text text--lighten-1 text-center">Create an Event</h2>
        <template>
          <v-card class="mx-auto" max-width="400">
            <!-- <Imageupload /> -->
            <v-img
              class="white--text align-end"
              height="300px"
              :src="img"
              @click="$refs.file.click()"
            ></v-img>
            <!-- hidden file para sa file handling -->
            <input type="file" id="file" ref="file" style="display: none"  @change="onFileChange()"/>
          </v-card>
        </template>
        <!-- <imageupload /> -->
        <v-card-text>
          <!-- For input of title -->
          <v-text-field
            v-model="title"
            prepend-icon="fas fa-file"
            label="Title"
            placeholder="Title for the event"
            required
          ></v-text-field>
          <!-- For input of date -->
          <v-menu
            ref="menu"
            v-model="menu"
            :close-on-content-click="false"
            :return-value.sync="date"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <!-- For picking the date on the calendar -->
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="date"
                label="Pick a Date"
                prepend-icon="fas fa-calendar-alt"
                readonly
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="date" no-title scrollable>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
              <v-btn text color="primary" @click="$refs.menu.save(date)">OK</v-btn>
            </v-date-picker>
          </v-menu>
          <!-- For input of Venue -->
          <v-text-field
            v-model="address"
            prepend-icon="fas fa-map-marker-alt"
            label="Venue"
            placeholder="Venue"
            required
          ></v-text-field>
          <!-- For input for Description-->
          <v-textarea
            name="input-7-1"
            filled
            placeholder="Description of the event"
            prepend-icon="fas fa-file-alt"
            label="Description"
            v-model="description"
            auto-grow
          ></v-textarea>
        </v-card-text>
        <v-divider class="mt-12"></v-divider>

        <v-card-actions>
          <v-btn text @click="$router.push('/dashboard')">Cancel</v-btn>
          <v-spacer></v-spacer>
          <v-slide-x-reverse-transition>
            <v-tooltip v-if="formHasErrors" left>
              <template v-slot:activator="{ on }">
                <v-btn icon class="my-0" @click="resetForm" v-on="on">
                  <v-icon>mdi-refresh</v-icon>
                </v-btn>
              </template>
              <span>Refresh form</span>
            </v-tooltip>
          </v-slide-x-reverse-transition>
          <v-btn color="primary" text @click="submit">Submit</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<style>
.v-application .text-center {
  text-align: center !important;
  font-size: 46px;
  color: white;
}
element.style {
  background-image: url(http://localhost:8081/img/logopictures.3530da54.jpeg);
  background-position: center center;
  height: auto;
  height: 80%;
  width: 60%;
  /* align-self: center; */
  margin-top: 7%;
  margin-left: 20%;
}
.v-image__image,
.v-image__placeholder {
  z-index: -1;
  position: absolute;
  top: 10%;
  left: 20%;
  width: 60%;
  height: 80%;
}
</style>

<script>
import axios from "axios";
import Imageupload from "../components/imageupload.vue";
export default {
  name: "InputEvent",
  data: () => ({
    img: require("@/assets/logopictures.jpeg"),
    file: "",
    date: new Date().toISOString().substr(0, 10),
    menu: false,
    modal: false,
    menu2: false,
    title: null,
    address: null,
    description: null,
    formHasErrors: false,
    rotation: 0,
    scale: 1,
    borderRadius: 0
  }),
  // components:{
  //   Imageupload
  // },

  computed: {
    form() {
      return {
        name: this.name,
        address: this.address
      };
    }
  },

  watch: {
    name() {
      this.errorMessages = "";
    }
  },

  methods: {
    // handleFileUpload() {
    // this.file = this.$refs.file.files[0];
    // this.imgUrl = URL.createObjectURL(this.file);
    onFileChange() {
      this.file = this.$refs.file.files[0];
      this.img = URL.createObjectURL(this.file);
      console.log(file)
    },

    saveClicked: function saveClicked() {
      var img = this.$refs.vueavatar.getImageScaled();
      this.$refs.image.src = img.toDataURL();
    },
    onImageReady: function onImageReady() {
      this.scale = 1;
      this.rotation = 0;
    },
    addressCheck() {
      this.errorMessages = !this.name ? "Hey! I'm required" : "";

      return true;
    },
    resetForm() {
      this.errorMessages = [];
      this.formHasErrors = false;

      Object.keys(this.form).forEach(f => {
        this.$refs[f].reset();
      });
    },
    submit() {
      var data = {
          image: this.file,
          title: this.title,
          dateevent: this.date,
          description: this.description,
          address: this.address
        };
      /*
                Initialize the form data
            */
      let formData = new FormData();

      formData.append('data', this.data)

      // formData.append("img", this.file);
      console.log(data);

      /*
          Make the request to the POST /single-file URL
      //   */
      // axios
      //   .post("http://localhost:3000/", formData, {
      //     headers: {
      //       "Content-Type": "multipart/form-data"
      //     }
      //   })
      //   .then((res)=> {
      //     console.log(res);

      //    this.imgUrl = res.data.filename;
      //   })
      //   .catch((err)=> {
      //     console.log(err);
      //   });
      if (this.title && this.address && this.date && this.description != null) {
        
        axios
          .post("http://localhost:3000/event/create", {formData})
          .then(res => {
            this.$router.push("/dashboard");
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        alert("fill all the given fields");
      }
    }
  }
};
</script>

