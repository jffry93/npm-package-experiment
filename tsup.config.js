export default {
  entry: ['index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  esbuildOptions(options) {
    options.loader = {
      ...options.loader,
      '.js': 'jsx'
    };
  }
};
