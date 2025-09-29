<script setup lang="ts">
import { useRoute } from 'vue-router'
const route = useRoute()
import { ref } from 'vue'
import { Splide, SplideSlide } from '@splidejs/vue-splide';
import '@splidejs/vue-splide/css';

type Service = {
  id: number
  title: string
  price: number | string
  desc: string
  img: string
}

const services: Service[] = [
  { id: 1, title: 'Часовая съёмка', price: '8000 ₽', desc: 'Студия/улица, до 15 обработанных фото.', img: '/pictures/services/s2.jpg' },
  { id: 2, title: 'Контент для бизнеса', price: '20000 ₽', desc: 'Каталог/интерьеры/персонал, ТЗ согласуем.', img: '/pictures/services/s1.jpg' },
  { id: 3, title: 'Свадебная съёмка', price: '35000 ₽', desc: 'Съёмочный день до 8 ч, 200+ фото.', img: '/pictures/services/s4.jpg' },
  { id: 4, title: 'Репортаж', price: '6 000 ₽ / час', desc: 'Мероприятия, презентации, backstage.', img: '/pictures/services/s3.jpg' },
];

const options = {
    autoWidth: true,  
  type: 'loop',
  perPage: 3,
  gap: '50px',
  arrows: false,
  pagination: false,
  speed: 600,
  autoplay: false,
  pauseOnHover: true,
  breakpoints: {
    
    768:  { perPage: 2, gap: '50px' },
    480:  { perPage: 2, gap: '32px' },
  },
};

const fmt = (v: number | string) =>
  typeof v === 'number' ? v.toLocaleString('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 }) : v;
</script>

<template>
    <section class="services">
      <div class="container">
        <!-- Левое фото -->
        <div class="hero-photo">
          <img src="/pictures/services/ser1.jpg" alt="Юлия Коваленко" />
        </div>
  
        <!-- Правый столбец: title + subtitle + карусель -->
        <div class="content">
          <header class="head">
            <h1 class="title">УСЛУГИ</h1>
            <p class="subtitle">Фотосессии для вас и вашего бизнеса</p>
          </header>
  
          <Splide :options="options" class="slider">
            <SplideSlide v-for="s in services" :key="s.id">
              <article class="card">
                <div class="img-wrap">
                  <img :src="s.img" :alt="s.title" />
                </div>
                <h3 class="card-title">{{ s.title }}</h3>
                <div class="price">{{ fmt(s.price) }}</div>
                <p class="desc">{{ s.desc }}</p>
              </article>
            </SplideSlide>
          </Splide>
        </div>
      </div>
    </section>
  </template>
  
  <style scoped>
  /* секция и сетка */
  .services { background: var(--color-background); color:#fff; }
  .container{
    width:100%; max-width:var(--max-w); margin:0 auto; padding:2% 6%;  border-block: 2px solid var(--color-border);
    display:grid; grid-template-columns:minmax(410px, 38%) 1fr; gap:32px; align-items:start; overflow: hidden;
  }
  
  /* левое фото — как в макете, уже и выше */
  .hero-photo { align-self: stretch; display:flex;align-self: stretch;display: flex;border-right: 2px solid  var(--color-border);padding-right: 32px;}
  .hero-photo img{
    width:100%; height:auto; object-fit:cover; border:2px solid var(--color-border); border-radius:5px;
    aspect-ratio: 4/5;            /* фиксируем пропорцию */
  }
  
  /* заголовок над каруселью */
  .head{ margin-bottom:18px; }
  .title{ font-size:72px; line-height:0.7; margin:0;font-family: var(--font-heading);}
  .subtitle{ color:#bebebe; font-size:clamp(14px,1.2vw,18px); margin:0; font-weight: 400; }
  
  /* карусель: карточки компактнее */
  .slider :deep(.splide__list){ align-items:stretch; display:flex;}
  .slider :deep(.splide__slide){ position:relative; }
  
  /* вертикальная линия между карточками */
  .slider :deep(.splide__slide)::after{
    content:""; position:absolute; top:10%; bottom:10%; right:-9px; width:2px;
    background: var(--color-border); pointer-events:none;
  }  
  /* карточка */
  .card{
    display:flex; gap:8px; width: 300px; height: 100%; flex-direction: column;
  }
  .desc{flex-grow: 1;}
  .img-wrap{
    height: 340px; width: 260px; border:2px solid var(--color-border); border-radius:5px; overflow:hidden; background:#121212;
  }
  .img-wrap img{ width:100%; height:100%; object-fit:cover; display:block; }
  .card-title{ font-size:16px; margin:6px 0 0; color:#fff; }
  .price{ font-weight:700; color:#eaeaea; }
  .desc{ color:#bdbdbd; font-size:13px; line-height:1.4; }
  
  /* небольшой отступ сверху у слайдера, чтобы линия не прилипала к заголовку */
  .slider{ margin-top:6px; }
  .splide__arrow--prev{display: none;}
  @media(max-width:768px){
    .title{font-size: clamp(42px, 7.8125vw, 60px);}
    .container{grid-template-columns:  minmax(320px, 38%) 1fr;}
    .img-wrap{height: 280px; width:230px}
    .card{width: 270px; gap:3px}    
  }
  @media(max-width:480px) {
    .container{padding:10% 6%;display: flex;flex-direction: column-reverse; gap:64px; border-top:none}
    .card{gap:8px; width: 248px;}
    .hero-photo{align-self: stretch;display: flex;align-self: stretch;display: flex;border-right: none;padding-right: 32px;height: 400px;width: max-content; align-self: center; padding-right: 0;}
  }
  @media(max-width:330px) {
    .hero-photo{height: 320px;width: max-content;}
    .card{width: 248px; }
  }
  </style>