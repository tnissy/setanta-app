module.exports = {
  presets: ['babel-preset-expo'],
  plugins: [
    ['@babel/plugin-transform-typescript', { allowDeclareFields: true }],
    '@babel/plugin-transform-export-namespace-from',
    '@babel/plugin-transform-runtime',
    ['@babel/plugin-transform-class-properties', { loose: true }],
    ['@babel/plugin-transform-private-methods', { loose: true }],
    ['@babel/plugin-transform-private-property-in-object', { loose: true }],
    ['@babel/plugin-transform-object-rest-spread', { loose: true }],
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['module:react-native-dotenv', {
      moduleName: '@env',
      path: '.env',
      blacklist: null,
      whitelist: null,
      safe: false,
      allowUndefined: true,
    }]
  ]
};