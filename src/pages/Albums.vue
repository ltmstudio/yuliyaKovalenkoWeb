<script setup lang="ts">
import { useRoute } from 'vue-router'
const route = useRoute()
import { ref } from 'vue'
import { RouterLink } from 'vue-router'


import { albums } from '@/data/albums'
</script>

<template>
   <section class="albums">
    <div class="container">
        <h1 class="title">ПОРТФОЛИО</h1> <!-- Альбомы -->
        
      <div class="grid">
        <RouterLink
          v-for="a in albums"
          :key="a.id"
          class="album"
          :to="{ name: 'grid', params: { id: a.id } }"
        >
          <div class="cover">
            <img :src="a.cover" :alt="a.title" loading="lazy" />
          </div>
          <h3 class="album-title">{{ a.title }}</h3>
        </RouterLink>
      </div>
    </div>
   </section>
</template>

<style scoped>
.albums{ background:var(--color-background); color:#fff; }
.container{ width:100%; max-width:var(--max-w); margin:0 auto; padding:3% 6%; border-block: 2px solid var(--color-border);}
.title {font-size:72px;margin-bottom: 24px;font-family: var(--font-heading); line-height: 0.7;}
.grid {display: grid;gap: 24px;grid-template-columns: repeat(3, 1fr);}
.album {display: block;text-decoration: none;color: inherit;}
.cover {aspect-ratio: 4 / 3;border: 2px solid var(--color-border);border-radius: 5px;overflow: hidden;background: #111;}
.cover img {width: 100%;height: 100%;object-fit: cover;}
.album-title { margin-top: 10px;font-size: 16px;text-align: center;font-family: var(--font-main);}

@media(max-width:1024px){
  .grid{gap:16px}
}
@media(max-width:768px){
  .grid{gap:16px; grid-template-columns: repeat(2, 1fr);}
  .title{font-size: clamp(42px, 7.8125vw, 60px);}
}
@media(max-width:480px){
  .grid{gap:16px; grid-template-columns: repeat(1, 1fr);}
  .container{padding: 10% 6%; border-top:none}
}
</style>