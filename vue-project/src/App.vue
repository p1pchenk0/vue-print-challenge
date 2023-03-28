<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink
          v-for="link in links"
          :key="link.title"
          :to="{ name: link.route }"
        >
          {{ link.title }}
        </RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { RouteNames } from '@/router';

const links = [
  { title: 'Posters', route: RouteNames.Posters },
  { title: 'Flyers', route: RouteNames.Flyers },
  { title: 'Business cards', route: RouteNames.BusinessCards }
];
</script>

<style scoped lang="scss">
header {
  line-height: 1.5;
}

nav {
  width: 100%;
  text-align: center;
  margin-top: 2rem;

  a {
    font-size: 18px;
    text-decoration: none;
    margin: 0 8px;

    &:active, &.router-link-active {
      color: white;
    }
  }
}
</style>
