<template>
  <div class="app">
    <h1>🎬 FilmScope</h1>

    <!-- v-model lie l'input à searchQuery dans les deux sens -->
    <input v-model="searchQuery" placeholder="Rechercher un film..." class="search-input" />

    <!-- Nombre de résultats — se met à jour automatiquement -->
    <p>{{ filteredFilms.length }} film(s) trouvé(s)</p>

    <!-- v-if sur filteredFilms pour le message "aucun résultat" -->
    <p v-if="filteredFilms.length === 0">Aucun résultat pour "{{ searchQuery }}"</p>

    <div v-else class="film-grid">
      <div v-for="film in filteredFilms" :key="film.id" class="film-card">
        <h3>{{ film.title }}</h3>
        <p>{{ film.year }} — ⭐ {{ film.rating }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const allFilms = ref([
  { id: 1, title: 'Dune', year: 2001, rating: 7.8 },
  { id: 2, title: 'East', year: 2002, rating: 7.8 },
  { id: 3, title: 'France', year: 2003, rating: 7.8 },
  { id: 4, title: 'Science', year: 2004, rating: 7.8 },
])

// ref() sur une string - la valeur initiale est une chaîne vide
const searchQuery = ref('')

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
</script>

<style scoped>
.app {
  font-family: Arial, sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
}
</style>
