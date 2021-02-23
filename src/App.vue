<template>
  <v-app>
    <div class="alerts">
      <ErrorAlert ref="errorAlert"></ErrorAlert>
    </div>
    <div class="dialogs">
      <ConfirmDialog ref="confirmDialog"></ConfirmDialog>
    </div>
    <v-main>
      <v-container>
        <v-row>
          <v-col cols="6">
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
          </v-col>
          <v-col cols="6">
            <v-card
              class="mx-auto my-12"
              max-width="600"
            >
              <v-card-title>
                Окно с подвтверждением действия.
              </v-card-title>
              <v-card-text>
                <v-list>
                  <v-list-item
                    v-for="phrase in phrases" :key="phrase"
                  > {{ phrase }}
                  </v-list-item>
                </v-list>
                <v-text-field
                  v-model="newPhrase"
                  label="Новая фраза"
                ></v-text-field>
              </v-card-text>
              <v-card-actions class="d-flex flex-column">
 
                <div>
                  <v-btn
                    ref="addPhraseBtn"
                    depressed
                    color="primary"
                    class="mx-auto my-12"
                    @click="addPhrase"
                  >
                  Добавить фразу
                  </v-btn>
                </div>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import ErrorAlert from '@/components/ErrorAlert';
import ConfirmDialog from '@/components/ConfirmDialog';
import { ON_APP_ERROR } from '@/events/types';

export default {
  name: 'App',

  components: {
    'ErrorAlert': ErrorAlert,
    'ConfirmDialog': ConfirmDialog
  },

  data: () => ({
    errorMessage: '',
    phrases: [],
    newPhrase: null
  }),
  methods: {
    showAlert() {
      this.$eventBus.$emit(ON_APP_ERROR, this.errorMessage);
    },
    async addPhrase() {
      let result = await this.$refs.confirmDialog.open(
        "Добавить новую фразу?",
        "Подтвердите добавление новой фразы",
      );
      if (result) {
        if (typeof this.newPhrase === "string" && this.newPhrase.length > 0) {
        this.phrases.push(this.newPhrase);
        } else {
          this.errorMessage = 'Введена некорректная фраза.';
          this.showAlert(this.errorMessage);
        }
      }
    },
  }
};
</script>
