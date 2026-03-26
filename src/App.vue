<template>
  <div class="app">
    <AppNavbar />
    <!-- RouterView = zone où la vue correspondant à la route courante s'affiche -->
    <RouterView />
  </div>
</template>

<script setup>
import AppNavbar from '@/components/AppNavbar.vue'
</script>
