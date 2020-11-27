module.exports = {
  apps: [
    {
      name: "trampa-cms",
      cwd: "/home/branko/the-fashion-trampa/backend",
      script: "yarn strapi start",
      env: {
        NODE_ENV: "production",
        DATABASE_HOST: "localhost",
        DATABASE_PORT: "5432",
        DATABASE_NAME: "trampa",
        DATABASE_USERNAME: "",
        DATABASE_PASSWORD: ""
      }
    },
    {
      name: "trampa-fe",
      cwd: "/home/branko/the-fashion-trampa/frontend",
      script: "nuxt build && nuxt start",
      env: {
        NODE_ENV: "production",
        CMS_URL: "https://admin.fashiontrampa",
        GRAPHQL_ENDPOINT: "https://admin.fashiontrampa/graphql"
      }
    }
  ]
};
