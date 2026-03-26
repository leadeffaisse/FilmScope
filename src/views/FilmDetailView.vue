<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

// useRoute() : accès aux infos de la route courante (params, query...)
const route = useRoute()
// useRouter() : navigation programmatique
const router = useRouter()

const film = ref(null)

// Données mock dupliquées pour cette partie du kit
const allFilms = [
  { id: 1, title: 'Dune', year: 2001, rating: 7.8 },
  { id: 2, title: 'East', year: 2002, rating: 3.8 },
  { id: 3, title: 'France', year: 2003, rating: 5.8 },
  { id: 4, title: 'Science', year: 2004, rating: 1.8 },
]

onMounted(() => {
  // route.params.id est une string — Number() pour comparer avec les ids numériques
  const id = Number(route.params.id)
  // chercher dans les données mock
  film.value = allFilms.find((f) => f.id === id) ?? null
})
</script>

<template>
  <div class="film-detail">
    <button @click="router.back()">← Retour</button>

    <div v-if="film">
      <h1>{{ film.title }}</h1>
      <p>{{ film.year }} — ⭐ {{ film.rating }}</p>
    </div>

    <p v-else>Film introuvable.</p>
  </div>
</template>
