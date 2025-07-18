const js = require('@eslint/js');
const globals = require('globals');
const vuePlugin = require('eslint-plugin-vue');

// 定義忽略規則
const ignores = [
  '**/node_modules',
  'dist',
  '*.d.ts',
  '*.cjs',
  '*.mjs',
  '*.json',
  '*.md',
  '*.html',
  '*.css',
  '*.scss',
  '*.less',
  '*.svg',
  '*.png',
  '*.jpg',
  '*.jpeg',
  '*.gif',
  '*.ico',
  '.vscode',
  '*.log',
  '.DS_Store',
  'coverage',
  'build',
  '.cache',
  '.temp',
  '*.local',
  '*.log*',
  '*.sql',
  '*.sqlite',
  '*.db',
  '*.sqlite3'
];

// 合併全局變量
const browserGlobals = {
  ...globals.browser,
  ...globals.node,
  ...globals.es2021
};

module.exports = [
  // 全局忽略規則
  {
    ignores
  },
  
  // JavaScript 配置
  {
    files: ['**/*.js'],
    languageOptions: {
      globals: browserGlobals,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
      }
    },
    rules: {
      'no-unused-vars': 'warn',
      'no-undef': 'warn',
      'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
    }
  },
  
  // Vue 文件配置
  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: require('vue-eslint-parser'),
      parserOptions: {
        parser: 'espree',
        sourceType: 'module',
        ecmaVersion: 'latest',
        ecmaFeatures: {
          jsx: true
        }
      },
      globals: browserGlobals
    },
    plugins: {
      vue: vuePlugin
    },
    rules: {
      // 關閉多詞組件名的要求
      'vue/multi-word-component-names': 'off',
      // 關閉未定義變量的檢查，因為 Vue 的模板中可能會使用未定義的變量
      'no-undef': 'off',
      'vue/no-multiple-template-root': 'off',
      'vue/require-v-for-key': 'warn',
      'vue/valid-v-slot': ['error', { allowModifiers: true }]
    }
  },
  
  // 配置文件的特殊處理
  {
    files: ['vite.config.js', 'postcss.config.js', 'eslint.config.cjs'],
    languageOptions: {
      globals: {
        __dirname: 'readonly',
        process: 'readonly',
        module: 'readonly',
        require: 'readonly',
        __filename: 'readonly',
        exports: 'writable'
      }
    }
  }
];
