<!-- src/pages/NotFound.vue -->
<template>
    <section class="not-found">
      <div class="container">
        <h1>404 — Страница не найдена</h1>
        <p>К сожалению, такой страницы не существует.</p>
        <router-link to="/">Вернуться на главную</router-link>
      </div>
    </section>
  </template>
  
  <script setup lang="ts">
  </script>
  
  <style scoped>
  .not-found {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 50vh;
    text-align: center;
    color: #fff;
    background: #000;
  }
  .container {
    max-width: 600px;
    padding: 0 20px;
  }
  h1 {
    font-size: 2rem;
    margin-bottom: 1rem;
  }
  a {
    color: #42b983;
    text-decoration: underline;
  }
  </style>
  