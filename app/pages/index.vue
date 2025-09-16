<template>
  <div>
    <!-- Overlay: show once per device using localStorage (mobile only) -->
    <OverlayLoader v-if="allowOverlay" @start="handleStart" />

    <!-- Home content -->

    <Navbar />
    <HeroFlow />
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

// Show overlay once per device using localStorage (mobile only)
const allowOverlay = ref(false)

onMounted(() => {
  const isMobile = window.innerWidth < 768
  if (!isMobile) {
    allowOverlay.value = false
    return
  }

  try {
    const seen = localStorage.getItem('overlay_seen') === '1'
    allowOverlay.value = !seen
  } catch {
    // localStorage unavailable (private mode) -> show once
    allowOverlay.value = true
  }
})

function handleStart() {
  try { localStorage.setItem('overlay_seen', '1') } catch {}
  // Keep component mounted; it hides itself with its internal transition
}
</script>
