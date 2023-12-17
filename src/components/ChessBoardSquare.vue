<script setup lang="ts">
import { isSquareDark } from '@/utils';
import { ChessSquare } from '@/types';

const props = defineProps<{
  square: ChessSquare;
  isHighlighted: boolean;
  showRank: boolean;
  showFile: boolean;
}>();

defineEmits<{
  (event: 'square-clicked', square: ChessSquare): void;
}>();

const isDark = isSquareDark(props.square);
</script>
<template>
  <div
    class="w-full h-full relative"
    :class="[
      { 'bg-opacity-75': isHighlighted },
      isDark ? 'bg-gray-900' : 'bg-lime-700',
    ]"
    @click="$emit('square-clicked', square)"
  >
    <span
      class="absolute leading-none top-0.5 left-0.5 text-xs"
      :class="[isDark ? 'text-lime-100' : 'text-gray-100']"
      v-if="showRank"
    >
      {{ square.rank }}
    </span>
    <span
      class="absolute leading-none bottom-0.5 right-0.5 text-xs"
      :class="[isDark ? 'text-lime-100' : 'text-gray-100']"
      v-if="showFile"
      >{{ square.file }}
    </span>
  </div>
</template>
