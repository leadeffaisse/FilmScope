import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const  useFavoriteStore = defineStore('favorites', () => {
  // STATE
  const favorites = ref([])

  // GETTER
  const favoriteCount = computed(() => favorites.value.length)

  function isFavorite(filmID) {
    return favorites.value.some(f => f.id === filmID)
  }

  // ACTION
  function addFavorite(film) {
      favorites.value.push(film)
      _persist()
  }

  function removeFavorite(filmID) {
    favorites.value = favorites.value.filter(f => f.id !== filmID)
    _persist()
  }

  function toggleFavorite(film) {
    isFavorite(film.id) ? removeFavorite(film.id) : addFavorite(film)
  }

  function initStore() {
    const saved = localStorage.getItem('filmscope-favorites')
    if (saved) favorites.value = JSON.parse(saved)
  }

  function _persist() {
    localStorage.setItem('filmscope-favorites', JSON.stringify(favorites.value))
  }

  return {
    favorites,
    favoriteCount,
    isFavorite,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    initStore,
  }
})
