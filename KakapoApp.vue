<template>
    <div id="kiwi">
      <h1>Endangered Birds of NZ</h1>
      
      <!-- Filter Section -->
      <div>
        <label for="category">Choose a fact type:</label>
        <select id="category" v-model="selectedCategory">
          <option v-for="category in categories" :key="category">{{ category }}</option>
        </select>
        <button @click="changeCategory('All')"> Set to 'All'</button>
      </div>
  
      <div class="top-left">
        <!-- Displaying formatted current date -->
        <p class="date">Today's Date: {{ formattedDate }}</p>
  
        <!-- Displaying custom formatted date -->
        <p class="date">Today's Day: {{ customFormattedDate }}</p>
      </div>
      <div class="center-content">
        <div class="fact-container">
          <h1 :style="{ color: headerColor }">Kakapo (Strigops habroptila)</h1>
          <div id="kakapo-statement">
            <p><b>The kakapo is the only flightless parrot in the world.</b></p>
          </div>
        </div>
      </div>
      <br>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Fact Type</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(fact, index) in filteredFacts" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ fact.type }}</td>
            <td>{{ fact.details }}</td>
          </tr>
        </tbody>
      </table>
      <br>
      <div class="image1">
        <img :src="kakapoImageUrl" alt="Kakapo Image" class="center">
        <p class="image-caption">(Image: <i>Department of Conservation, New Zealand)</i></p>
      </div>
      <br>
      <h2><i>Contact The Conservation</i></h2>
      <form @submit.prevent="validateForm">
        <label for="name">Name:</label>
        <input type="text" id="name" name="name" v-model="formData.name" required>
        <span class="error">{{ formErrors.name }}</span>
        <br><br>
  
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" v-model="formData.email" required>
        <span class="error">{{ formErrors.email }}</span>
        <br><br>
  
        <label for="message">Message:</label>
        <textarea id="message" name="message" v-model="formData.message" required></textarea>
        <span class="error">{{ formErrors.message }}</span>
        <br><br>
  
        <input type="submit" value="Submit">
      </form>
      <div>
        <h2>Sirocco the Kakapo</h2>
  
        <div class="center">
          <div v-html="embedVideo(kakapoVideoUrl)" class="video-container"></div>
          <router-link to="/">Homepage</router-link>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import moment from 'moment';
  import '/Users/Minjune/Documents/Codes/WebApps/Final_Task/birds-app/public/component-styles.css'; // Import the CSS file
  export default {
    data() {
      return {
        headerColor: 'rgb(134, 198, 37)',
        currentDate: moment().toISOString(),
        populationCount: 247, // Replace with the actual live population count
        facts: [
          {
            type: "Habitat",
            details: "Kakapos are native to New Zealand and are mostly found in forested areas."
          },
          {
            type: "Population",
            details: "As of 2021, there are only around 200 kakapos left in the world."
          },
          {
            type: "Behaviour",
            details: "Kakapos are nocturnal, solitary birds known for their unique booming calls."
          }
        ],
        kakapoImageUrl: "https://www.doc.govt.nz/thumbs/hero/contentassets/22c4c0407c1142ffbd70ef6ff029d722/stella-the-kakapo-codfish-1600.jpg",
        kakapoVideoUrl: "https://www.youtube.com/embed/9T1vfsHYiKY",
        formData: {
          name: '',
          email: '',
          message: ''
        },
        formErrors: {
          name: '',
          email: '',
          message: ''
        },
        uppercaseResult: '',
        substringResult: '',
    selectedCategory: '', // Selected category from dropdown
        categories: ['All', 'Habitat', 'Population', 'Behaviour'], // Available categories
      };
    },
    computed: {
      // Filter the facts based on the selected category
      filteredFacts() {
        if (this.selectedCategory === 'All' || !this.selectedCategory) {
          return this.facts;
        }
        return this.facts.filter(fact => fact.type === this.selectedCategory);
      },
      // Format the current date
      formattedDate() {
        return moment(this.currentDate).format('MMMM Do YYYY, h:mm:ss a');
      },
      // Custom formatted date example
      customFormattedDate() {
        return moment(this.currentDate).format('dddd');
      }
    },
    methods: {
      embedVideo(url) { 
        return `<iframe width="560" height="315" src="${url}" frameborder="0" allowfullscreen></iframe>`;
      },
      validateForm() {
        // Validation logic here, similar to your validateForm function
        // Set formErrors appropriately
        // Return isValid
  
        // Example of updating data properties:
        this.uppercaseResult = "Title: " + this.formData.name.toUpperCase();
        this.substringResult = "Name: " + this.formData.name.substring(0, 7);
      },
      changeCategory(newCategory) {
        this.selectedCategory = newCategory;
      },
    watch: {
    selectedCategory(newCategory, oldCategory) {
      // This function will be called whenever selectedCategory changes
      console.log(`Selected category changed from ${oldCategory} to ${newCategory}`);
      
      // You can perform any actions based on the new selected category here
      // For example, you can fetch new data based on the selected category
        }
    },
      mounted() {
        // Code to set currentFullDate and currentTime properties
        const now = new Date();
        this.currentFullDate = "Full Date: " + now.toDateString();
        this.currentTime = "Time: " + now.toTimeString();
  
        // Update the population count
        this.updatePopulationCount();
  
        // Call the updatePopulationCount function every 1 minute (60000 milliseconds)
        setInterval(this.updatePopulationCount, 60000);
      },
      updatePopulationCount() {
        // Replace this with code to fetch the actual live population count
        // For now, we'll just use the initial value for demonstration
        this.populationCount = 247;
      },
    },
  };
  </script>
  
  <style>
  .video-container iframe {
    width: 100%;
    max-height: 30%;
  }
  .center-image {
    display: block;
    margin: 0 auto;
  }
  .form-group {
    margin-bottom: 20px;
  }
  body {
      text-align: center;
      font-family: 'Times New Roman', Times, serif;
      line-height: 1.5;
      padding: 20px;
      background-color: lightblue;
    }
  .contact-form {
    text-align: left;
  }
  .header-text {
    margin: 0;
  }
  .contact-title {
    color: #777;
    margin: 0;
  }
  .fact-card {
    border: 1px solid #ddd;
    padding: 10px;
    margin: 10px 0;
    background-color: #f9f9f9;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  }
  </style>  