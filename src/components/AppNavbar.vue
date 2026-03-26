<script setup></script>

<template>
  <nav class="navbar">
    <RouterLink to="/">🎬 FilmScope</RouterLink>
    <RouterLink to="/favorites">❤️ Favoris</RouterLink>
  </nav>
</template>

<style scoped>
.navbar {
  display: flex;
  gap: 1.5rem;
  padding: 1rem;
  border-bottom: 1px solid #ddd;
  margin-bottom: 1rem;
}

/* RouterLink ajoute cette classe automatiquement sur le lien actif */
.router-link-active {
  font-weight: bold;
  text-decoration: underline;
}
</style>
