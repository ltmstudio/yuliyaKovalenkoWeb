<!-- src/pages/Grid.vue -->
<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed, onMounted, onBeforeUnmount, ref } from 'vue'
import { albums } from '@/data/albums' // общий список (берём title)

const route = useRoute()
const meta = computed(() => albums.find(a => a.id === String(route.params.id)) || null)

/* Список фото альбома (замени на свою генерацию/массив) */
const photoCounts: Record<string, number> = {
  album1: 69,
  album2: 107,
  album3: 85,
  album4: 0,
  album5: 0,
  album6: 0,
}

const id = computed(() => String(route.params.id))
const folder = computed(() => id.value.replace('album',''))
const photos = computed(() =>
  Array.from({ length: photoCounts[id.value] ?? 0 }, (_, i) => `/pictures/album-grid/${folder.value}/${i+1}.jpg`)
)

/* 🔹 Только добавлено: флаг наличия фото */
const hasPhotos = computed(() => photos.value.length > 0)

/* Lazy через IntersectionObserver */
const observerMap = new WeakMap<Element, IntersectionObserver>()
const vLazy = {
  mounted(el: HTMLImageElement, binding: any) {
    // Проверка работы v-lazy
    // eslint-disable-next-line no-console
    console.log('v-lazy mounted', el, binding)
    const realSrc = String(binding.value)
    el.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="30"><rect width="100%" height="100%" fill="%23161616"/></svg>'
    const io = new IntersectionObserver((en, obs) => {
      en.forEach(e => {
        if (!e.isIntersecting) return
        const img = new Image()
        img.src = realSrc
        img.onload = () => { el.src = realSrc; el.classList.add('is-loaded') }
        obs.unobserve(el); observerMap.delete(el)
      })
    }, { rootMargin: '600px 0px', threshold: 0.01 })
    io.observe(el); observerMap.set(el, io)
  },
  unmounted(el: HTMLImageElement) { observerMap.get(el)?.disconnect(); observerMap.delete(el) },
} as const

/* Лайтбокс */
const isOpen = ref(false)
const idx = ref(0)
const openViewer = (i:number) => { idx.value = i; isOpen.value = true }
const closeViewer = () => { isOpen.value = false }
const prev = () => { if (!photos.value.length) return; idx.value = (idx.value - 1 + photos.value.length) % photos.value.length }
const next = () => { if (!photos.value.length) return; idx.value = (idx.value + 1) % photos.value.length }

/* Клавиши */
const onKey = (e: KeyboardEvent) => {
  if (!isOpen.value) return
  if (e.key === 'Escape') closeViewer()
  else if (e.key === 'ArrowLeft') prev()
  else if (e.key === 'ArrowRight') next()
}
onMounted(() => window.addEventListener('keydown', onKey))
onBeforeUnmount(() => window.removeEventListener('keydown', onKey))

/* Свайпы (тач) */
const startX = ref<number|null>(null)
const onTouchStart = (e: TouchEvent) => { startX.value = e.touches[0].clientX }
const onTouchEnd = (e: TouchEvent) => {
  if (startX.value === null) return
  const dx = e.changedTouches[0].clientX - startX.value
  if (Math.abs(dx) > 40) (dx > 0 ? prev() : next())
  startX.value = null
}
</script>

