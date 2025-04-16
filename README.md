# Promptly - AI Prompt Optimizer

A web application that helps you rewrite AI prompts to be more effective, structured, and context-aware.

## Project Structure

This is a monorepo with two main applications:

- `apps/web`: The frontend Next.js web application
- `apps/api`: The backend Next.js API service

## Getting Started

### Prerequisites

- Node.js 16+ and npm
- OpenAI API key

### Setup

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Copy the example environment variables and fill in your OpenAI API key:
   ```
   cp apps/api/.env.example apps/api/.env.local
   ```
   Then edit `apps/api/.env.local` and add your OpenAI API key:
   ```
   OPENAI_API_KEY=your_api_key_here
   ```

### Development

To start the development servers:

1. Start the API server:

   ```
   cd apps/api
   ./start-api.sh
   ```

   This will start the API server on port 3001.

2. In a separate terminal, start the web application:

   ```
   cd apps/web
   ./start-web.sh
   ```

   This will start the web application on port 3002.

3. Open http://localhost:3002 in your browser

### Production Build

To create production builds for both applications:

```
npm run build
```

## Features

- Prompt rewriting with OpenAI GPT models
- Customizable tone, task, and context
- Light/dark mode support
- Responsive design for mobile and desktop

## Tech Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- Framer Motion
- OpenAI API

## What is Turborepo?

Turborepo is a high-performance build system for JavaScript/TypeScript monorepos. It provides:

- **Incremental builds**: Only rebuilds what changed
- **Remote caching**: Share build artifacts across machines
- **Parallel execution**: Run tasks across multiple packages simultaneously
- **Task dependencies**: Define relationships between tasks
- **Monorepo management**: Efficient handling of workspaces

In this project, Turborepo handles the coordination between our web and API applications, allowing them to work together seamlessly while maintaining separation of concerns.

## Project Pages

- **/** - Main prompt editor
- **/examples** - Example prompts and their optimized versions
- **/about** - Information about Promptly
- **/privacy** - Privacy policy

## Contributing

Feel free to submit issues or pull requests if you have suggestions for improvements.

## Troubleshooting

**API calls failing?**

- Check that your `.env` file has a valid OpenAI API key
- Ensure the API key has access to the gpt-4o-mini model
- Check for any rate limiting on your OpenAI account
- Verify the API is running on port 3001 and the web app is using the correct URL

**Build issues with Turborepo?**

- Clear the Turborepo cache: `npx turbo clean`
- Make sure all dependencies are installed: `npm install`

**Port conflicts?**

- If ports 3000 or 3001 are in use, modify the port numbers in the start scripts
- Update the `NEXT_PUBLIC_API_URL` in `apps/web/.env.local` accordingly

## License

All rights reserved.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fyour-username%2Fpromptly&env=OPENAI_API_KEY&envDescription=Get%20your%20OpenAI%20API%20key%20at%20platform.openai.com)
