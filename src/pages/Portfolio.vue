<script setup lang="ts">
import { ref } from 'vue'
import { Splide, SplideSlide } from '@splidejs/vue-splide'
import '@splidejs/vue-splide/css'

type Service = { id:number; title:string; desc:string; img:string }

const services: Service[] = [
{ id: 1, title: 'Часовая съёмка',  desc: 'Студия/улица, до 15 обработанных фото.', img: '/pictures/services/s2.jpg' },
  { id: 2, title: 'Контент для бизнеса', desc: 'Каталог/интерьеры/персонал, ТЗ согласуем.', img: '/pictures/services/s1.jpg' },
  { id: 3, title: 'Свадебная съёмка', desc: 'Съёмочный день до 8 ч, 200+ фото.', img: '/pictures/services/s4.jpg' },
  { id: 4, title: 'Репортаж',  desc: 'Мероприятия, презентации, backstage.', img: '/pictures/services/s3.jpg' },
];


// локальное состояние открытых оверлеев: set(id)
const open = ref<Set<number>>(new Set())
const toggle = (id:number) => {
  const s = new Set(open.value)
  s.has(id) ? s.delete(id) : s.add(id)
  open.value = s
}

const options = {
  type: 'loop',
  autoWidth: true,
  gap: '32px',
  arrows: false,
  pagination: false,
  trimSpace: true,
  speed: 600,
  breakpoints: { 768:{ gap:'24px' }, 480:{ gap:'16px' } },
}
</script>

<template>
  <section class="portfolio">
    <div class="container">
      <header class="head">
        <h1 class="title">ПОРТФОЛИО</h1>
        <p class="subtitle">Фотографии по съёмкам в альбомах</p>
      </header>

      <Splide :options="options" class="slider">
        <SplideSlide v-for="s in services" :key="s.id">
          <article class="card">
            <div class="img-wrap" @click="toggle(s.id)">
              <img :src="s.img" :alt="s.title" />

              <!-- иконка в правом верхнем углу -->
              <button class="icon-btn" type="button" @click.stop="toggle(s.id)" aria-label="Подробнее">
                <span class="dot" />
              </button>

              <!-- нижний blur-оверлей -->
              <div class="overlay" :class="{ 'overlay--open': open.has(s.id) }">
                <div class="overlay__content">
                  <h3 class="overlay__title">{{ s.title }}</h3>
                  <p class="overlay__desc">{{ s.desc }}</p>
                  <button class="overlay__btn" type="button">Подробнее</button>
                </div>
              </div>
            </div>
          </article>
        </SplideSlide>
      </Splide>
    </div>
  </section>
</template>

<style scoped>
.portfolio{ background:var(--color-background); color:#fff; }
.container{ width:100%; max-width:var(--max-w); margin:0 auto; padding:3% 6%; border-block: 2px solid var(--color-border) }
.head{ margin-bottom:18px; }
  .title{ font-size:72px; line-height:0.7; margin:0;font-family: var(--font-heading);}
  .subtitle{ color:#bebebe; font-size:clamp(14px,1.2vw,18px); margin:0; font-weight: 400; }

/* карточка = только изображение по макету */
.card{ width: 480px; }
.img-wrap{
  position:relative; border-radius:5px; overflow:hidden;
  border:2px solid var(--color-border); aspect-ratio: 4/5; background:#0f0f0f; height:342px; width:480px;
}
.img-wrap img{ width:100%; height:100%; object-fit:cover; display:block; }

/* иконка */
.icon-btn{
  position:absolute; top:10px; right:10px; width:28px; height:28px;
  border-radius:50%; border:1px solid rgba(255,255,255,.6);
  background:rgba(0,0,0,.25); backdrop-filter:saturate(140%) blur(2px);
  display:grid; place-items:center; cursor:pointer;
}
.icon-btn .dot{ width:10px; height:10px; border-radius:50%; background:#e9e9e9; }
.icon-btn:hover{ border-color:#fff; }

/* blur-оверлей снизу */
.overlay{
  position:absolute; left:0; right:0; bottom:0;
  transform: translateY(100%); /* спрятан */
  transition: transform .28s ease;
  background: rgba(20,20,20,.45);
  backdrop-filter: blur(10px);
  border-top: 1px solid rgba(255,255,255,.15);
}
.overlay--open{ transform: translateY(0); }

.overlay__content{ padding:12px 14px 14px; }
.overlay__title{ font-size:16px; margin:0 0 4px; color:#fff; }
.overlay__desc{ font-size:13px; color:#d0d0d0; margin:0 0 10px; line-height:1.35; }
.overlay__btn{
  padding:8px 14px; border:1px solid #444; border-radius:5px;
  background:transparent; color:#fff; cursor:pointer;
}
.overlay__btn:hover{ border-color:#777; }

@media(max-width:1024px){
  .card{width: 400px;}
  .img-wrap{width:400px; height:300px}
}
@media(max-width:768px){
  .title{font-size: clamp(42px, 7.8125vw, 60px);}
  .subtitle{font-size: 12px;}
  .card{width: 375px;}
  .img-wrap{width:375px; height:260px}
  .head{text-align: center;}
}
@media(max-width:480px){
  .card{width: 330px;}
  .img-wrap{width:330px; height:220px}
  .container{padding: 10% 6%; border-top:none}
  .head{text-align: start;}
  .subtitle{font-size: 14px;}
}
@media(max-width:330px){
  .card{width: 280px;}
  .img-wrap{width:280px; height:190px}
}
</style>
