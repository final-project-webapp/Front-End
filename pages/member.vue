<template>
  <div class="bg-zinc-800 min-h-screen">
    <!-- <SlideBar class="pt-20 sm:pl-4 md:pl-12 lg:pl-24 xl:pl-48"/> -->
    <NavBar class="pt-20" />
    <MemberList class="pt-20" />
  </div>
</template>

<script>
// import SlideBar from '@/components/slide_bar.vue'
import NavBar from '@/components/nav_bar.vue'
import MemberList from '@/components/MemberList.vue'
export default {
  name: 'MemberPage',
  components: {
    MemberList,
    NavBar
  },  
}
</script>
