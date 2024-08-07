# Frontend start project template

## Starting

1. npm install

## Command

1. Start development server: **npm run start**
2. Start development server with opening a page in the browser: **npm run start:open**
3. Create a production build: **npm run build**
4. Open a builded project in the browser: **npm run preview**
5. Lint code by prettier: **npm run prettier**
6. Lint code by eslint: **npm run eslint**
7. Lint code by prettier, eslint: **npm run lint**
8. Format code by prettier: **npm run prettier:format**

## Notes

1. If you wanna add a new global variable to the project, you can do it in ./config/webpack/buildPlugins <- DefinePlugin <br>
   then add this value to global.d.ts in the src directory
2. You can delete .keeper file from public directory if there will be files besides index.html in the public directory
3. You can use .env file in the webpack config
