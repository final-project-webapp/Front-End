<template>
   <div>
      <NavBar />
      <div class="header">

         <img src="@/assests/image/popcorn.jpg" alt="" />

         <div class="text-container">
            <div class="text">
               <div class="">                  
               </div>
               <!-- <span class="mini-heading">Now Stremaing</span> -->
               <h1 class="pt-20"><span>Now</span> Playing</h1>
               <!-- <b-button variant="" size="sm">
                  <a href="#movie-grid" class="view">View Movies</a>
               </b-button>
               <b-button variant="" size="sm">
                  <nuxt-link class="view" to="/show_discuss">More Discuss</nuxt-link>
                  <a href="#movie-grid" class="view"></a>
               </b-button> -->
            </div>
         </div>
      </div>
   </div>
</template>

<script>
// import SlideBar from '@/components/slide_bar.vue'
import NavBar from '@/components/nav_bar.vue'
export default {
   components: {      
      NavBar
   },
}
</script>


<style lang="scss" scoped>
.header {
   height: 400px;
   position: relative;

   @media (min-width: 750px) {
      height: 500px;
   }

   &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      background-color: rgba(0, 0, 0, 0.6);
   }

   img {
      width: 100%;
      height: 100%;
      object-fit: cover;
   }

   .text-container {
      z-index: 99;
      position: absolute;
      top: 0;
      margin: 0;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;

      .text {
         padding: 0 16px;
         width: 100%;
         max-width: 1400px;
         margin: 0 auto;
      }

      h1 {
         color: #fff;
         font-size: 64px;
         font-weight: 200;
         margin-bottom: 8px;

         @media (min-width: 750px) {
            font-size: 84px;
         }

         span {
            font-weight: 500;
         }
      }

      .view {
         font-size: 20px;
         align-self: flex-start;
      }
   }
}
</style>