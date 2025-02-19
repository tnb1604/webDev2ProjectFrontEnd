<template>
    <div class="container mt-4 mb-4">
        <div class="card shadow-sm">
            <div class="card-body">
                <form @submit.prevent="submitForm">
                    <ImageUpload @image-selected="setImage" />
                    <div class="mb-3">
                        <label for="title" class="form-label">Title:</label>
                        <input type="text" id="title" v-model="game.title" class="form-control" required />
                    </div>
                    <div class="mb-3">
                        <label for="description" class="form-label">Description:</label>
                        <textarea id="description" v-model="game.description" class="form-control" required></textarea>
                    </div>
                    <div class="mb-3">
                        <label for="genre" class="form-label">Genre:</label>
                        <input type="text" id="genre" v-model="game.genre" class="form-control" required />
                    </div>
                    <div class="mb-3">
                        <label for="releaseDate" class="form-label">Release Date:</label>
                        <input type="date" id="releaseDate" v-model="game.releaseDate" class="form-control" required />
                    </div>
                    <button type="submit" class="btn btn-primary w-100">{{ isEditMode ? 'Update Game' : 'Add Game' }}</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import ImageUpload from './ImageUpload.vue';

export default {
    components: {
        ImageUpload
    },
    props: {
        gameId: {
            type: String,
            required: true
        }
    },
    setup(props) {
        const game = ref({
            image: null,
            title: '',
            description: '',
            genre: '',
            releaseDate: ''
        });
        const isEditMode = ref(false);

        onMounted(() => {
            if (props.gameId !== 'new') {
                isEditMode.value = true;
                // Fetch game details and populate the form
                // Example: fetchGameDetails(props.gameId).then(data => game.value = data);
            }
        });

        const setImage = (image) => {
            game.value.image = image;
        };

        const submitForm = () => {
            if (isEditMode.value) {
                console.log('Game updated:', game.value);
                // Update game logic here
            } else {
                console.log('Game added:', game.value);
                // Add game logic here
            }
            // Reset form
            game.value = {
                image: null,
                title: '',
                description: '',
                genre: '',
                releaseDate: ''
            };
        };

        return {
            game,
            isEditMode,
            setImage,
            submitForm
        };
    }
};
</script>
