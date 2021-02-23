<template>
  <v-dialog
    class="confirmDialog"
    v-model="dialog"
    :max-width="options.width"
    :style="{ zIndex: options.zIndex }"
    @keydown.esc="cancel"
  >
    <v-card>
      <v-toolbar dark :color="options.color" dense flat>
        <v-toolbar-title class="text-body-2 font-weight-bold grey--text">
          {{ title }}
        </v-toolbar-title>
      </v-toolbar>
      <v-card-text
        v-show="!!message"
        class="pa-4 black--text"
        v-html="message"
      ></v-card-text>
      <v-card-actions class="pt-3">
        <v-spacer></v-spacer>
        <v-btn
          v-if="!options.noconfirm"
          color="grey"
          text
          class="body-2 font-weight-bold"
          @click.native="cancel"
          >Отмена</v-btn
        >
        <v-btn
          color="primary"
          class="body-2 font-weight-bold"
          outlined
          @click.native="agree"
          >OK</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>    
</template>

<script>
/*
Модальное окно для подтверждения действий.
Метод open() возвращает промис с результатом true/false 
в зависимости от того поддтверждено ли действие.
*/
export default {
  name: 'ConfirmDialog',

  data: function () {
    return {
      dialog: false,
      resolve: null,
      reject: null,
      message: null,
      title: null,
      defautlTitle: "Подтвердите действие",
      options: {
        color: "grey lighten-3",
        width: 400,
        zIndex: 200,
        noconfirm: false
      }
    };
  },
  methods: {
    async open(title, message, options) {
      this.dialog = true;
      this.title = title ? title : this.defautlTitle;
      this.message = message;
      this.options = Object.assign(this.options, options);
      return new Promise((resolve, reject) => {
        this.resolve = resolve;
        this.reject = reject;
      });
    },
    agree() {
      this.resolve(true); // Промис окна подтверждения вернет true
      this.dialog = false;
    },
    cancel() {
      this.resolve(false); // Промис окна подтверждения вернет false
      this.dialog = false;
    }
  }
}
</script>