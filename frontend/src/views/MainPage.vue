<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import heroImg1 from '@/assets/hero1.png'
import heroImg2 from '@/assets/hero2.png'

import kzMap from '@/assets/kzmap.png'

import avatar1 from '@/assets/ava1.png'
import avatar2 from '@/assets/ava2.png'

const prefersReducedMotion =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

const vReveal = {
  mounted(el, binding) {
    if (prefersReducedMotion) {
      el.classList.add('reveal--visible')
      return
    }

    el.classList.add('reveal')
    if (typeof binding.value === 'number') {
      el.style.transitionDelay = `${binding.value}ms`
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('reveal--visible')
          observer.unobserve(el)
        }
      },
      { threshold: 0.15 }
    )
    observer.observe(el)
  },
}

const menuOpen = ref(false)
const isScrolled = ref(false)

function handleScroll() {
  isScrolled.value = window.scrollY > 12
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  handleScroll()
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})

const steps = [
  {
    number: '01',
    title: 'Вступи в волонтёрскую сеть',
    text: 'Зарегистрируйся за пару минут и заполни короткую анкету о своих интересах.',
  },
  {
    number: '02',
    title: 'Получи доступ к проектам',
    text: 'Смотри проверенные мероприятия рядом с тобой и выбирай то, что откликается.',
  },
  {
    number: '03',
    title: 'Начинай помогать',
    text: 'Записывайся, приходи и получай подтверждённые часы волонтёрства.',
  },
]

const stories = [
  {
    name: 'Мадина Смагулова',
    role: 'Волонтёр, г. Алматы',
    text: '«Благодаря платформе я нашла свой первый проект уже в первую неделю — теперь помогаю приюту для животных каждые выходные.»',
    image: avatar1,
  },
  {
    name: 'Асхат Бектуров',
    role: 'Наставник, г. Астана',
    text: '«Я курирую группу подростков-волонтёров — удобно, что вся коммуникация и учёт часов в одном месте.»',
    image: avatar2,
  },
]

const events = [
  {
    date: '14 октября, 18:00',
    status: 'Экология',
    tone: 'warm',
    title: 'Облагораживание парка и уборка мусора',
    location: 'Алматы, ул. Достык 105',
  },
  {
    date: '18 октября, 10:00',
    status: 'Обучение',
    tone: 'accent',
    title: 'Творческий мастер-класс для детей',
    location: 'Астана, ул. Кенесары 40',
  },
  {
    date: '21 октября, 09:00',
    status: 'Волонтерские услуги',
    tone: 'sage',
    title: 'Благотворительный забег в поддержку хосписа',
    location: 'Шымкент, парк Абая',
  },
]

const partners = [
  'Дом с сердцем',
  'Клуб молодых лидеров',
  'Ассоциация волонтёров Казахстана',
  'Голос современного города',
  'Люди в белом',
]

const footerProjects = ['О проекте', 'Наша команда', 'Новости', 'Партнёрам']

const footerParticipation = [
  'Стать волонтёром',
  'Создать проект',
  'Стать партнёром',
  'Частые вопросы',
]
</script>

