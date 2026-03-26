<template>
  <div class="app">
    <h1>🎬 FilmScope</h1>

    <!-- v-model fonctionne grâce au pattern modelValue dans SearchBar -->
    <div class="controls">
      <SearchBar v-model="searchQuery" />
    </div>

    <div v-if="isLoading">Chargement...</div>

    <div v-else-if="error">
      {{ error }}
      <button @click="loadPopularFilms">Réessayer</button>
    </div>

    <div v-else class="film-grid">
      <!-- :film passe le film en prop -->
      <!-- @toggle-favorite écoute l'événement émis par FilmCard -->
      <FilmCard
        v-for="film in displayedFilms"
        :key="film.id"
        :film="film"
        :is-fav="favoriteStore.isFavorite(film.id)"
        @toggle-favorite="favoriteStore.toggleFavorite"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import SearchBar from '@/components/SearchBar.vue'
import FilmCard from '@/components/FilmCard.vue'
import { useFavoriteStore } from '@/stores/favoriteStore.js'
import { getPopularFilms, searchFilms } from '@/services/tmdbService.js'

const favoriteStore = useFavoriteStore()

// ref() sur une string - la valeur initiale est une chaîne vide
const searchQuery = ref('')
const popularFilms = ref([])
const searchResults = ref([])
const isLoading = ref(false)
const error = ref(null)

// Affiche les résultats de recherche sinon les films populaires
const displayedFilms = computed(() =>
  searchQuery.value ? searchResults.value : popularFilms.value,
)

async function loadPopularFilms() {
  isLoading.value = true
  error.value = null
  try {
    popularFilms.value = await getPopularFilms()
  } catch (e) {
    error.value = 'Impossible de charger les films.'
  } finally {
    isLoading.value = false
  }
}

watch(searchQuery, async (newQuery) => {
  if (!newQuery) {
    searchResults.value = []
    return
  }
  isLoading.value = true
  try {
    searchResults.value = await searchFilms(newQuery)
  } catch (e) {
    error.value = 'Erreur lors de la recherche.'
  } finally {
    isLoading.value = false
  }
})

onMounted(() => {
  loadPopularFilms()
  favoriteStore.initStore() // restaure les favoris depuis localStorage
})
</script>

<style scoped>
.app {
  font-family: Arial, sans-serif;
  max-width: 1400px;
  margin: 0 auto;
  padding: 1rem;
}

.controls {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.film-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 1.5rem;
}
</style>
