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
                formData.append('image', this.game.image);

                const endpoint = this.isEditMode ? `/games/${this.game.id}` : '/games';

                const response = await axios.post(endpoint, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                if (!this.isEditMode) {
                    //console.log('Game added successfully:', response.data);
                    this.game.id = response.data.game_id; // Explicitly set the game ID
                } else {
                    //console.log('Game edited successfully:', response.data);
                    response.data.game_id = this.game.id; // Include the existing game ID in the response
                }

                this.isEditMode = false; // Reset edit mode after submission
                return response.data; // Return the full response for further use
            } catch (error) {
                if (error.response) {
                    const errorMessage = error.response.data.error || 'An error occurred while submitting the game. Please try again!';
                    throw new Error(errorMessage);
                }
                throw error;
            }
        },
        async deleteGame(gameId) {
            try {
                const response = await axios.delete(`/games/${gameId}`);
                this.game = {};
                this.isEditMode = false;
            } catch (error) {
                if (error.response) {
                    const errorMessage = error.response.data.error || 'An error occurred while deleting the game. Please try again!';
                    throw new Error(errorMessage);
                }
                throw error;
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