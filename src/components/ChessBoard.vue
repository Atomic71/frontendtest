<script setup lang="ts">
import type { Perspective } from '@/types';
import { isSquareDark } from '@/utils';
import { useBoardRenderOrder } from '@/hooks';
import { toRef } from 'vue';

const props = defineProps<{
  perspective: Perspective;
}>();

const perspective = toRef(props, 'perspective');

const { fileRenderOrder, rankRenderOrder } = useBoardRenderOrder(perspective);
</script>

<template>
  <div class="border-black flex">
    <div class="p-5 bg-orange-800">
      <div class="flex border-2 border-black">
        <div
          v-for="(file, fileIndex) in fileRenderOrder"
          :key="file"
        >
          <div
            v-for="(rank, rankIndex) in rankRenderOrder"
            :key="rank"
            class="w-[10vw] h-[10vw] max-h-[10vh] max-w-[10vh] relative"
            :class="[
              isSquareDark(file, rank) ? 'bg-gray-900' : 'bg-lime-700',
              'flex justify-center items-center text-2xl',
            ]"
          >
            <span
              class="absolute leading-none top-0.5 left-0.5 text-xs"
              :class="[
                isSquareDark(file, rank) ? 'text-lime-100' : 'text-gray-100',
              ]"
              v-if="fileIndex === 0"
            >
              {{ rank }}
            </span>
            <span
              class="absolute leading-none bottom-0.5 right-0.5 text-xs"
              :class="[
                isSquareDark(file, rank) ? 'text-lime-100' : 'text-gray-100',
              ]"
              v-if="rankIndex === rankRenderOrder.length - 1"
              >{{ file }}
            </span>
            <slot
              name="square"
              v-bind="{
                file,
                rank,
                isDark: isSquareDark(file, rank),
              }"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