<template>
  <section class="grid-page">
    <div class="container">
      <h1 class="title">{{ meta ? meta.title : 'Альбом' }}</h1>

      <!-- 🔹 Только добавлено: v-if/v-else для заглушки -->
      <div v-if="hasPhotos" class="masonry">
        <figure v-for="(p,i) in photos" :key="i" class="item">
          <button class="thumb" @click="openViewer(i)" aria-label="Открыть фото">
            <img v-lazy="p" :alt="`${meta?.title || 'Фото'} — ${i+1}`" />
          </button>
        </figure>
      </div>

      <div v-else class="placeholder">
        <p class="ph-title">В этом альбоме пока нет фотографий</p>
        <p class="ph-sub">Скоро добавим новые работы.</p>
      </div>
    </div>

    <!-- Лайтбокс -->
    <div v-if="isOpen" class="lightbox" @click.self="closeViewer" @touchstart.passive="onTouchStart" @touchend.passive="onTouchEnd">
      <button class="lb__close" @click="closeViewer" aria-label="Закрыть">×</button>
      <button class="lb__nav lb__prev" @click.stop="prev" aria-label="Предыдущее">‹</button>

      <figure class="lb__stage">
        <img :src="photos[idx]" :alt="`${meta?.title || 'Фото'} — ${idx+1}`" />
        <figcaption class="lb__cap">{{ meta?.title }} — {{ idx+1 }} / {{ photos.length }}</figcaption>
      </figure>

      <button class="lb__nav lb__next" @click.stop="next" aria-label="Следующее">›</button>
    </div>
  </section>
</template>

<script lang="ts">
export default { directives: { lazy: {} } }
</script>

<style scoped>
.grid-page { background: var(--color-background); color:#fff; }
.container { width:100%; max-width:var(--max-w); margin:0 auto; padding:3% 6%; }
.title { font-size: clamp(24px, 3vw, 40px); margin-bottom: 18px; }

/* Masonry */
.masonry { column-count: 4; column-gap: 14px; }
.item { break-inside: avoid; margin-bottom: 14px; border: 2px solid var(--color-border); border-radius: 6px; overflow: hidden; background:#111; }
.thumb { padding:0; margin:0; background:none; border:0; width:100%; display:block; cursor:zoom-in; }
.item img { width:100%; height:auto; display:block; filter: blur(6px); opacity:.7; transition: filter .25s ease, opacity .25s ease, transform .2s ease; }
.item img.is-loaded { filter: blur(0); opacity:1; }
.item:hover img { transform: scale(1.01); }

@media (max-width: 1200px) { .masonry { column-count: 4; } }
@media (max-width: 900px)  { .masonry { column-count: 3; column-gap: 8px; } .item {margin-bottom: 10px;} }
@media (max-width: 560px)  { .masonry { column-count: 2; column-gap: 4px; } .item {margin-bottom: 6px;} }

/* 🔹 Только добавлено: стили заглушки */
.placeholder { display:grid; place-items:center; min-height:20vh; border:1px dashed var(--color-border); border-radius:6px;  color:#cfcfcf; }
.ph-title { font-size:18px; margin:8px 0 2px; text-align: center;}
.ph-sub { font-size:14px; color:var(--color-text-muted-2); }

/* Лайтбокс */
.lightbox {
  position: fixed; inset: 0; z-index: 2000;
  background: rgba(0,0,0,.85); backdrop-filter: blur(2px);
  display: grid; grid-template-columns: 64px 1fr 64px; align-items: center;
}
.lb__stage { justify-self:center; align-self:center; max-width:min(96vw,1400px); max-height:90vh; display:grid; gap:8px; justify-items:center; }
.lb__stage img { max-width:100%; max-height:82vh; object-fit:contain; border-radius:6px; border:1px solid #2b2b2b; background:#0f0f0f; }
.lb__cap { color:#d0d0d0; font-size:14px; text-align:center; }

.lb__close {
  position:absolute; top:14px; right:18px;
  width:40px; height:40px; 
  border:none; background:transparent; color:#fff; cursor:pointer; font-size:40px; line-height:1;
}
.lb__nav {
  width:48px; height:48px; 
  border:none; background:transparent; color:#fff;
  cursor:pointer; font-size:48px; line-height:1; display:grid; place-items:center;
}
.lb__prev { justify-self:center; }
.lb__next { justify-self:center; }
.lb__nav:hover { border-color:#aaa; }

@media (max-width:640px){
  .lightbox { grid-template-columns:44px 1fr 44px; }
  .lb__nav { width:40px; height:40px; font-size:24px; }
}
</style>
