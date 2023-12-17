<script setup lang="ts">
import { Perspective, SquareClickedRegistry } from '@/types';
import { ref, watch } from 'vue';

const props = defineProps<{
  registry: SquareClickedRegistry;
  perspective: Perspective;
}>();

defineEmits<{
  (event: 'change-perspective'): void;
}>();

const moveList = ref<HTMLElement | null>(null);

// check if list is is visible, if not, scroll as it grows
const scrollToBottom = () => {
  if (!moveList.value) return;
  const { scrollHeight, clientHeight } = moveList.value;
  moveList.value.scrollTop = scrollHeight - clientHeight;
};

watch(
  () => props.registry,
  () => {
    scrollToBottom();
  },
  { immediate: true }
);
</script>
<template>
  <div class="flex justify-between items-center mb-2 px-2 pt-2 pl">
    <h1 class="text-white">Sidebar</h1>
    <button
      class="p-2 bg-yellow-500 shadow-lg text-gray-600"
      @click="$emit('change-perspective')"
    >
      Watching as {{ perspective }} ⬆️
    </button>
  </div>

  <div
    class="overflow-scroll h-[20vh] md:h-[80vh] pb-5"
    ref="moveList"
  >
    <div
      v-for="(entry, i) in registry"
      :key="entry.position"
      class="text-gray-300"
    >
      Click {{ i + 1 }}: {{ entry.position }} @ {{ entry.formattedTimestamp }}
    </div>
  </div>
</template>
