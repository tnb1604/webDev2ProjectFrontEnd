<template>
    <div>
        <h2 class="text-center mt-4     mb-4">{{ isEditMode ? 'Edit Game' : 'Add New Game' }}</h2>
        <GameForm :game-id="gameId" />
    </div>
</template>

<script>
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import GameForm from '@/components/GameForm.vue';

export default {
    components: {
        GameForm
    },
    setup() {
        const route = useRoute();
        const gameId = ref(route.params.id);
        const isEditMode = ref(false);

        onMounted(() => {
            isEditMode.value = gameId.value !== 'new';
        });

        watch(() => route.params.id, (newId) => {
            gameId.value = newId;
            isEditMode.value = newId !== 'new';
        });

        return {
            gameId,
            isEditMode
        };
    }
};
</script>

<style scoped>
/* Add any styles specific to GameModifyForm.vue here */
</style>
