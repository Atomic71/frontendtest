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
    class="p-4 overflow-hidden flex flex-col md:flex-row pb-3 gap-5 justify-center"
  >
    <div class="flex-1 max-w-[90vh]">
      <ChessBoard
        :perspective="perspective"
        @square-clicked="addToRegistry"
      />
    </div>

    <div class="overflow-hidden max-w-[300px] flex-1 bg-slate-700">
      <Sidebar
        :registry="squareClickedRegistry"
        :perspective="perspective"
        @change-perspective="perspective = $event"
      />
    </div>
  </section>
</template>
