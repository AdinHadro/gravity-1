module.exports = {
  apps: [
    {
      name: "gravity-cms",
      cwd: "/home/gravity/gravity-1/backend",
      script: "yarn build && yarn start",
      env: {
        NODE_ENV: "production"
      }
    }
  ]
};
