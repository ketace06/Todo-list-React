import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';

export default defineConfig({
    plugins: [pluginReact()],
  output: {
    assetPrefix: '/<https://github.com/ketace06/Todo-list-React>/',
  },
});