import shrinkRay from "shrink-ray-current";

export default {
  mode: "spa",
  head: {
    title: "Gravity Shop",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || ""
      }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/gravity-logo.ico" },
      {
        rel: "stylesheet",
        type: "text/css",
        href:
          "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
      },
      {
        rel: "stylesheet",
        type: "text/css",
        href:
          "https://cdnjs.cloudflare.com/ajax/libs/flexslider/2.7.2/flexslider.min.css"
      },
      {
        rel: "stylesheet",
        type: "text/css",
        href:
          "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      },
      {
        rel: "stylesheet",
        type: "text/css",
        href:
          "//fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i,800"
      },
      {
        rel: "stylesheet",
        type: "text/css",
        href:
          "//fonts.googleapis.com/css?family=Lato:400,100,100italic,300,300italic,400italic,700,900,900italic,700italic"
      }
    ],
    script: [
      { src: "https://code.jquery.com/jquery-2.2.4.min.js" },
      {
        src:
          "https://cdnjs.cloudflare.com/ajax/libs/jquery-easing/1.4.1/jquery.easing.min.js"
      },
      {
        src:
          "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"
      },
      {
        src:
          "https://cdnjs.cloudflare.com/ajax/libs/flexslider/2.7.2/jquery.flexslider-min.js"
      },
      { src: "/js/imagezoom.js" }
    ]
  },
  loading: { color: "#fff" },
  css: ["@/assets/css/style.css"],
  plugins: [{ src: "~/plugins/timeago.js", ssr: false }],
  buildModules: [
    "@nuxtjs/vuetify",
    [
      "@nuxtjs/google-analytics",
      {
        id: "UA-154970443-1"
      }
    ]
  ],
  modules: [
    "@nuxtjs/apollo",
    "@nuxtjs/auth",
    [
      "@nuxtjs/google-adsense",
      {
        id: "ca-pub-8644912652068983",
        analyticsUacct: "UA-154970443-1",
        includeQuery: true,
        analyticsDomainName: "fashiontrampa.ba"
      }
    ],
    [
      "nuxt-compress",
      {
        gzip: {
          cache: true
        },
        brotli: {
          threshold: 10240
        }
      }
    ]
  ],
  apollo: {
    clientConfigs: {
      default: {
        httpEndpoint: "http://localhost:1337/graphql",
        tokenName: "jwt",
        authenticationType: "Bearer"
      }
    }
  },
  build: {
    minimize: true,
    minimizer: ["terser-webpack-plugin", "optimize-css-assets-webpack-plugin"],
    splitChunks: {
      chunks: "all",
      automaticNameDelimiter: ".",
      name: undefined,
      cacheGroups: {}
    },
    extractCSS: true,
    optimization: {
      splitChunks: {
        cacheGroups: {
          styles: {
            name: "styles",
            test: /\.(css|vue)$/,
            chunks: "all",
            enforce: true
          }
        }
      }
    },
    collapseBooleanAttributes: true,
    decodeEntities: true,
    minifyCSS: true,
    minifyJS: true,
    processConditionalComments: true,
    removeEmptyAttributes: true,
    removeRedundantAttributes: true,
    trimCustomFragments: true,
    useShortDoctype: true,
    optimizeCSS: true
  },
  env: {
    CMS_URL: "http://localhost:1337"
  },
  render: {
    compressor: shrinkRay(),
    static: {
      maxAge: 1000 * 60 * 60 * 24 * 7
    }
  }
};