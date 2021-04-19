import markdown from './patched_markdown.tsx'
import type { Config } from 'https://deno.land/x/aleph@v0.3.0-alpha.30/types.ts'

export default (): Config => ({
  buildTarget: 'es2015',
  plugins: [
    markdown(),
  ],
  css: {
    postcss: {
      plugins: ['postcss-nested', 'autoprefixer']
    }
  }
})
