<!-- src/components/Header.vue -->
<script setup lang="ts">
import { useRoute } from 'vue-router'
const route = useRoute()

import { ref } from 'vue'

const open = ref(false)
const toggle = () => (open.value = !open.value)
const close = () => (open.value = false)

// ссылки меню
const links = [
  { to: '/', label: 'УСЛУГИ' },
  { to: '/portfolio', label: 'ПОРТФОЛИО' },
  { to: '/learning', label: 'ОБУЧЕНИЕ' },
  { to: '/contacts', label: 'КОНТАКТЫ' },
]
</script>

<template>
  <footer class="ftr">
    <!-- добавляем класс 'is-contacts', если страница контактов -->
    <div class="container" :class="{ 'is-contacts': route.path === '/contacts' }">
      
      <!-- показываем socials только если не contacts -->
      <div v-if="route.path !== '/contacts'" class="socials">
        <div class="name">Связаться с нами:</div>
        <a href="https://t.me/monamorew" target="_blank" class="social-link">
          <img src="/pictures/socials/telegr.png" class="social-img"/>
          <div class="desc">@monamorew</div>
        </a>
        <a href="https://www.instagram.com/monamorew/" target="_blank" class="social-link">
          <img src="/pictures/socials/insta.png" class="social-img"/>
          <div class="desc">@monamorew</div>
        </a>
        <div class="ltm">Разработка сайта: <a href="https://ltm.studio/ru" class="ltm-link">ltm.studio</a></div>
      </div>

      <a href="/" class="logo" aria-label="На главную">
        Коваленко        
      </a>
    </div>
  </footer>
</template>


<style scoped>
.ftr {width:100%; max-width: var(--max-w); position: sticky;top: 0;z-index: 1000;background: var(--color-background); margin: 0 auto;}
.container {width:100%;margin: 0 auto;display: flex; justify-content: space-between ; align-items: flex-start; padding: 3% 6%;box-sizing: border-box; }

/* Логотип */
.logo {display: inline-block;color: var(--brand-white);text-decoration: none;font-family: var(--font-heading);font-size: clamp(130px, 13.1944444444vw, 190px);line-height: 0.6;letter-spacing: 0.02em;position: relative; padding:0; right:-10px;}

.container.is-contacts {
  justify-content: flex-end;
}
.name { color: var(--color-text-muted-4); }
.desc { font-size: 16px; color: #fff; }
a { color: #fff; text-decoration: none; }
.socials { display: flex; flex-direction: column; align-self: flex-end; }
.social-link{display: flex; gap:10px; align-items: center;}
.social-img{height: 20px;}
.ltm{color: var(--color-text-muted-4);font-weight: 200;padding-top: 10px;}
.ltm-link{color: var(--color-text-muted-4);}
.ltm-link:hover{color:#fff;}
@media (max-width: 1024px) {
  .container{padding: 5%;}
  .logo{right:0}
}
@media(max-width:768px){
  .logo{line-height: 0.8;}
}
@media(max-width:480px){
    .logo{display: none;}
}
</style>
