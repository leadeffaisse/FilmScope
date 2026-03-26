<script setup>
import { useRouter } from 'vue-router'
import StarRating from '@/components/StarRating.vue'
import { getPosterUrl } from '@/services/tmdbService.js'

// defineProps : déclare ce que le parent doit passer
// Le parent écrira : <FilmCard :film="unFilm" />
const props = defineProps({
  film: {
    type: Object,
    required: true,
  },
  isFav: {
    type: Boolean,
    default: false,
  },
})

// defineEmits : déclare les événements que ce composant peut émettre
const emit = defineEmits(['toggle-favorite'])

const router = useRouter()

function goToDetail() {
  router.push(`/film/${props.film.id}`)
}

function toggleFavorite() {
  // On envoie le film entier en payload — le parent fera ce qu'il veut
  emit('toggle-favorite', props.film)
}
</script>

<template>
  <div class="film-card" @click="goToDetail">
    <img :src="getPosterUrl(film.poster_path)" :alt="film.title" class="film-poster" />

    <div class="film-info">
      <h3>{{ film.title }}</h3>
      <p>{{ film.release_date?.slice(0, 4) }}</p>
      <StarRating :score="film.vote_average" />
    </div>

    <!-- @click.stop : empêche le clic de remonter vers la div parente -->
    <!-- Bouton favoris — stoppe la propagation du clic -->
    <button class="fav-btn" @click.stop="toggleFavorite">
      {{ isFav ? '❤️' : '🤍' }}
    </button>
  </div>
</template>

<style scoped>
.film-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1rem;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.film-poster {
  width: 100%;
  height: 260px; /* hauteur fixe — ajuste selon ton goût */
  object-fit: cover; /* recadre sans déformer */
  border-radius: 4px;
}

.film-info {
  flex: 1;
}

.film-info h3 {
  margin: 0 0 0.25rem;
  font-size: 0.95rem;
}

.fav-btn {
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  align-self: flex-end;
}
</style>
