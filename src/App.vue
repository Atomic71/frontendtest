<script lang="ts" setup>
import ChessBoard from '@/components/ChessBoard.vue';
import Sidebar from '@/components/Sidebar.vue';
import { useClickRegistry } from '@/hooks';
import { Perspective } from '@/types';
import { ref } from 'vue';

const { addToRegistry, squareClickedRegistry } = useClickRegistry();

const perspective = ref<Perspective>('white');
</script>
<template>
  <section
    class="p-4 bg-slate-300 max-h-screen overflow-hidden h-screen flex flex-col md:flex-row pb-3"
  >
    <div class="flex-1">
      <ChessBoard
        :perspective="perspective"
        @square-clicked="addToRegistry"
      />
    </div>

    <div class="overflow-hidden">
      <Sidebar
        :registry="squareClickedRegistry"
        :perspective="perspective"
        @change-perspective="perspective = $event"
      />
    </div>
  </section>
</template>
