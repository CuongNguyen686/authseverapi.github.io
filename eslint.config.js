import js from '@eslint/js'; import globals from 'globals'; import reactHooks from 'eslint-plugin-react-hooks';
export default [js.configs.recommended,{files:['**/*.{js,jsx}'],languageOptions:{ecmaVersion:'latest',sourceType:'module',globals:{...globals.browser}},plugins:{'react-hooks':reactHooks},rules:{'no-unused-vars':['error',{argsIgnorePattern:'^_'}],'react-hooks/rules-of-hooks':'error'}}];
