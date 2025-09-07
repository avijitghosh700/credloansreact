import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';

export default defineConfig({
  html: {
    title: 'CredLoans - Your Trusted Loan Partner',
    meta: [
      { name: 'description', content: 'CredLoans - Your Trusted Loan Partner' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'author', content: 'Your Name or Company' },
      { name: 'keywords', content: 'loans, personal loans, business loans, finance, CredLoans' },
    ],
  },
  plugins: [pluginReact()],
});
