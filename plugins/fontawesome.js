// plugins/fontawesome.js

import Vue from "vue";
import { library } from "@fortawesome/fontawesome-svg-core";
// Importiere die Icons, die du verwenden möchtest
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

// Füge die Icons zur Bibliothek hinzu
library.add(fas, far);

// Konfiguriere Vue, um die FontAwesome-Icons global verfügbar zu machen
Vue.component("font-awesome-icon", FontAwesomeIcon);
