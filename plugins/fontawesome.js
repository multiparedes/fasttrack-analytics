import { library, config } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";

// Esta línea deshabilita la inclusión automática de CSS por FontAwesome
config.autoAddCss = false;

// Agrega todos los íconos sólidos a la librería FontAwesome
library.add(fas, far, fab);

// Agrega todos los íconos regulares a la librería FontAwesome

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component("font-awesome-icon", FontAwesomeIcon, {});
});
