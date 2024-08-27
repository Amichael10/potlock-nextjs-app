import {
  defineConfig,
  presetAttributify,
  presetTypography,
  presetUno,
} from "unocss";
import presetAnimations from "unocss-preset-animations";
import presetAutoprefixer from "unocss-preset-autoprefixer";
import presetShadcn from "unocss-preset-shadcn";

export default defineConfig({
  presets: [
    presetUno(),
    presetAutoprefixer(),
    presetAttributify(),
    presetTypography(),
    presetAnimations(),

    presetShadcn({
      color: "slate",
    }),
  ],
});
