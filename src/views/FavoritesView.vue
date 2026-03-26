<script setup>
import FilmCard from '@/components/FilmCard.vue'
import { useFavoriteStore } from '@/stores/favoriteStore'

const favoriteStore = useFavoriteStore()
</script>

<template>
  <div class="favorites">
    <h2>❤️ Mes favoris</h2>
    <p class="count">{{ favoriteStore.favoriteCount }} film(s)</p>

    <p v-if="favoriteStore.favoriteCount === 0" class="empty">Aucun favori pour l'instant.</p>

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

<style scoped>
.favorites {
  max-width: 1400px;
  margin: 0 auto;
  padding: 1rem;
}

.count {
  color: #888;
  font-size: 0.9rem;
  margin: 0 0 1rem;
}

.empty {
  color: #aaa;
  font-style: italic;
  margin-top: 2rem;
  text-align: center;
}

.film-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 1.5rem;
  margin-top: 1rem;
}
</style>
