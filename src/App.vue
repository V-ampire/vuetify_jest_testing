<template>
  <v-app>
    <div class="alerts">
      <ErrorAlert ref="errorAlert"></ErrorAlert>
    </div>
    <v-main>
      <v-card
        class="mx-auto my-12"
        max-width="600"
      >
        <v-card-title>
          Открытие окна с сообщением об ошибке.
        </v-card-title>
        <v-card-text>
          <v-text-field
            v-model="errorMessage"
            label="Сообщение об ошибке"
          >
          </v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn
            depressed
            color="error"
            class="mx-auto my-12 errorBtn"
            @click="showAlert"
          >
           Raise Error
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-main>
  </v-app>
</template>

<script>
import ErrorAlert from '@/components/ErrorAlert';
import { ON_APP_ERROR } from '@/events/types';

export default {
  name: 'App',

  components: {
    'ErrorAlert': ErrorAlert
  },

  data: () => ({
    errorMessage: '',
  }),
  methods: {
    showAlert() {
      this.$eventBus.$emit(ON_APP_ERROR, this.errorMessage);
    }
  }
};
</script>
