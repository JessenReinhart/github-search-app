# GitHub User Search App

A simple React application that allows users to search for GitHub users and view their repositories.

## Demo

You can try the live demo of the app here: [Live Demo](https://jessen-github-search.vercel.app/)

## Getting Started

These instructions will help you set up the project on your local machine for development and testing purposes.

### Prerequisites

- Node.js and npm installed on your machine.

### Installing

1. Clone the repository:

```bash
git clone https://github.com/your-github-username/your-repo-name.git
cd your-repo-name
```

2. Install the dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory of your project and add your GitHub personal access token to it:
```
REACT_APP_GITHUB_ACCESS_TOKEN=YOUR_ACCESS_TOKEN
```

### Usage

To start the development server, run:

```bash
npm run dev
```

Open your browser and navigate to `http://localhost:3000` to view the app.

### Build

To create a production build, run:

```bash
npm run build
```

### Deployment

To deploy the app to GitHub Pages, run:

```bash
npm run deploy
```

The app will be deployed and accessible at `https://jessen-github-search.vercel.app`.

## Built With

- React
- TypeScript
- Vite
- Tailwind CSS

## API

The app integrates with the GitHub API to search for users and fetch their repositories. The API documentation can be found here: [GitHub API Documentation](https://developer.github.com/v3/)

## Authors

- Jessen Reinhart - [JessenReinhart](https://github.com/JessenReinhart)