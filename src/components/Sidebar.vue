<script setup lang="ts">
import { Perspective, SquareClickedRegistry } from '@/types';
import { ref, watch } from 'vue';

const props = defineProps<{
  registry: SquareClickedRegistry;
  perspective: Perspective;
}>();

defineEmits<{
  (event: 'change-perspective', p: Perspective): void;
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
    requestAnimationFrame(scrollToBottom);
  },
  { immediate: true }
);
</script>
<template>
  <div
    class="flex flex-col sm:items-start sm:justify-start p-2 bg-slate-700 overflow-hidden h-full"
  >
    <div
      class="mb-3 flex sm:flex-shrink-0 justify-between w-full md:flex-row md:flex-grow-0 md:justify-between md:items-center md:flex-1"
    >
      <h1 class="text-white">Sidebar</h1>
      <button
        class="p-2 bg-yellow-500 shadow-lg text-gray-600 rounded-sm mt-auto"
        @click="
          $emit(
            'change-perspective',
            perspective === 'black' ? 'white' : 'black'
          )
        "
      >
        {{ perspective }} ⬆️
      </button>
    </div>

    <div
      class="overflow-y-auto pt-2 px-2 sm:flex sm:flex-wrap md:flex lg:gap-0 sm:gap-1.5"
      ref="moveList"
    >
      <div
        v-for="(entry, i) in registry"
        :key="entry.position"
        class="text-gray-300 flex md:block whitespace-nowrap text-sm lg:text-md basis-[30%]"
      >
        Click {{ i + 1 }}: {{ entry.position }} @ {{ entry.formattedTimestamp }}
      </div>
    </div>
  </div>
</template>
