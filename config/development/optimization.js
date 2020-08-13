const optimization = {
  // As suggested by Microsoft's Outlook team, these optimizations
  // crank up Webpack x Typescript perf
  // @see https://medium.com/@kenneth_chau/speeding-up-webpack-typescript-incremental-builds-by-7x-3912ba4c1d15
  splitChunks: false,
  removeAvailableModules: false,
  removeEmptyChunks: false,
  // Keep the runtime chunk separated to enable long term caching
  // https://twitter.com/wSokra/status/969679223278505985
  // https://github.com/facebook/create-react-app/issues/5358
  runtimeChunk: {
    name: entrypoint => `runtime-${entrypoint.name}`,
  },
};

module.exports = optimization;
