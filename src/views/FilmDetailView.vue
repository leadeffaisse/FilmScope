<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useFavoriteStore } from '@/stores/favoriteStore'
import { getFilmDetail, getPosterUrl } from '@/services/tmdbService.js'
import StarRating from '@/components/StarRating.vue'

const route = useRoute()
const router = useRouter()
const favoriteStore = useFavoriteStore()

const film = ref(null)
const isLoading = ref(false)
const error = ref(null)

const posterUrl = computed(() => getPosterUrl(film.value?.poster_path))

onMounted(async () => {
  isLoading.value = true
  try {
    film.value = await getFilmDetail(route.params.id)
  } catch (e) {
    error.value = 'Film introuvable.'
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <div class="film-detail">
    <button class="back-btn" @click="router.back()">← Retour</button>

    <div v-if="isLoading">Chargement...</div>

    <div v-else-if="error">{{ error }}</div>

    <div v-else-if="film" class="film-content">
      <img :src="posterUrl" :alt="film.title" class="film-poster" />

      <div class="film-info">
        <h1>{{ film.title }}</h1>
        <p class="year">{{ film.release_date?.slice(0, 4) }}</p>
        <StarRating :score="film.vote_average" />
        <p class="overview">{{ film.overview }}</p>

        <button class="fav-btn" @click="favoriteStore.toggleFavorite(film)">
          {{
            favoriteStore.isFavorite(film.id) ? '❤️ Retirer des favoris' : '🤍 Ajouter aux favoris'
          }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.film-detail {
  max-width: 1000px;
  margin: 0 auto;
  padding: 1rem;
}

.back-btn {
  background: none;
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 0.4rem 0.8rem;
  cursor: pointer;
  margin-bottom: 1.5rem;
}

.film-content {
  display: flex;
  gap: 2rem;
  align-items: flex-start;
}

.film-poster {
  width: 280px;
  border-radius: 8px;
  object-fit: cover;
  flex-shrink: 0;
}

.film-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.film-info h1 {
  margin: 0;
}

.year {
  color: #888;
  margin: 0;
}

.overview {
  line-height: 1.6;
  color: #444;
}

.fav-btn {
  align-self: flex-start;
  padding: 0.5rem 1rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  background: none;
  cursor: pointer;
  font-size: 1rem;
}
</style>
