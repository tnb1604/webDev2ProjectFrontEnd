import { defineStore } from 'pinia';
import axios from '../utils/axios'; // Import the API configuration

export const useGameStore = defineStore('game', {
    state: () => ({
        game: {
            image: null,
            title: '',
            description: '',
            genre: '',
            release_date: '',
            trailer_url: '',
        },
        isEditMode: false,
    }),
    actions: {
        async fetchGameDetails(gameId) {
            try {
                const response = await axios.get(`/games/${gameId}`);
                this.game = response.data;
                this.isEditMode = true;
            } catch (error) {
                console.error('Error fetching game details:', error);
            }
        },
        async submitGame() {
            try {
                let formData = new FormData();
                formData.append('title', this.game.title);
                formData.append('description', this.game.description);
                formData.append('genre', this.game.genre);
                formData.append('releaseDate', this.game.release_date);  // Make sure release_date is correct

                // Log formData to inspect what's being sent
                console.log([...formData]);

                formData.append('trailerUrl', this.game.trailer_url);

                if (this.game.image) {
                    formData.append('image', this.game.image);
                }

                const endpoint = this.isEditMode ? `/games/${this.game.id}` : '/games';
                const method = this.isEditMode ? 'put' : 'post';

                const response = await axios[method](endpoint, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                console.log('Game submitted:', response.data);
            } catch (error) {
                console.error('Error submitting game:', error);
            }
        }

    },
});
