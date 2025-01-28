# Replicate MCP Server
[![smithery badge](https://smithery.ai/badge/mcp-server-replicate)](https://smithery.ai/server/mcp-server-replicate)

A [Model Context Protocol](https://github.com/mcp-sdk/mcp) server implementation for [Replicate](https://replicate.com). This server provides access to Replicate's models and predictions through a simple tool-based interface.

## Features

### Model Management
- Search models by query
- List models with optional owner filter
- Get model details and versions

### Prediction Handling
- Create predictions with string or object input
- Check prediction status
- Cancel running predictions
- List recent predictions

### Image Tools
- View images in system browser
- Save images to local filesystem

## Examples

### Search Models
```typescript
const results = await client.callTool("search_models", {
  query: "text to image models"
});
```

### Create Prediction
```typescript
const prediction = await client.callTool("create_prediction", {
  version: "model_version_id",
  input: "Your text prompt here" // Automatically wrapped in {text: string}
});
```

### Check Prediction Status
```typescript
const status = await client.callTool("get_prediction", {
  prediction_id: "prediction_id"
});
```

## Installation

### Installing via Smithery

To install Replicate for Claude Desktop automatically via [Smithery](https://smithery.ai/server/mcp-server-replicate):

```bash
npx -y @smithery/cli install mcp-server-replicate --client claude
```

### Manual Installation

```bash
npm install
```

## Configuration

The server requires a Replicate API token. You can set it in one of two ways:

1. Environment variable:
```bash
export REPLICATE_API_TOKEN=your_token_here
```

2. Pass it directly when creating the client:
```typescript
const client = new ReplicateClient("your_token_here");
```

## Usage

1. Build the TypeScript code:
```bash
npm run build
```

2. Start the server:
```bash
npm start
```

The server communicates via stdio using the MCP protocol. You can use any MCP client to interact with it.

## Development

1. Install dependencies:
```bash
npm install
```

2. Start the development server (with auto-reload):
```bash
npm run dev
```

3. Lint the code:
```bash
npm run lint
```

4. Format the code:
```bash
npm run format
```

## Available Tools

### Model Tools
- `search_models`: Search for models using semantic search
- `list_models`: List available models with optional filtering
- `get_model`: Get details of a specific model including versions

### Prediction Tools
- `create_prediction`: Create a new prediction using a model version
- `cancel_prediction`: Cancel a running prediction
- `get_prediction`: Get details about a specific prediction
- `list_predictions`: List recent predictions

### Image Tools
- `view_image`: Display an image in the system's default web browser
- `save_image`: Save an image to the local filesystem

## Requirements

- Node.js >= 18.0.0
- TypeScript >= 5.0.0

## License

MIT
