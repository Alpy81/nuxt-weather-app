# Nuxt 3 Weather App


## Setup

Make sure to install the dependencies:

# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install


## Installing Nuxt3

# npx
npx nuxi@latest init <project-name>

# pnpm
pnpm dlx nuxi@latest init <project-name>

# bun 
bunx nuxi@latest init <project-name>


## Development Server

Start the development server on `http://localhost:3000`:

# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev

# bun
bun run dev


## Production

Build the application for production:

# npm
npm run build

# pnpm
pnpm run build

# yarn
yarn build

# bun
bun run build


Go to 'openeatherapp.org' and get your API Key.
Fill the information of your API in a Folder, for example 'store' and open a file, which you can call 'weather.js'.
In this you can fill your API Key and the link of 'openweatherapp.org' to your code.

Create a folder, for example 'components' with a file, whitch you can call 'WeatherForm.vue'.
Here you can code your template.

Finish your Code competely.

Now you can start searching for your city by filling the input. 
After this step, you pull the button an you get the weather information about the city you have choosen.
If the city is not found, the application shows an error message.