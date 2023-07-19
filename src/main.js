import { createApp } from "vue";
import { router } from "@/router";
import App from "@/App.vue";
import "@unocss/reset/tailwind.css";
import "uno.css";
import "@/style/index.scss";
import installDirectives from "./directives/index";
const app = createApp(App);
app.use(router);
installDirectives(app);
router.isReady().then(() => {
  app.mount("#app");
});
