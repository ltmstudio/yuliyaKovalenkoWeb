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
  { to: '/albums', label: 'ПОРТФОЛИО' },
  { to: '/learning', label: 'ОБУЧЕНИЕ' },
  { to: '/contacts', label: 'КОНТАКТЫ' },
]
</script>

<template>
  <header class="hdr">
    <div class="container">
      <nav class="nav2" aria-label="Главное меню">
    <RouterLink
      v-for="l in links"
      :key="l.to"
      :to="l.to"
      class="nav-link"
      :class="{ active: route.path === l.to }"
    >
      {{ l.label }}
    </RouterLink>
      </nav>
      <!-- Логотип -->
      <a href="/" class="logo" aria-label="На главную">
        ЮЛИЯ
        <span class="logo-sub">АВТОРСКИЙ ФОТОГРАФ</span>
      </a>

      <a href="/" class="logo2" aria-label="На главную">
        <span class="logo-sub2">ФОТОГРАФ</span>
        ЮЛИЯ <br> Коваленко
        
      </a>

      <!-- Десктоп-меню -->
      <nav class="nav" aria-label="Главное меню">
    <RouterLink
      v-for="l in links"
      :key="l.to"
      :to="l.to"
      class="nav-link"
      :class="{ active: route.path === l.to }"
    >
      {{ l.label }}
    </RouterLink>
      </nav>



      <!-- Бургер -->
      <button class="burger" @click="toggle" aria-label="Открыть меню" :aria-expanded="open">
        <span />
        <span />
        <span />
      </button>
    </div>

    <!-- Мобильное меню -->
    <div class="drawer" :class="{ open }" @click.self="close">
      <nav class="drawer-body" aria-label="Мобильное меню">
        <RouterLink v-for="l in links" :key="l.to" :to="l.to" class="drawer-link" @click="close">{{ l.label }}</RouterLink>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.hdr {width:100%; max-width: var(--max-w);  position: sticky;top: 0;z-index: 1000;background: var(--color-background); margin: 0 auto;}
.container {width:100%;margin: 0 auto;display: flex; justify-content: space-between ; align-items: flex-start; padding: 3% 6%;box-sizing: border-box;}

/* Логотип */
.logo2{display: none; color: var(--brand-white);text-decoration: none;font-family: var(--font-heading);font-size: clamp(64px, 17.9166666667vw, 86px); line-height: 0.7;letter-spacing: 0.02em;position: relative;}
.logo-sub2{display: none; margin-bottom: 10px;font: 600 13px/1 Arial, system-ui, sans-serif;letter-spacing: 0;color: var( --color-text-muted-1);}
.logo {display: inline-block;color: var(--brand-white);text-decoration: none;font-family: var(--font-heading);font-size: clamp(130px, 13.1944444444vw, 190px);line-height: 0.6;letter-spacing: 0.02em;position: relative;}
.logo-sub {display: block;margin-top: 6px;font: 600 14px/1 Arial, system-ui, sans-serif;letter-spacing: 0;color: var( --color-text-muted-1);}

/* Десктоп-меню */
.nav2 {display: none;}
.nav {display: flex;gap: 26px;align-items: center;}
.nav-link { position: relative; color: var(--color-text-muted-2); opacity: 0.85; text-decoration: none; font: 400 14px/1 Arial, system-ui, sans-serif; letter-spacing: 0.08em; transition: opacity var(--transition-fast, 0.2s), color var(--transition-fast, 0.2s); }
.nav-link:hover, .nav-link.active { opacity: 1; color: var(--brand-white, #fff); }
/* Линия под ссылкой */
.nav-link::after { content: ""; position: absolute; left: 0; bottom: -4.5px; width: 100%; height: 1px; background: currentColor; transform: scaleX(0); transform-origin: right center; transition: transform 0.4s ease; }
.nav-link:hover::after, .nav-link.active::after { transform: scaleX(1); transform-origin: left center; }

/* Бургер */
.burger {display: none;width: 40px;height: 40px;border: 1px solid rgba(255, 255, 255, 0.18);border-radius: 10px;background: none;color: #fff;cursor: pointer;padding: 8px;gap: 4px; }
.burger span {display: block;height: 2px;background: #fff;border-radius: 2px;}
.burger span:nth-child(1) {width: 60%;}
.burger span:nth-child(2) {width: 100%;}
.burger span:nth-child(3) {width: 70%;}

/* Drawer */
.drawer {position: fixed;inset: 0;background: rgba(0, 0, 0, 0.45);opacity: 0;pointer-events: none;transition: opacity 0.25s ease;}
.drawer.open {opacity: 1;pointer-events: auto;}
.drawer-body { position: absolute; right: 0; top: 0; bottom: 0; width: min(82vw, 360px); background: #111; border-left: 1px solid rgba(255, 255, 255, 0.08); padding: 24px; display: flex; flex-direction: column; gap: 14px; transform: translateX(20px); opacity: 0; transition: 0.25s ease; }
.drawer.open .drawer-body { transform: none; opacity: 1; }
.drawer-link { color: #fff; text-decoration: none; font: 700 16px/1.2 Arial, system-ui, sans-serif; padding: 12px 4px; border-bottom: 1px solid rgba(255, 255, 255, 0.08); }




/* Адаптив */
@media (max-width: 1024px) {
  .container{padding: 3% 5%;}
}
@media (max-width: 768px) {
  .nav {display: none;} .nav2 {justify-content: center;justify-self: center;display: flex;gap: 16px;margin: 0 auto;}
  .container{flex-direction: column; gap:30px}
}
@media (max-width: 480px) {

  .nav {display: none;} 
  .burger {display: inline-grid;}
  .container {position:relative; grid-template-columns: 1fr auto; padding: 5%; gap: 0; display: flex; flex-direction: column-reverse; gap:20px; border-bottom: 2px solid var(--color-border);padding-bottom: 0;}
  .burger {width: 36px; height: 36px; gap:3px;position: absolute;right: 5%;top: 10%;}
  .logo2{display:block;} .logo{display: none;}
  .logo-sub2{display: block; font-size: 12px;} .logo-sub{display: none;}
  .nav2{display: flex; padding-bottom: 3px; }  .nav-link{font-size: 13px;}
}
@media (max-width: 330px) {
  .nav2{display: flex; padding-bottom: 3px; gap:10px }  .nav-link{font-size: 10px;}
}
</style>
