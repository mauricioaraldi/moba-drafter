module.exports = {
  pages: {
    index: {
      entry: 'src/main.js',
      title: 'MOBA Drafter 0.2.0',
    }
  },
  publicPath: process.env.NODE_ENV === 'production'
    ? '/moba-drafter/'
    : '/',
  css: {
    loaderOptions: {
      scss: {
        additionalData: `@import "@/assets/styles/vars.scss";`
      }
    }
  }
}
