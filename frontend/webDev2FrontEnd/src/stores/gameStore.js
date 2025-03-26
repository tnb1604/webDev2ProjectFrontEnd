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
                formData.append('release_date', this.game.release_date);  // Correct the field name
                formData.append('trailer_url', this.game.trailer_url);
                if (this.game.image) {
                    formData.append('image', this.game.image);
                }

                console.log([...formData]);

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
},);