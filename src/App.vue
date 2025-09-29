<template>
  
  <div class="layout">
    <Header />    
    <main class="content">
      <router-view />
    </main>
     <Footer />
  </div>
 
</template>

<script setup>
import Header from '@/components/Header.vue'
import Footer from './components/Footer.vue';
</script>

<style>
html, body, #app {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  background-color: black;
 
}

.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* ключевой момент */
}

.content {
  flex: none;
  display: flex;
  flex-direction: column;
}
</style>

