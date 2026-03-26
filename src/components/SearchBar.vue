<script setup>
// Pattern v-model personnalisé sur un composant
// Le parent peut écrire : <SearchBar v-model="query" />
// modelValue + update:modelValue = le contrat du v-model sur composant
defineProps({
  modelValue: {
    type: String,
    default: '',
  },
})

defineEmits(['update:modelValue'])
</script>

<template>
  <div class="search-bar">
    <!-- :value + @input = équivalent manuel de v-model -->
    <!-- nécessaire car on ne peut pas faire v-model sur une prop (lecture seule) -->
    <input
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      placeholder="Rechercher un film..."
      type="search"
    />
    <button @click="$emit('update:modelValue', '')">✕</button>
  </div>
</template>

<style scoped></style>