<template>
    <div class="volunteer-page">
      <!-- ==================== HEADER ==================== -->
      <header class="site-header" :class="{ 'is-scrolled': isScrolled }">
        <div class="page-container site-header__inner">
          <a class="brand" href="#" aria-label="VolunTeen">
            <span class="brand__mark">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 21s-7-4.35-9.5-8.5C.6 8.9 2 5 6 5c2 0 3.3 1 4.5 2.4C11.7 6 13 5 15 5c4 0 5.4 3.9 3.5 7.5C19 16.65 12 21 12 21z" fill="currentColor"/>
              </svg>
            </span>
            <span class="brand__name">VolunTeen</span>
          </a>
  
          <nav class="site-nav" :class="{ 'is-open': menuOpen }" aria-label="Основная навигация">
            <a href="#about" @click="menuOpen = false">О проекте</a>
            <a href="#how-it-works" @click="menuOpen = false">Как это работает</a>
            <a href="#stories" @click="menuOpen = false">Истории</a>
            <a href="#events" @click="menuOpen = false">Мероприятия</a>
            <a href="#partners" @click="menuOpen = false">Партнёры</a>
          </nav>
  
          <div class="site-header__actions">
            <a class="button button--text" href="#">Войти</a>
            <a class="button button--primary" href="#">Регистрация</a>
          </div>
  
          <button
            class="menu-button"
            type="button"
            :class="{ 'is-open': menuOpen }"
            :aria-expanded="menuOpen"
            aria-label="Открыть меню"
            @click="menuOpen = !menuOpen"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </header>
  
      <main>
        <!-- ==================== HERO ==================== -->
        <section class="hero" id="about">
          <div class="page-container hero__inner">
            <div class="hero__content" v-reveal="0">
              <p class="section-eyebrow">Присоединяйся к волонтёрскому движению</p>
              <h1 class="hero__title">VolunTeen — site of your volunteering.</h1>
              <p class="hero__description">
                Платформа, которая помогает подросткам Казахстана находить проверенные
                волонтёрские проекты и получать опыт, который меняет будущее.
              </p>
              <div class="hero__actions">
                <a class="button button--primary button--large" href="#events">
                  Начать волонтёрить
                </a>
                <a class="button button--outline button--large" href="#how-it-works">
                  Узнать больше
                </a>
              </div>
            </div>
  
            <div class="hero__visual" v-reveal="150" aria-hidden="true">
              <div class="hero__image hero__image--large">
                <img :src="heroImg1" alt="Волонтёры" />
              </div>
              <div class="hero__image hero__image--small">
                <img :src="heroImg2" alt="Волонтёрская деятельность" />
              </div>
              <div class="hero__decor hero__decor--one"></div>
              <div class="hero__decor hero__decor--two"></div>
            </div>
          </div>
        </section>
  
        <!-- ==================== COUNTRY BANNER ==================== -->
        <section class="country-banner">
          <img class="country-banner__shape" :src="kzMap" alt="Карта Казахстана" />
          <p class="country-banner__text" v-reveal="0">
            Большая страна — не преграда: найди новые возможности в каждой точке Казахстана!
          </p>
        </section>
  
        <!-- ==================== HOW IT WORKS ==================== -->
        <section class="steps-section" id="how-it-works">
          <div class="page-container">
            <div class="section-heading section-heading--center" v-reveal="0">
              <p class="section-eyebrow">О платформе</p>
              <h2>To become our part...</h2>
              <p>Три простых шага до первого доброго дела.</p>
            </div>
  
            <div class="steps-grid">
              <article
                v-for="(step, index) in steps"
                :key="step.number"
                class="step-card"
                v-reveal="index * 90"
              >
                <div class="step-card__top">
                  <span class="step-card__number">{{ step.number }}</span>
                  <span class="step-card__dot"></span>
                </div>
                <h3>{{ step.title }}</h3>
                <p>{{ step.text }}</p>
              </article>
            </div>
          </div>
        </section>
  
        <!-- ==================== STORIES ==================== -->
        <section class="stories-section" id="stories">
          <div class="page-container">
            <div class="section-heading section-heading--center" v-reveal="0">
              <p class="section-eyebrow">Истории</p>
              <h2>Люди, которые меняют мир</h2>
            </div>
  
            <div class="stories-grid">
              <article
                v-for="(story, index) in stories"
                :key="story.name"
                class="story-card"
                :class="index % 2 === 1 && 'story-card--alt'"
                v-reveal="index * 110"
              >
                <div class="story-card__visual">
                  <img class="story-card__photo" :src="story.image" :alt="story.name" />
                </div>
  
                <div class="story-card__body">
                  <p class="story-card__quote">{{ story.text }}</p>
                  <div class="story-card__author">
                    <span class="avatar">{{ story.name.charAt(0) }}</span>
                    <span class="story-card__author-info">
                      <strong>{{ story.name }}</strong>
                      <span>{{ story.role }}</span>
                    </span>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </section>
  
        <!-- ==================== EVENTS ==================== -->
        <section class="events-section" id="events">
          <div class="page-container">
            <div class="section-heading section-heading--row" v-reveal="0">
              <div>
                <p class="section-eyebrow">Мероприятия</p>
                <h2>Ближайшие встречи и добрые дела</h2>
              </div>
              <a class="text-link" href="#">Смотреть все события <span>→</span></a>
            </div>
  
            <div class="events-grid">
              <article
                v-for="(event, index) in events"
                :key="event.title"
                class="event-card"
                v-reveal="index * 90"
              >
                <div class="event-card__top">
                  <span class="event-card__date">{{ event.date }}</span>
                  <span class="chip" :class="`chip--${event.tone}`">{{ event.status }}</span>
                </div>
                <h3>{{ event.title }}</h3>
                <div class="event-card__location">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 22s7-6.1 7-12A7 7 0 0 0 5 10c0 5.9 7 12 7 12Z" stroke="currentColor" stroke-width="1.6"/>
                    <circle cx="12" cy="10" r="2.4" stroke="currentColor" stroke-width="1.6"/>
                  </svg>
                  <span>{{ event.location }}</span>
                </div>
                <a class="text-link text-link--sm" href="#">Подробнее <span>→</span></a>
              </article>
            </div>
          </div>
          <div class="partners" id="partners" v-reveal="0">
              <p class="partners__title">Наши партнёры по всей стране</p>
              <div class="partners__row">
                <span v-for="partner in partners" :key="partner" class="partners__name">
                  {{ partner }}
                </span>
              </div>
            </div>
        </section>
  
        <!-- ==================== CTA ==================== -->
        <section class="cta-section">
          <div class="page-container">
            <div class="cta-card" v-reveal="0">
              <div class="cta-card__blob" aria-hidden="true"></div>
              <div class="cta-card__content">
                <h2>Сделайте первый тёплый шаг уже сегодня</h2>
                <p>
                  Присоединяйтесь к тысячам волонтёров, которые уже меняют жизнь людей
                  вокруг — начать можно с одного маленького дела.
                </p>
              </div>
              <div class="cta-card__actions">
                <a class="button button--light button--large" href="#">Стать волонтёром</a>
                <a class="button button--outline-light button--large" href="#">Посмотреть события</a>
              </div>
            </div>
          </div>
        </section>
      </main>
  
      <!-- ==================== FOOTER ==================== -->
      <footer class="site-footer">
        <div class="page-container">
          <div class="site-footer__top">
            <div class="site-footer__brand">
              <a class="brand" href="#">
                <span class="brand__mark">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 21s-7-4.35-9.5-8.5C.6 8.9 2 5 6 5c2 0 3.3 1 4.5 2.4C11.7 6 13 5 15 5c4 0 5.4 3.9 3.5 7.5C19 16.65 12 21 12 21z" fill="currentColor"/>
                  </svg>
                </span>
                <span class="brand__name">VolunTeen</span>
              </a>
              <p>
                Помогаем подросткам Казахстана находить проверенные волонтёрские
                проекты и превращать неравнодушие в реальные добрые дела.
              </p>
            </div>
  
            <div class="footer-column">
              <h3>Проект</h3>
              <a v-for="item in footerProjects" :key="item" href="#">{{ item }}</a>
            </div>
  
            <div class="footer-column">
              <h3>Участие</h3>
              <a v-for="item in footerParticipation" :key="item" href="#">{{ item }}</a>
            </div>
  
            <div class="footer-column">
              <h3>Контакты</h3>
              <a href="mailto:hello@volunteen.kz">hello@volunteen.kz</a>
              <a href="tel:+70000000000">+7 (000) 000-00-00</a>
            </div>
          </div>
  
          <div class="site-footer__bottom">
            <span>© 2026 VolunTeen. Все права защищены.</span>
            <div class="footer-legal">
              <a href="#">Политика конфиденциальности</a>
              <a href="#">Пользовательское соглашение</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
