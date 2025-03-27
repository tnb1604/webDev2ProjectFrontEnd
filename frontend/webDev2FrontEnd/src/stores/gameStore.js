import { defineStore } from 'pinia';
import { reactive } from 'vue'; // Import reactive
import axios from '../utils/axios'; // Import the API configuration

export const useGameStore = defineStore('game', {
    state: () => ({
        game: reactive({ // Make game reactive
            image: null,
            title: '',
            description: '',
            genre: '',
            release_date: '',
            trailer_url: '',
        }),
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
                formData.append('release_date', this.game.release_date);
                formData.append('trailer_url', this.game.trailer_url);

                console.log('Image before appending:', this.game.image); // Debug log

                formData.append('image', this.game.image); // Ensure the image is appended correctly

                console.log([...formData]);

                const endpoint = this.isEditMode ? `/games/${this.game.id}` : '/games';

                const response = await axios.post(endpoint, formData, { // Fix: Use endpoint as the first argument
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                if (this.isEditMode) {
                    console.log('Game edited successfully:', response.data);
                } else {
                    console.log('Game added successfully:', response.data);
                }

                this.game = response.data; // Update the game state with the response
                this.isEditMode = false; // Reset edit mode after submission
            } catch (error) {
                console.error('Error submitting game:', error);
            }
        },
        async deleteGame(gameId) {
            try {
                const response = await axios.delete(`/games/${gameId}`);
                console.log('Game deleted:', response.data);
                this.game = {};
                this.isEditMode = false;
            } catch (error) {
                console.error('Error deleting game:', error);
            }
        },
        resetGame() {
            this.game = {
                image: null,
                title: '',
                description: '',
                genre: '',
                release_date: '',
                trailer_url: '',
            };
            this.isEditMode = false;
        },
    },
});