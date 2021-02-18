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
        this.$eventBus.$on(ON_APP_ERROR, this.open);
    },
    methods: {
        open (message) {
            this.message = message;
            this.showAlert = true;
        }
    }
}
</script>
