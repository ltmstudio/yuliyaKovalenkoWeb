<script setup lang="ts">
import { useRoute } from 'vue-router'
const route = useRoute()
import { ref } from 'vue'
</script>


<template>
    <section class="contacts">
        <div class="container">
            <div class="adress">
                <div class="name">АДРЕС:
                    <div class="desc">.</div>
                </div>


                <div class="name">ТЕЛЕФОН:
                    <div class="desc"><a href="tel:+79160077127">8 (000) 000-00-00</a></div>
                </div>


                <div class="name">ПОЧТА:
                    <div class="desc"><a href="mailto:igor_brehov@mail.ru">kovalenko_yuliya@mail.ru</a></div>
                </div>


                <div class="socials">
                    <div class="name">СОЦ.СЕТИ:</div>
                    <a href="https://t.me/monamorew" target="_blank" class="social-link">
                        <img src="/pictures/socials/telegr.png" class="social-img"/>
                        <div class="desc">@monamorew</div>
                    </a>
                    <a href="https://www.instagram.com/monamorew/" target="_blank" class="social-link">
                        <img src="/pictures/socials/insta.png" class="social-img"/>
                        <div class="desc">@monamorew</div>
                    </a>
                </div>

                <div class="budget">
                    <div class="desc">ИП</div>
                    <div class="desc">ИНН</div>
                </div>

            </div>
            <div class="photo">
                <img src="/pictures/pic/image5.png" class="signuture"></img>
                <img src="/pictures/pic/image4.jpg" class="profile"></img>
            </div>
        </div>
    </section>
</template>


<style scoped>
.contacts { width: 100%; max-width: var(--max-w); position: sticky; top: 0; z-index: 1; background: var(--color-background); margin: 0 auto; }
.container { width: 100%; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; padding: 0 6%; box-sizing: border-box; gap: 100px; align-items: stretch; justify-content: space-between;}


.adress { display: flex; align-items: center; justify-content: center; padding: 40px 0;box-sizing: border-box; width: -webkit-fill-available;}
.adress { border-bottom: 3px solid var(--color-border); border-top: 3px solid var(--color-border); display: flex; flex-direction: column; color: #fff; font: 14px/1.6 Arial, sans-serif; justify-content: flex-start; align-items: flex-start; gap: 30px; }
.photo { border-bottom: 3px solid var(--color-border); display: flex; align-items: center; justify-content: center; padding: 0 0 40px;box-sizing: border-box; }
.name { color: var(--color-text-muted-4); }
.desc { font-size: 16px; color: #fff; }
a { color: #fff; text-decoration: none; }
.socials { display: flex; flex-direction: column; }
.social-link{display: flex; gap:10px; align-items: center;}
.social-img{height: 20px;}
.photo{display: flex; justify-content: end; align-items: end; gap:60px; width: max-content; justify-self: end;}
.profile {height: clamp(460px, 33.3333333333vw, 480px);border:2px solid #393939; border-radius: 5px;}
.profile img{object-fit: cover; width: 100%;}
img.signuture{height: clamp(86px, 9.72222222222vw, 140px); width: auto;}
.signuture img{object-fit: cover; width: 100%;}

@media(max-width:1024px){
    .container{gap:50px}
    .photo{gap:30px}
}
@media(max-width:768px){
    .container{grid-template-columns: 1fr; padding-bottom: 60px; gap:20px}
    .adress{padding: 20px 0;}
    .photo{justify-content: center; justify-self: center; border-bottom: none; display: flex; flex-direction: column-reverse; align-items: center; position: relative;padding-bottom: 60px;}
    img.signuture{position: absolute; bottom: -20px; height: 100px;}
}
@media(max-width:480px){
    .container{padding-top: 20px; padding-bottom: 24px;}
    .adress{border-bottom: 2px solid var(--color-border); border-top: none;}
    .profile{border: 20px solid #262626;}
    .profile img{border-radius: 45px;}
}
@media(max-width:330px){
    .profile{height: 320px;}
}
</style>