<script setup>
import FilmCard from '@/components/FilmCard.vue'
import { useFavoriteStore } from '@/stores/favoriteStore'

const favoriteStore = useFavoriteStore()
</script>

<template>
  <div>
    <h2>❤️ Mes favoris</h2>

    <p v-if="favoriteStore.favoriteCount === 0">Aucun favori pour l'instant.</p>

    <div v-else class="film-grid">
      <FilmCard
        v-for="film in favoriteStore.favorites"
        :key="film.id"
        :film="film"
        :is-fav="true"
        @toggle-favorite="favoriteStore.toggleFavorite"
      />
    </div>
  </div>
</template>

<style scoped></style>
