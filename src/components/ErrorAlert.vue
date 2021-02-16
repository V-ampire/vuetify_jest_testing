<template>
    <v-snackbar
        v-model="showAlert"
        color="error"
        top
    >
        {{ message }}
    </v-snackbar>
</template>

<script>
import { ON_APP_ERROR } from '@/events/types';
import eventBus from '@/events/eventBus';

export default {
    data () {
        return {
            showAlert: false,
            message: '',
            timeout: 5000
        }
    },
    mounted: function() {
        var self = this;
        // При монтировании вешаем обработчик события ошибки
        eventBus.$on(ON_APP_ERROR, (errorData) => {
            self.open(errorData.message)
        });
    },
    methods: {
        open (message) {
            console.log(message);
            this.message = message;
            this.showAlert = true;
        }
    }
}
</script>
