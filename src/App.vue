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
    class="p-4 overflow-hidden flex flex-col md:flex-row gap-5 justify-start md:justify-center h-screen max-h-screen"
  >
    <div class="md:flex-1 max-w-[95vh]">
      <ChessBoard
        :perspective="perspective"
        @square-clicked="addToRegistry"
      />
    </div>

    <div
      class="h-full overflow-hidden max-h-[35vh] md:max-w-[300px] md:max-h-[95vh] flex-1 bg-slate-700"
    >
      <Sidebar
        :registry="squareClickedRegistry"
        :perspective="perspective"
        @change-perspective="perspective = $event"
      />
    </div>
  </section>
</template>
