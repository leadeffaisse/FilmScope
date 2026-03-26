<script setup>
import { computed } from 'vue'

const props = defineProps({
  score: {
    type: Number,
    required: true,
  },
})

const roundedScore = computed(() => Math.round((props.score / 10) * 5))
</script>

<template>
  <div class="star-rating">
    <span v-for="star in 5" :key="star" class="star" :class="{ filled: star <= roundedScore }">
      ★
    </span>
  </div>
</template>

<style scoped>
.star-rating {
  display: flex;
  align-items: center;
  gap: 2px;
}

.star {
  font-size: 1.5rem;
  color: #ddd; /* étoile vide */
}

.star.filled {
  color: #f5a623; /* étoile pleine */
}
</style>