</template>

<style scoped>
  /* ==================== BASE ==================== */

  .volunteer-page {
    width: 100%;
    overflow: hidden;
    background: var(--color-background);
    color: var(--color-text);
    font-family: var(--font-sans);
  }

  .page-container {
    width: min(1200px, calc(100% - 80px));
    margin: 0 auto;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button,
  a {
    -webkit-tap-highlight-color: transparent;
  }

  .image-placeholder {
    width: 100%;
    height: 100%;
    background: var(--color-surface-purple);
  }

  /* ==================== TYPOGRAPHY ==================== */

  .section-eyebrow {
    margin: 0 0 16px;
    color: var(--color-secondary);
    font-family: var(--font-sans);
    font-size: 14px;
    font-weight: 700;
    line-height: 1.2;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .section-heading {
    max-width: 760px;
    margin-bottom: 56px;
  }

  .section-heading h2 {
    margin: 0;
    color: var(--color-text);
    font-family: var(--font-serif);
    font-size: clamp(36px, 4.5vw, 52px);
    font-weight: 500;
    line-height: 1.15;
    letter-spacing: -0.02em;
  }

  .section-heading > p:last-child {
    max-width: 620px;
    margin: 20px 0 0;
    color: var(--color-text-secondary);
    font-family: var(--font-body-serif);
    font-size: 17px;
    line-height: 1.6;
  }

  .section-heading--row {
    max-width: none;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 40px;
  }

  .section-heading--row > div {
    max-width: 760px;
    margin-bottom: 0;
  }

  .section-heading--center {
    margin-right: auto;
    margin-left: auto;
    text-align: center;
  }

  .section-heading--center > p:last-child {
    margin-right: auto;
    margin-left: auto;
  }

  .text-link {
    flex: 0 0 auto;
    display: inline-flex;
    align-items: center;
    color: var(--color-primary);
    font-family: var(--font-body-serif);
    font-size: 16px;
    font-weight: 700;
    white-space: nowrap;
  }

  .text-link span {
    margin-left: 6px;
  }

  .text-link--sm {
    margin-top: auto;
    font-size: 14px;
  }

  /* ==================== BUTTONS ==================== */

  .button {
    min-height: 48px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 12px 24px;
    border: 1px solid transparent;
    border-radius: var(--border-radius-pill);
    font-family: var(--font-sans);
    font-size: 15px;
    font-weight: 700;
    line-height: 1;
    cursor: pointer;
    transition: transform 160ms ease, background-color 160ms ease, border-color 160ms ease;
  }

  .button:hover {
    transform: translateY(-2px);
  }

  .button--large {
    min-height: 56px;
    padding: 16px 30px;
  }

  .button--primary {
    background: var(--color-primary);
    color: var(--color-text-on-accent);
  }

  .button--outline {
    border-color: var(--color-primary);
    background: transparent;
    color: var(--color-primary);
  }

  .button--text {
    background: transparent;
    color: var(--color-text);
  }

  .button--light {
    background: var(--color-surface);
    color: var(--color-primary);
  }

  .button--outline-light {
    background: transparent;
    border-color: rgba(255, 255, 255, 0.6);
    color: var(--color-text-on-accent);
  }

  /* ==================== HEADER ==================== */

  .site-header {
    position: relative;
    z-index: 10;
    background: var(--color-background);
    border-bottom: 1px solid var(--color-border);
  }

  .site-header__inner {
    min-height: 88px;
    display: flex;
    align-items: center;
    gap: 32px;
  }

  .brand {
    flex: 0 0 auto;
    display: inline-flex;
    align-items: center;
    gap: 10px;
    color: var(--color-primary);
  }

  .brand__mark {
    width: 34px;
    height: 34px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background: var(--color-primary);
    color: var(--color-text-on-accent);
  }

  .brand__mark svg {
    width: 16px;
    height: 16px;
  }

  .brand__name {
    font-family: var(--font-serif);
    font-size: 20px;
    font-weight: 600;
    white-space: nowrap;
  }

  .site-nav {
    flex: 1;
    display: flex;
    justify-content: center;
    gap: clamp(16px, 2vw, 32px);
  }

  .site-nav a {
    color: var(--color-text-secondary);
    font-size: 14px;
    font-weight: 500;
    white-space: nowrap;
  }

  .site-header__actions {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .menu-button {
    display: none;
    width: 44px;
    height: 44px;
    padding: 10px;
    border: 0;
    background: transparent;
    cursor: pointer;
  }

  .menu-button span {
    width: 100%;
    height: 2px;
    display: block;
    margin: 5px 0;
    background: var(--color-text);
  }

  /* ==================== HERO ==================== */

  .hero {
    padding: 88px 0 96px;
    background: var(--color-background);
  }

  .hero__inner {
    min-height: 520px;
    display: grid;
    grid-template-columns: minmax(0, 0.95fr) minmax(420px, 1.05fr);
    align-items: center;
    gap: 64px;
  }

  .hero__content {
    position: relative;
    z-index: 2;
  }

  .hero__title {
    max-width: 620px;
    margin: 0;
    color: var(--color-text);
    font-family: var(--font-serif);
    font-size: clamp(34px, 4.2vw, 52px);
    font-weight: 600;
    line-height: 1.25;
    letter-spacing: -0.02em;
  }

  .hero__description {
    max-width: 500px;
    margin: 28px 0 0;
    color: var(--color-text-secondary);
    font-family: var(--font-body-serif);
    font-size: 18px;
    line-height: 1.6;
  }

  .hero__actions {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin-top: 36px;
  }

  .hero__visual {
    position: relative;
    min-height: 520px;
  }

  .hero__image {
    position: absolute;
    overflow: hidden;
    border-radius: var(--border-radius-xl);
  }

  .hero__image--large {
    width: min(82%, 480px);
    height: 460px;
    top: 0;
    right: 0;
    background: var(--color-surface-purple);
  }

  .hero__image--small {
    width: 45%;
    height: 260px;
    bottom: 0;
    left: 0;
    z-index: 2;
    border: 12px solid var(--color-background);
    background: var(--color-surface-green);
  }

  .hero__image--small .image-placeholder {
    background: var(--color-surface-green);
  }

  .hero__decor {
    position: absolute;
    z-index: 3;
    border-radius: 50%;
  }

  .hero__decor--one {
    width: 80px;
    height: 80px;
    top: 32px;
    left: 4%;
    background: var(--color-accent);
  }

  .hero__decor--two {
    width: 56px;
    height: 56px;
    right: 2%;
    bottom: 44px;
    background: var(--color-secondary);
  }

  /* ==================== COUNTRY BANNER ==================== */

  .country-banner {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 620px;
    padding: 40px 3%;
    background: var(--color-surface-purple);
    overflow: hidden;
  }

  .country-banner__shape {
    position: absolute;
    width: 1000px;
    height: auto;
    color: var(--color-surface-purple-accent);
    opacity: 0.7;
  }

  .country-banner__text {
    position: relative;
    max-width: 720px;
    margin: 0;
    text-align: center;
    color: var(--color-text);
    font-family: var(--font-serif);
    font-size: clamp(20px, 3.6vw, 42px);
    font-weight: 600;
    line-height: 1.5;
  }

  /* ==================== STEPS ==================== */

  .steps-section {
    padding: 120px 0;
    background: var(--color-background);
  }

  .steps-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 40px;
    text-align: left;
  }

  .step-card__top {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .step-card__number {
    color: var(--color-text);
    font-family: var(--font-serif);
    font-size: 44px;
    font-weight: 600;
    line-height: 1;
  }

  .step-card__dot {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: var(--color-surface-purple);
  }

  .step-card h3 {
    margin: 16px 0 0;
    color: var(--color-text);
    font-family: var(--font-sans);
    font-size: 19px;
    font-weight: 700;
    line-height: 1.3;
  }

  .step-card p {
    margin: 10px 0 0;
    color: var(--color-primary);
    opacity: 0.75;
    font-family: var(--font-body-serif);
    font-size: 15px;
    line-height: 1.6;
  }

  /* ==================== STORIES ==================== */

  .stories-section {
    padding: 120px 0;
    background: var(--color-surface-green);
  }

  .stories-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
  }

  .story-card {
    display: flex;
    overflow: hidden;
    border-radius: var(--border-radius-lg);
    background: var(--color-surface);
    box-shadow: var(--shadow-card);
  }

  .story-card--alt .story-card__visual .image-placeholder {
    background: var(--color-surface-warm);
  }

  .story-card__visual {
    width: 40%;
    flex-shrink: 0;
    min-height: 260px;
  }

  .story-card__body {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 10px;
    padding: 42px;
  }

  .story-card__quote {
    margin: 0;
    color: var(--color-text);
    font-family: var(--font-body-serif);
    font-size: 15px;
    line-height: 1.6;
  }

  .story-card__author {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .story-card__author-info {
    display: flex;
    flex-direction: column;
    font-size: 13px;
  }

  .story-card__author-info strong {
    color: var(--color-text);
    font-size: 14px;
  }

  .story-card__author-info span {
    color: var(--color-text-secondary);
  }

  .avatar {
    width: 40px;
    height: 40px;
    flex-shrink: 0;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background: var(--color-surface-green);
    color: var(--color-secondary);
    font-weight: 700;
  }

  /* ==================== EVENTS ==================== */

  .events-section {
    padding: 120px 0;
    background: var(--color-background);
  }

  .events-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
  }

  .event-card {
    display: flex;
    flex-direction: column;
    gap: 14px;
    padding: 24px;
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius-lg);
    background: var(--color-surface);
  }

  .event-card__top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
  }

  .event-card__date {
    color: var(--pr-coral-500);
    font-family: var(--font-sans);
    font-size: 13px;
    font-weight: 700;
  }

  .event-card h3 {
    margin: 0;
    color: var(--color-text);
    font-family: var(--font-serif);
    font-size: 21px;
    font-weight: 600;
    line-height: 1.3;
  }

  .chip {
    display: inline-flex;
    align-items: center;
    padding: 4px 12px;
    border-radius: var(--border-radius-pill);
    font-family: var(--font-sans);
    font-size: 12px;
    font-weight: 700;
    white-space: nowrap;
  }

  .chip--warm {
    background: var(--pr-cream-100);
    color: var(--pr-coral-500);
  }

  .chip--accent {
    background: var(--color-surface-purple-accent);
    color: var(--color-primary);
  }

  .chip--sage {
    background: var(--color-surface-green);
    color: var(--color-secondary);
  }

  .event-card__location {
    display: flex;
    align-items: center;
    gap: 8px;
    padding-top: 12px;
    border-top: 1px solid var(--color-border);
    color: var(--color-text-secondary);
    font-family: var(--font-sans);
    font-size: 13px;
  }

  .event-card__location svg {
    width: 16px;
    height: 16px;
    flex-shrink: 0;
  }

  .partners {
    margin-top: 64px;
    padding: 24px 0 24px 0;
    width: 100%;
    text-align: center;
    border: 2px solid var(--color-border);
    background-color: var(--color-surface);
    border-left: 0;
    border-right: 0;
  }

  .partners__title {
    margin: 0;
    color: var(--color-text-secondary);
    font-family: var(--font-sans);
    font-size: 16px;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }

  .partners__row {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 28px;
    margin-top: 16px;
  }

  .partners__name {
    color: var(--color-text-secondary);
    font-family: var(--font-serif);
    font-size: 16px;
    font-weight: 500;
  }

  /* ==================== CTA ==================== */

  .cta-section {
    padding: 0 0 120px;
  }

  .cta-card {
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    padding: 32px 5%;
    border-radius: var(--border-radius-xl);
    background: var(--color-primary);
    color: var(--color-text-on-accent);
    text-align: center;
  }

  .cta-card__blob {
    position: absolute;
    right: -70px;
    bottom: -70px;
    width: 240px;
    height: 240px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.08);
  }

  .cta-card__content {
    position: relative;
    max-width: 600px;
  }

  .cta-card__content h2 {
    margin: 0;
    font-family: var(--font-serif);
    font-size: clamp(28px, 3.4vw, 38px);
    font-weight: 600;
    line-height: 1.3;
  }

  .cta-card__content p {
    max-width: 480px;
    margin: 20px auto 0;
    font-family: var(--font-body-serif);
    font-size: 16px;
    line-height: 1.6;
    opacity: 0.85;
  }

  .cta-card__actions {
    position: relative;
    display: flex;
    gap: 14px;
    flex-wrap: wrap;
    justify-content: center;
  }

  /* ==================== FOOTER ==================== */

  .site-footer {
    padding: 72px 0 28px;
    background: var(--color-surface-warm);
  }

  .site-footer__top {
    display: grid;
    grid-template-columns: 2fr repeat(3, 1fr);
    gap: 48px;
    padding-bottom: 64px;
  }

  .site-footer__brand {
    max-width: 330px;
  }

  .site-footer__brand > p {
    margin: 20px 0 0;
    color: var(--color-text-secondary);
    font-family: var(--font-body-serif);
    font-size: 15px;
    line-height: 1.6;
  }

  .footer-column {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }

  .footer-column h3 {
    margin: 0 0 8px;
    color: var(--color-text);
    font-family: var(--font-sans);
    font-size: 14px;
    font-weight: 700;
  }

  .footer-column a {
    color: var(--color-text-secondary);
    font-family: var(--font-body-serif);
    font-size: 14px;
  }

  .site-footer__bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
    padding-top: 24px;
    border-top: 1px solid var(--color-border);
    color: var(--color-text-secondary);
    font-size: 12px;
  }

  .footer-legal {
    display: flex;
    flex-wrap: wrap;
    gap: 24px;
  }

  /* ==================== RESPONSIVE ==================== */

  @media (max-width: 1050px) {
    .page-container {
      width: min(calc(100% - 48px), 900px);
    }

    .site-nav {
      gap: 16px;
    }

    .site-nav a {
      font-size: 13px;
    }

    .hero__inner {
      grid-template-columns: minmax(0, 1fr) minmax(340px, 0.9fr);
      gap: 36px;
    }

    .hero__visual {
      min-height: 440px;
    }

    .hero__image--large {
      height: 380px;
    }

    .hero__image--small {
      height: 210px;
    }

    .site-footer__top {
      grid-template-columns: 1.5fr repeat(3, 1fr);
      gap: 28px;
    }
  }

  @media (max-width: 800px) {
    .page-container {
      width: min(calc(100% - 40px), 640px);
    }

    .site-header__inner {
      min-height: 72px;
    }

    .site-nav,
    .site-header__actions {
      display: none;
    }

    .menu-button {
      display: block;
      margin-left: auto;
    }

    .hero {
      padding: 56px 0 72px;
    }

    .hero__inner {
      grid-template-columns: 1fr;
      min-height: auto;
    }

    .hero__content {
      text-align: center;
    }

    .hero__actions {
      justify-content: center;
    }

    .hero__visual {
      min-height: 400px;
    }

    .steps-section,
    .stories-section,
    .events-section {
      padding: 88px 0;
    }

    .steps-grid,
    .events-grid,
    .stories-grid {
      grid-template-columns: 1fr;
    }

    .story-card {
      flex-direction: column;
    }

    .story-card__visual {
      width: 100%;
      height: 220px;
    }

    .section-heading--row {
      align-items: flex-start;
      flex-direction: column;
    }

    .cta-section {
      padding-bottom: 88px;
    }

    .site-footer__top {
      grid-template-columns: repeat(2, 1fr);
    }

    .site-footer__brand {
      grid-column: 1 / -1;
    }
  }

  @media (max-width: 520px) {
    .page-container {
      width: min(calc(100% - 32px), 460px);
    }

    .hero__actions {
      flex-direction: column;
      align-items: stretch;
    }

    .hero__actions .button {
      width: 100%;
    }

    .hero__visual {
      min-height: 320px;
    }

    .hero__image--large {
      width: 82%;
      height: 280px;
    }

    .hero__image--small {
      width: 48%;
      height: 160px;
      border-width: 8px;
    }

    .country-banner__text {
      font-size: 18px;
    }

    .cta-card__actions {
      flex-direction: column;
      align-items: stretch;
      width: 100%;
    }

    .site-footer__top {
      grid-template-columns: 1fr 1fr;
      gap: 40px 24px;
    }

    .site-footer__bottom {
      align-items: flex-start;
      flex-direction: column;
    }

    .footer-legal {
      flex-direction: column;
      gap: 10px;
    }
  }

  /* ==================== ANIMATIONS (added, nothing above changed) ==================== */

  /* Scroll-reveal: base + revealed state driven by the v-reveal directive */
  .reveal {
    opacity: 0;
    transform: translateY(28px);
    transition: opacity 0.7s ease, transform 0.7s ease;
    will-change: opacity, transform;
  }

  .reveal--visible {
    opacity: 1;
    transform: translateY(0);
  }

  /* Header gains depth once the page is scrolled */
  .site-header {
    transition: box-shadow 220ms ease, background-color 220ms ease;
  }

  .site-header.is-scrolled {
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
  }

  /* Functional mobile nav: slide/fade down when opened */
  @media (max-width: 800px) {
    .site-nav {
      display: flex;
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      flex-direction: column;
      align-items: center;
      gap: 20px;
      padding: 24px 0;
      background: var(--color-background);
      border-bottom: 1px solid var(--color-border);
      opacity: 0;
      transform: translateY(-8px);
      pointer-events: none;
      transition: opacity 200ms ease, transform 200ms ease;
    }

    .site-nav.is-open {
      display: flex;
      opacity: 1;
      transform: translateY(0);
      pointer-events: auto;
    }
  }

  /* Animated burger -> X */
  .menu-button span {
    transition: transform 220ms ease, opacity 220ms ease;
  }

  .menu-button.is-open span:nth-child(1) {
    transform: translateY(7px) rotate(45deg);
  }

  .menu-button.is-open span:nth-child(2) {
    opacity: 0;
  }

  .menu-button.is-open span:nth-child(3) {
    transform: translateY(-7px) rotate(-45deg);
  }

  /* Idle float on the hero decor dots */
  .hero__decor--one {
    animation: float-a 6s ease-in-out infinite;
  }

  .hero__decor--two {
    animation: float-b 7s ease-in-out infinite;
  }

  @keyframes float-a {
    0%, 100% { transform: translate(0, 0); }
    50% { transform: translate(4px, -10px); }
  }

  @keyframes float-b {
    0%, 100% { transform: translate(0, 0); }
    50% { transform: translate(-6px, 8px); }
  }

  /* Subtle hover lift on interactive cards */
  .step-card,
  .story-card,
  .event-card {
    transition: transform 220ms ease, box-shadow 220ms ease;
  }

  .step-card:hover,
  .event-card:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-card);
  }

  .story-card:hover {
    transform: translateY(-4px);
  }

  .partners__name {
    transition: color 180ms ease;
  }

  .partners__name:hover {
    color: var(--color-primary);
  }

  @media (prefers-reduced-motion: reduce) {
    .reveal {
      opacity: 1;
      transform: none;
      transition: none;
    }

    .hero__decor--one,
    .hero__decor--two {
      animation: none;
    }

    .button:hover,
    .step-card:hover,
    .event-card:hover,
    .story-card:hover {
      transform: none;
    }
  }
</style>