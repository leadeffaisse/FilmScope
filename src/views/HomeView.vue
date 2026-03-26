<template>
  <div class="app">
    <h1>🎬 FilmScope</h1>

    <!-- v-model fonctionne grâce au pattern modelValue dans SearchBar -->
    <SearchBar v-model="searchQuery" />

    <!-- Nombre de résultats — se met à jour automatiquement -->
    <p>{{ filteredFilms.length }} film(s) trouvé(s)</p>

    <!-- v-if sur filteredFilms pour le message "aucun résultat" -->
    <p v-if="filteredFilms.length === 0">Aucun résultat pour "{{ searchQuery }}"</p>

    <div v-else class="film-grid">
      <!-- :film passe le film en prop -->
      <!-- @toggle-favorite écoute l'événement émis par FilmCard -->
      <FilmCard
        v-for="film in filteredFilms"
        :key="film.id"
        :film="film"
        :is-fav="favoriteStore.isFavorite(film.id)"
        @toggle-favorite="favoriteStore.toggleFavorite"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import SearchBar from '@/components/SearchBar.vue'
import FilmCard from '@/components/FilmCard.vue'
import { useFavoriteStore } from '@/stores/favoriteStore.js'

const favoriteStore = useFavoriteStore()

// ref() sur une string - la valeur initiale est une chaîne vide
const searchQuery = ref('')

const allFilms = ref([
  { id: 1, title: 'Dune', year: 2001, rating: 7.8 },
  { id: 2, title: 'East', year: 2002, rating: 3.8 },
  { id: 3, title: 'France', year: 2003, rating: 5.8 },
  { id: 4, title: 'Science', year: 2004, rating: 1.8 },
])

// computed() : recalculé automatiquement quand searchQuery ou allFilms changent
// Lecture seule — on ne fait jamais filteredFilms.value = quelquechose
const filteredFilms = computed(() => {
  // Si la recherche est vide, on retourne tout
  if (!searchQuery.value) return allFilms.value

  // Sinon, on filtre (insensible à la casse)
  return allFilms.value.filter((film) =>
    film.title.toLowerCase().includes(searchQuery.value.toLowerCase()),
  )
})

onMounted(() => {
  favoriteStore.initStore() // restaure les favoris depuis localStorage
})
</script>

<style scoped>
.app {
  font-family: Arial, sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
}
</style>
