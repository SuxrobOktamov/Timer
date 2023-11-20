// vite.config.ts
import path from "path";
import { URL, fileURLToPath } from "url";
import { defineConfig } from "file:///D:/Frist_Project/Timer/node_modules/.pnpm/vite@4.0.4_@types+node@18.6.1/node_modules/vite/dist/node/index.js";
import Preview from "file:///D:/Frist_Project/Timer/node_modules/.pnpm/vite-plugin-vue-component-preview@0.3.4_rollup@2.79.1_vite@4.0.4/node_modules/vite-plugin-vue-component-preview/out/index.js";
import Vue from "file:///D:/Frist_Project/Timer/node_modules/.pnpm/@vitejs+plugin-vue@4.0.0_vite@4.0.4_vue@3.2.45/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import Pages from "file:///D:/Frist_Project/Timer/node_modules/.pnpm/vite-plugin-pages@0.28.0_vite@4.0.4/node_modules/vite-plugin-pages/dist/index.mjs";
import generateSitemap from "file:///D:/Frist_Project/Timer/node_modules/.pnpm/vite-ssg-sitemap@0.4.3/node_modules/vite-ssg-sitemap/dist/index.js";
import Layouts from "file:///D:/Frist_Project/Timer/node_modules/.pnpm/vite-plugin-vue-layouts@0.7.0_vite@4.0.4_vue-router@4.1.6_vue@3.2.45/node_modules/vite-plugin-vue-layouts/dist/index.mjs";
import Components from "file:///D:/Frist_Project/Timer/node_modules/.pnpm/unplugin-vue-components@0.22.12_rollup@2.79.1_vue@3.2.45/node_modules/unplugin-vue-components/dist/vite.mjs";
import AutoImport from "file:///D:/Frist_Project/Timer/node_modules/.pnpm/unplugin-auto-import@0.12.2_@vueuse+core@9.11.1_rollup@2.79.1/node_modules/unplugin-auto-import/dist/vite.js";
import Markdown from "file:///D:/Frist_Project/Timer/node_modules/.pnpm/vite-plugin-vue-markdown@0.22.2_rollup@2.79.1_vite@4.0.4/node_modules/vite-plugin-vue-markdown/dist/index.mjs";
import { VitePWA } from "file:///D:/Frist_Project/Timer/node_modules/.pnpm/vite-plugin-pwa@0.14.1_vite@4.0.4_workbox-build@6.5.4_workbox-window@6.5.4/node_modules/vite-plugin-pwa/dist/index.mjs";
import VueI18n from "file:///D:/Frist_Project/Timer/node_modules/.pnpm/@intlify+unplugin-vue-i18n@0.8.1_vue-i18n@9.2.2/node_modules/@intlify/unplugin-vue-i18n/lib/vite.mjs";
import Inspect from "file:///D:/Frist_Project/Timer/node_modules/.pnpm/vite-plugin-inspect@0.7.15_rollup@2.79.1_vite@4.0.4/node_modules/vite-plugin-inspect/dist/index.mjs";
import Inspector from "file:///D:/Frist_Project/Timer/node_modules/.pnpm/vite-plugin-vue-inspector@3.2.1_vite@4.0.4/node_modules/vite-plugin-vue-inspector/dist/index.mjs";
import LinkAttributes from "file:///D:/Frist_Project/Timer/node_modules/.pnpm/markdown-it-link-attributes@4.0.1/node_modules/markdown-it-link-attributes/index.js";
import Unocss from "file:///D:/Frist_Project/Timer/node_modules/.pnpm/unocss@0.49.0_rollup@2.79.1_vite@4.0.4/node_modules/unocss/dist/vite.mjs";
import Shiki from "file:///D:/Frist_Project/Timer/node_modules/.pnpm/markdown-it-shiki@0.7.2/node_modules/markdown-it-shiki/dist/index.mjs";
import VueMacros from "file:///D:/Frist_Project/Timer/node_modules/.pnpm/unplugin-vue-macros@1.6.3_@vueuse+core@9.11.1_rollup@2.79.1_vite@4.0.4_vue@3.2.45/node_modules/unplugin-vue-macros/dist/vite.mjs";
var __vite_injected_original_dirname = "D:\\Frist_Project\\Timer";
var __vite_injected_original_import_meta_url = "file:///D:/Frist_Project/Timer/vite.config.ts";
var vite_config_default = defineConfig({
  resolve: {
    alias: [
      {
        find: "@/",
        replacement: `${fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url))}`
      }
    ]
  },
  plugins: [
    Preview(),
    VueMacros({
      plugins: {
        vue: Vue({
          include: [/\.vue$/, /\.md$/],
          reactivityTransform: true
        })
      }
    }),
    Pages({
      extensions: ["vue", "md"]
    }),
    Layouts(),
    AutoImport({
      imports: [
        "vue",
        "vue-router",
        "vue-i18n",
        "vue/macros",
        "@vueuse/head",
        "@vueuse/core"
      ],
      dts: "src/auto-imports.d.ts",
      dirs: [
        "src/composables",
        "src/stores"
      ],
      vueTemplate: true
    }),
    Components({
      extensions: ["vue", "md"],
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      dts: "src/components.d.ts"
    }),
    Unocss(),
    Markdown({
      wrapperClasses: "prose prose-sm m-auto text-left",
      headEnabled: true,
      markdownItSetup(md) {
        md.use(Shiki, {
          theme: {
            light: "vitesse-light",
            dark: "vitesse-dark"
          }
        });
        md.use(LinkAttributes, {
          matcher: (link) => /^https?:\/\//.test(link),
          attrs: {
            target: "_blank",
            rel: "noopener"
          }
        });
      }
    }),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.svg", "safari-pinned-tab.svg"],
      manifest: {
        name: "Vitesse",
        short_name: "Vitesse",
        theme_color: "#ffffff",
        icons: [
          {
            src: "/pwa-192x192.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png"
          },
          {
            src: "/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable"
          }
        ]
      }
    }),
    VueI18n({
      runtimeOnly: true,
      compositionOnly: true,
      fullInstall: true,
      include: [path.resolve(__vite_injected_original_dirname, "locales/**")]
    }),
    Inspect(),
    Inspector({
      toggleButtonVisibility: "never"
    })
  ],
  test: {
    include: ["test/**/*.test.ts"],
    environment: "jsdom",
    deps: {
      inline: ["@vue", "@vueuse", "vue-demi"]
    }
  },
  ssgOptions: {
    script: "async",
    formatting: "minify",
    onFinished() {
      generateSitemap();
    }
  },
  ssr: {
    noExternal: ["workbox-window", /vue-i18n/]
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxGcmlzdF9Qcm9qZWN0XFxcXFRpbWVyXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxGcmlzdF9Qcm9qZWN0XFxcXFRpbWVyXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9GcmlzdF9Qcm9qZWN0L1RpbWVyL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHBhdGggZnJvbSBcInBhdGhcIjtcbmltcG9ydCB7IFVSTCwgZmlsZVVSTFRvUGF0aCB9IGZyb20gXCJ1cmxcIjtcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gXCJ2aXRlXCI7XG5pbXBvcnQgUHJldmlldyBmcm9tIFwidml0ZS1wbHVnaW4tdnVlLWNvbXBvbmVudC1wcmV2aWV3XCI7XG5pbXBvcnQgVnVlIGZyb20gXCJAdml0ZWpzL3BsdWdpbi12dWVcIjtcbmltcG9ydCBQYWdlcyBmcm9tIFwidml0ZS1wbHVnaW4tcGFnZXNcIjtcbmltcG9ydCBnZW5lcmF0ZVNpdGVtYXAgZnJvbSBcInZpdGUtc3NnLXNpdGVtYXBcIjtcbmltcG9ydCBMYXlvdXRzIGZyb20gXCJ2aXRlLXBsdWdpbi12dWUtbGF5b3V0c1wiO1xuaW1wb3J0IENvbXBvbmVudHMgZnJvbSBcInVucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3ZpdGVcIjtcbmltcG9ydCBBdXRvSW1wb3J0IGZyb20gXCJ1bnBsdWdpbi1hdXRvLWltcG9ydC92aXRlXCI7XG5pbXBvcnQgTWFya2Rvd24gZnJvbSBcInZpdGUtcGx1Z2luLXZ1ZS1tYXJrZG93blwiO1xuaW1wb3J0IHsgVml0ZVBXQSB9IGZyb20gXCJ2aXRlLXBsdWdpbi1wd2FcIjtcbmltcG9ydCBWdWVJMThuIGZyb20gXCJAaW50bGlmeS91bnBsdWdpbi12dWUtaTE4bi92aXRlXCI7XG5pbXBvcnQgSW5zcGVjdCBmcm9tIFwidml0ZS1wbHVnaW4taW5zcGVjdFwiO1xuaW1wb3J0IEluc3BlY3RvciBmcm9tIFwidml0ZS1wbHVnaW4tdnVlLWluc3BlY3RvclwiO1xuaW1wb3J0IExpbmtBdHRyaWJ1dGVzIGZyb20gXCJtYXJrZG93bi1pdC1saW5rLWF0dHJpYnV0ZXNcIjtcbmltcG9ydCBVbm9jc3MgZnJvbSBcInVub2Nzcy92aXRlXCI7XG5pbXBvcnQgU2hpa2kgZnJvbSBcIm1hcmtkb3duLWl0LXNoaWtpXCI7XG5pbXBvcnQgVnVlTWFjcm9zIGZyb20gXCJ1bnBsdWdpbi12dWUtbWFjcm9zL3ZpdGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgICByZXNvbHZlOiB7XG4gICAgICAgIGFsaWFzOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZmluZDogXCJAL1wiLFxuICAgICAgICAgICAgICAgIHJlcGxhY2VtZW50OiBgJHtmaWxlVVJMVG9QYXRoKG5ldyBVUkwoXCIuL3NyY1wiLCBpbXBvcnQubWV0YS51cmwpKX1gLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICB9LFxuXG4gICAgcGx1Z2luczogW1xuICAgICAgICBQcmV2aWV3KCksXG5cbiAgICAgICAgVnVlTWFjcm9zKHtcbiAgICAgICAgICAgIHBsdWdpbnM6IHtcbiAgICAgICAgICAgICAgICB2dWU6IFZ1ZSh7XG4gICAgICAgICAgICAgICAgICAgIGluY2x1ZGU6IFsvXFwudnVlJC8sIC9cXC5tZCQvXSxcbiAgICAgICAgICAgICAgICAgICAgcmVhY3Rpdml0eVRyYW5zZm9ybTogdHJ1ZSxcbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pLFxuXG4gICAgICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9oYW5ub2VydS92aXRlLXBsdWdpbi1wYWdlc1xuICAgICAgICBQYWdlcyh7XG4gICAgICAgICAgICBleHRlbnNpb25zOiBbXCJ2dWVcIiwgXCJtZFwiXSxcbiAgICAgICAgfSksXG5cbiAgICAgICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL0pvaG5DYW1waW9uSnIvdml0ZS1wbHVnaW4tdnVlLWxheW91dHNcbiAgICAgICAgTGF5b3V0cygpLFxuXG4gICAgICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9hbnRmdS91bnBsdWdpbi1hdXRvLWltcG9ydFxuICAgICAgICBBdXRvSW1wb3J0KHtcbiAgICAgICAgICAgIGltcG9ydHM6IFtcbiAgICAgICAgICAgICAgICBcInZ1ZVwiLFxuICAgICAgICAgICAgICAgIFwidnVlLXJvdXRlclwiLFxuICAgICAgICAgICAgICAgIFwidnVlLWkxOG5cIixcbiAgICAgICAgICAgICAgICBcInZ1ZS9tYWNyb3NcIixcbiAgICAgICAgICAgICAgICBcIkB2dWV1c2UvaGVhZFwiLFxuICAgICAgICAgICAgICAgIFwiQHZ1ZXVzZS9jb3JlXCIsXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgZHRzOiBcInNyYy9hdXRvLWltcG9ydHMuZC50c1wiLFxuICAgICAgICAgICAgZGlyczogW1xuICAgICAgICAgICAgICAgIFwic3JjL2NvbXBvc2FibGVzXCIsXG4gICAgICAgICAgICAgICAgXCJzcmMvc3RvcmVzXCIsXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgdnVlVGVtcGxhdGU6IHRydWUsXG4gICAgICAgIH0pLFxuXG4gICAgICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9hbnRmdS91bnBsdWdpbi12dWUtY29tcG9uZW50c1xuICAgICAgICBDb21wb25lbnRzKHtcbiAgICAgICAgICAgIC8vIGFsbG93IGF1dG8gbG9hZCBtYXJrZG93biBjb21wb25lbnRzIHVuZGVyIGAuL3NyYy9jb21wb25lbnRzL2BcbiAgICAgICAgICAgIGV4dGVuc2lvbnM6IFtcInZ1ZVwiLCBcIm1kXCJdLFxuICAgICAgICAgICAgLy8gYWxsb3cgYXV0byBpbXBvcnQgYW5kIHJlZ2lzdGVyIGNvbXBvbmVudHMgdXNlZCBpbiBtYXJrZG93blxuICAgICAgICAgICAgaW5jbHVkZTogWy9cXC52dWUkLywgL1xcLnZ1ZVxcP3Z1ZS8sIC9cXC5tZCQvXSxcbiAgICAgICAgICAgIGR0czogXCJzcmMvY29tcG9uZW50cy5kLnRzXCIsXG4gICAgICAgIH0pLFxuXG4gICAgICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9hbnRmdS91bm9jc3NcbiAgICAgICAgLy8gc2VlIHVub2Nzcy5jb25maWcudHMgZm9yIGNvbmZpZ1xuICAgICAgICBVbm9jc3MoKSxcblxuICAgICAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vYW50ZnUvdml0ZS1wbHVnaW4tdnVlLW1hcmtkb3duXG4gICAgICAgIC8vIERvbid0IG5lZWQgdGhpcz8gVHJ5IHZpdGVzc2UtbGl0ZTogaHR0cHM6Ly9naXRodWIuY29tL2FudGZ1L3ZpdGVzc2UtbGl0ZVxuICAgICAgICBNYXJrZG93bih7XG4gICAgICAgICAgICB3cmFwcGVyQ2xhc3NlczogXCJwcm9zZSBwcm9zZS1zbSBtLWF1dG8gdGV4dC1sZWZ0XCIsXG4gICAgICAgICAgICBoZWFkRW5hYmxlZDogdHJ1ZSxcbiAgICAgICAgICAgIG1hcmtkb3duSXRTZXR1cChtZCkge1xuICAgICAgICAgICAgICAgIC8vIGh0dHBzOi8vcHJpc21qcy5jb20vXG4gICAgICAgICAgICAgICAgbWQudXNlKFNoaWtpLCB7XG4gICAgICAgICAgICAgICAgICAgIHRoZW1lOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsaWdodDogXCJ2aXRlc3NlLWxpZ2h0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXJrOiBcInZpdGVzc2UtZGFya1wiLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIG1kLnVzZShMaW5rQXR0cmlidXRlcywge1xuICAgICAgICAgICAgICAgICAgICBtYXRjaGVyOiAobGluazogc3RyaW5nKSA9PiAvXmh0dHBzPzpcXC9cXC8vLnRlc3QobGluayksXG4gICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXQ6IFwiX2JsYW5rXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICByZWw6IFwibm9vcGVuZXJcIixcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pLFxuXG4gICAgICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9hbnRmdS92aXRlLXBsdWdpbi1wd2FcbiAgICAgICAgVml0ZVBXQSh7XG4gICAgICAgICAgICByZWdpc3RlclR5cGU6IFwiYXV0b1VwZGF0ZVwiLFxuICAgICAgICAgICAgaW5jbHVkZUFzc2V0czogW1wiZmF2aWNvbi5zdmdcIiwgXCJzYWZhcmktcGlubmVkLXRhYi5zdmdcIl0sXG4gICAgICAgICAgICBtYW5pZmVzdDoge1xuICAgICAgICAgICAgICAgIG5hbWU6IFwiVml0ZXNzZVwiLFxuICAgICAgICAgICAgICAgIHNob3J0X25hbWU6IFwiVml0ZXNzZVwiLFxuICAgICAgICAgICAgICAgIHRoZW1lX2NvbG9yOiBcIiNmZmZmZmZcIixcbiAgICAgICAgICAgICAgICBpY29uczogW1xuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzcmM6IFwiL3B3YS0xOTJ4MTkyLnBuZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgc2l6ZXM6IFwiMTkyeDE5MlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJpbWFnZS9wbmdcIixcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3JjOiBcIi9wd2EtNTEyeDUxMi5wbmdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHNpemVzOiBcIjUxMng1MTJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiaW1hZ2UvcG5nXCIsXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNyYzogXCIvcHdhLTUxMng1MTIucG5nXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBzaXplczogXCI1MTJ4NTEyXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcImltYWdlL3BuZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgcHVycG9zZTogXCJhbnkgbWFza2FibGVcIixcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSksXG5cbiAgICAgICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2ludGxpZnkvYnVuZGxlLXRvb2xzL3RyZWUvbWFpbi9wYWNrYWdlcy91bnBsdWdpbi12dWUtaTE4blxuICAgICAgICBWdWVJMThuKHtcbiAgICAgICAgICAgIHJ1bnRpbWVPbmx5OiB0cnVlLFxuICAgICAgICAgICAgY29tcG9zaXRpb25Pbmx5OiB0cnVlLFxuICAgICAgICAgICAgZnVsbEluc3RhbGw6IHRydWUsXG4gICAgICAgICAgICBpbmNsdWRlOiBbcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCJsb2NhbGVzLyoqXCIpXSxcbiAgICAgICAgfSksXG5cbiAgICAgICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2FudGZ1L3ZpdGUtcGx1Z2luLWluc3BlY3RcbiAgICAgICAgLy8gVmlzaXQgaHR0cDovL2xvY2FsaG9zdDozMzMzL19faW5zcGVjdC8gdG8gc2VlIHRoZSBpbnNwZWN0b3JcbiAgICAgICAgSW5zcGVjdCgpLFxuXG4gICAgICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS93ZWJmYW5zcGx6L3ZpdGUtcGx1Z2luLXZ1ZS1pbnNwZWN0b3JcbiAgICAgICAgSW5zcGVjdG9yKHtcbiAgICAgICAgICAgIHRvZ2dsZUJ1dHRvblZpc2liaWxpdHk6IFwibmV2ZXJcIixcbiAgICAgICAgfSksXG4gICAgXSxcblxuICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS92aXRlc3QtZGV2L3ZpdGVzdFxuICAgIHRlc3Q6IHtcbiAgICAgICAgaW5jbHVkZTogW1widGVzdC8qKi8qLnRlc3QudHNcIl0sXG4gICAgICAgIGVudmlyb25tZW50OiBcImpzZG9tXCIsXG4gICAgICAgIGRlcHM6IHtcbiAgICAgICAgICAgIGlubGluZTogW1wiQHZ1ZVwiLCBcIkB2dWV1c2VcIiwgXCJ2dWUtZGVtaVwiXSxcbiAgICAgICAgfSxcbiAgICB9LFxuXG4gICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2FudGZ1L3ZpdGUtc3NnXG4gICAgc3NnT3B0aW9uczoge1xuICAgICAgICBzY3JpcHQ6IFwiYXN5bmNcIixcbiAgICAgICAgZm9ybWF0dGluZzogXCJtaW5pZnlcIixcbiAgICAgICAgb25GaW5pc2hlZCgpIHtcbiAgICAgICAgICAgIGdlbmVyYXRlU2l0ZW1hcCgpO1xuICAgICAgICB9LFxuICAgIH0sXG5cbiAgICBzc3I6IHtcbiAgICAvLyBUT0RPOiB3b3JrYXJvdW5kIHVudGlsIHRoZXkgc3VwcG9ydCBuYXRpdmUgRVNNXG4gICAgICAgIG5vRXh0ZXJuYWw6IFtcIndvcmtib3gtd2luZG93XCIsIC92dWUtaTE4bi9dLFxuICAgIH0sXG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBMFAsT0FBTyxVQUFVO0FBQzNRLFNBQVMsS0FBSyxxQkFBcUI7QUFDbkMsU0FBUyxvQkFBb0I7QUFDN0IsT0FBTyxhQUFhO0FBQ3BCLE9BQU8sU0FBUztBQUNoQixPQUFPLFdBQVc7QUFDbEIsT0FBTyxxQkFBcUI7QUFDNUIsT0FBTyxhQUFhO0FBQ3BCLE9BQU8sZ0JBQWdCO0FBQ3ZCLE9BQU8sZ0JBQWdCO0FBQ3ZCLE9BQU8sY0FBYztBQUNyQixTQUFTLGVBQWU7QUFDeEIsT0FBTyxhQUFhO0FBQ3BCLE9BQU8sYUFBYTtBQUNwQixPQUFPLGVBQWU7QUFDdEIsT0FBTyxvQkFBb0I7QUFDM0IsT0FBTyxZQUFZO0FBQ25CLE9BQU8sV0FBVztBQUNsQixPQUFPLGVBQWU7QUFsQnRCLElBQU0sbUNBQW1DO0FBQWdILElBQU0sMkNBQTJDO0FBb0IxTSxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUN4QixTQUFTO0FBQUEsSUFDTCxPQUFPO0FBQUEsTUFDSDtBQUFBLFFBQ0ksTUFBTTtBQUFBLFFBQ04sYUFBYSxHQUFHLGNBQWMsSUFBSSxJQUFJLFNBQVMsd0NBQWUsQ0FBQztBQUFBLE1BQ25FO0FBQUEsSUFDSjtBQUFBLEVBQ0o7QUFBQSxFQUVBLFNBQVM7QUFBQSxJQUNMLFFBQVE7QUFBQSxJQUVSLFVBQVU7QUFBQSxNQUNOLFNBQVM7QUFBQSxRQUNMLEtBQUssSUFBSTtBQUFBLFVBQ0wsU0FBUyxDQUFDLFVBQVUsT0FBTztBQUFBLFVBQzNCLHFCQUFxQjtBQUFBLFFBQ3pCLENBQUM7QUFBQSxNQUNMO0FBQUEsSUFDSixDQUFDO0FBQUEsSUFHRCxNQUFNO0FBQUEsTUFDRixZQUFZLENBQUMsT0FBTyxJQUFJO0FBQUEsSUFDNUIsQ0FBQztBQUFBLElBR0QsUUFBUTtBQUFBLElBR1IsV0FBVztBQUFBLE1BQ1AsU0FBUztBQUFBLFFBQ0w7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLE1BQ0o7QUFBQSxNQUNBLEtBQUs7QUFBQSxNQUNMLE1BQU07QUFBQSxRQUNGO0FBQUEsUUFDQTtBQUFBLE1BQ0o7QUFBQSxNQUNBLGFBQWE7QUFBQSxJQUNqQixDQUFDO0FBQUEsSUFHRCxXQUFXO0FBQUEsTUFFUCxZQUFZLENBQUMsT0FBTyxJQUFJO0FBQUEsTUFFeEIsU0FBUyxDQUFDLFVBQVUsY0FBYyxPQUFPO0FBQUEsTUFDekMsS0FBSztBQUFBLElBQ1QsQ0FBQztBQUFBLElBSUQsT0FBTztBQUFBLElBSVAsU0FBUztBQUFBLE1BQ0wsZ0JBQWdCO0FBQUEsTUFDaEIsYUFBYTtBQUFBLE1BQ2IsZ0JBQWdCLElBQUk7QUFFaEIsV0FBRyxJQUFJLE9BQU87QUFBQSxVQUNWLE9BQU87QUFBQSxZQUNILE9BQU87QUFBQSxZQUNQLE1BQU07QUFBQSxVQUNWO0FBQUEsUUFDSixDQUFDO0FBQ0QsV0FBRyxJQUFJLGdCQUFnQjtBQUFBLFVBQ25CLFNBQVMsQ0FBQyxTQUFpQixlQUFlLEtBQUssSUFBSTtBQUFBLFVBQ25ELE9BQU87QUFBQSxZQUNILFFBQVE7QUFBQSxZQUNSLEtBQUs7QUFBQSxVQUNUO0FBQUEsUUFDSixDQUFDO0FBQUEsTUFDTDtBQUFBLElBQ0osQ0FBQztBQUFBLElBR0QsUUFBUTtBQUFBLE1BQ0osY0FBYztBQUFBLE1BQ2QsZUFBZSxDQUFDLGVBQWUsdUJBQXVCO0FBQUEsTUFDdEQsVUFBVTtBQUFBLFFBQ04sTUFBTTtBQUFBLFFBQ04sWUFBWTtBQUFBLFFBQ1osYUFBYTtBQUFBLFFBQ2IsT0FBTztBQUFBLFVBQ0g7QUFBQSxZQUNJLEtBQUs7QUFBQSxZQUNMLE9BQU87QUFBQSxZQUNQLE1BQU07QUFBQSxVQUNWO0FBQUEsVUFDQTtBQUFBLFlBQ0ksS0FBSztBQUFBLFlBQ0wsT0FBTztBQUFBLFlBQ1AsTUFBTTtBQUFBLFVBQ1Y7QUFBQSxVQUNBO0FBQUEsWUFDSSxLQUFLO0FBQUEsWUFDTCxPQUFPO0FBQUEsWUFDUCxNQUFNO0FBQUEsWUFDTixTQUFTO0FBQUEsVUFDYjtBQUFBLFFBQ0o7QUFBQSxNQUNKO0FBQUEsSUFDSixDQUFDO0FBQUEsSUFHRCxRQUFRO0FBQUEsTUFDSixhQUFhO0FBQUEsTUFDYixpQkFBaUI7QUFBQSxNQUNqQixhQUFhO0FBQUEsTUFDYixTQUFTLENBQUMsS0FBSyxRQUFRLGtDQUFXLFlBQVksQ0FBQztBQUFBLElBQ25ELENBQUM7QUFBQSxJQUlELFFBQVE7QUFBQSxJQUdSLFVBQVU7QUFBQSxNQUNOLHdCQUF3QjtBQUFBLElBQzVCLENBQUM7QUFBQSxFQUNMO0FBQUEsRUFHQSxNQUFNO0FBQUEsSUFDRixTQUFTLENBQUMsbUJBQW1CO0FBQUEsSUFDN0IsYUFBYTtBQUFBLElBQ2IsTUFBTTtBQUFBLE1BQ0YsUUFBUSxDQUFDLFFBQVEsV0FBVyxVQUFVO0FBQUEsSUFDMUM7QUFBQSxFQUNKO0FBQUEsRUFHQSxZQUFZO0FBQUEsSUFDUixRQUFRO0FBQUEsSUFDUixZQUFZO0FBQUEsSUFDWixhQUFhO0FBQ1Qsc0JBQWdCO0FBQUEsSUFDcEI7QUFBQSxFQUNKO0FBQUEsRUFFQSxLQUFLO0FBQUEsSUFFRCxZQUFZLENBQUMsa0JBQWtCLFVBQVU7QUFBQSxFQUM3QztBQUNKLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
