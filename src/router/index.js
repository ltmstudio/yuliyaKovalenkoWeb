import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'services',
    component: () => import('@/pages/Services.vue'),
    meta: {
      title: 'Услуги — Monamorev Photographer',
      desc: 'Создание сайтов, фотосессии и услуги фотографа Юлии Коваленко.',
      ogImage: "https://monamorew-photographer.ru/pictures/album-grid/1/2.jpg"
    }
  },
  {
    path: '/portfolio',
    name: 'portfolio',
    component: () => import('@/pages/Portfolio.vue'),
    meta: {
      title: 'Портфолио — Monamorev Photographer',
      desc: 'Примеры фотосессий: свадьбы, портреты, мероприятия.',
      ogImage: "https://monamorew-photographer.ru/pictures/album-grid/1/2.jpg"
    }
  },
  {
    path: '/contacts',
    name: 'contacts',
    component: () => import('@/pages/Contacts.vue'),
    meta: {
      title: 'Контакты — Monamorev Photographer',
      desc: 'Свяжитесь с Юлией Коваленко: телефон, e-mail, соцсети.',
      ogImage: "https://monamorew-photographer.ru/pictures/album-grid/1/2.jpg"
    }
  },
  {
    path: '/albums',
    name: 'albums',
    component: () => import('@/pages/Albums.vue'),
    meta: {
      title: 'Портфолио — monamorev photographer',
      desc: 'Фотоальбомы и подборки профессиональных фотосессий.',
      ogImage: "https://monamorew-photographer.ru/pictures/album-grid/1/2.jpg"
    }
  },
  {
    path: '/albums/:id',
    name: 'grid',
    component: () => import('@/pages/Grid.vue'),
    props: true,
    meta: {
      title: 'Галерея альбома — Monamorev Photographer',
      desc: 'Отдельный альбом с фотосессией и подробностями.',
      ogImage: "https://monamorew-photographer.ru/pictures/album-grid/1/2.jpg"
    }
  },
  {
    path: '/:pathMatch(.*)*',
  name: 'NotFound',
  component: () => import('@/pages/NotFound.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: () => ({ top: 0 }),
})

// вспомогательная функция для обновления или создания мета-тега
function updateMeta(selector, attr, value) {
  let tag = document.querySelector(selector)
  if (!tag) {
    tag = document.createElement('meta')
    if (attr === 'name') tag.setAttribute('name', selector.match(/name="([^"]+)"/)[1])
    if (attr === 'property') tag.setAttribute('property', selector.match(/property="([^"]+)"/)[1])
    document.head.appendChild(tag)
  }
  tag.setAttribute(attr, attr === 'name' ? selector.match(/name="([^"]+)"/)[1] : selector.match(/property="([^"]+)"/)[1])
  tag.setAttribute('content', value)
}

router.afterEach((to) => {
  const title = to.meta?.title || 'Monamorev Photographer'
  const desc = to.meta?.desc || 'Monamorev Photographer — портфолио и услуги фотографа Юлии Коваленко.'
  const ogImage = to.meta?.ogImage || "https://monamorew-photographer.ru/pictures/album-grid/1/2.jpg"
  const url = "https://monamorew-photographer.ru" + to.fullPath
  // title
  document.title = title

  // description
  updateMeta('meta[name="description"]', 'name', desc)

  // Open Graph
  updateMeta('meta[property="og:title"]', 'property', title)
  updateMeta('meta[property="og:description"]', 'property', desc)
  updateMeta('meta[property="og:image"]', 'property', ogImage)

    // JSON-LD
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": to.path === '/' ? "WebSite" : "WebPage", 
      "name": title,
      "description": desc,
      "url": url,
      "image": ogImage,
      "publisher": {
        "@type": "Organization",
        "name": "ltm.studio",
        "url": "https://ltm.studio"
      }
    }
  
    // удаляем старый JSON-LD, если есть
    const old = document.getElementById('json-ld')
    if (old) old.remove()
  
    // добавляем новый
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.id = 'json-ld'
    script.textContent = JSON.stringify(jsonLd)
    document.head.appendChild(script)
})

export default router
