# Replicate MCP Server

A [Model Context Protocol](https://github.com/mcp-sdk/mcp) server implementation for Replicate. Run Replicate models through a simple tool-based interface.

## Installation

```bash
npm install -g mcp-replicate
```

Or install from source:
```bash
git clone https://github.com/deepfates/mcp-replicate
cd mcp-replicate
npm install
npm run build
```

<a href="https://glama.ai/mcp/servers/q60hq1hwtr"><img width="380" height="200" src="https://glama.ai/mcp/servers/q60hq1hwtr/badge" alt="Replicate Server MCP server" /></a>

## Features

### Models
- Search models using semantic search
- Browse models and collections
- Get detailed model information and versions

### Predictions
- Create predictions with text or structured input
- Track prediction status
- Cancel running predictions 
- List your recent predictions

### Image Handling
- View generated images in your browser
- Manage image cache for better performance

## Configuration 

The server needs a Replicate API token to work. Set it as an environment variable:

```bash
export REPLICATE_API_TOKEN=your_token_here
```

## Usage

If installed globally:
```bash
mcp-replicate
```

Or run directly with npx:
```bash
npx mcp-replicate
```

Or if installed from source:
```bash
npm start
```

The server uses stdio to communicate via the MCP protocol. You'll need an MCP client to interact with it.

## Available Tools

### Model Tools
- `search_models`: Find models using semantic search
- `list_models`: Browse available models
- `get_model`: Get details about a specific model
- `list_collections`: Browse model collections
- `get_collection`: Get details about a specific collection

### Prediction Tools  
- `create_prediction`: Run a model with your inputs
- `get_prediction`: Check a prediction's status
- `cancel_prediction`: Stop a running prediction
- `list_predictions`: See your recent predictions

### Image Tools
- `view_image`: Open an image in your browser
- `clear_image_cache`: Clean up cached images
- `get_image_cache_stats`: Check cache usage

## Examples

Here are some examples using an MCP client:

### Search Models
```typescript
// Find text-to-image models
const results = await mcpClient.invoke("search_models", {
  query: "text to image models"
});
```

### Create a Prediction
```typescript
// Run a model
const prediction = await mcpClient.invoke("create_prediction", {
  version: "model_version_id",
  input: {
    prompt: "A friendly robot making pancakes"
  }
});
```

### Check Prediction Status
```typescript
// Get prediction results
const status = await mcpClient.invoke("get_prediction", {
  prediction_id: "prediction_id"
});
```

### Browse Collections
```typescript
// List featured collections
const collections = await mcpClient.invoke("list_collections", {});
```

## Development

1. Install dependencies:
```bash
npm install
```

2. Start development server (with auto-reload):
```bash
npm run dev
```

3. Check code style:
```bash
npm run lint
```

4. Format code:
```bash
npm run format
```

## Requirements

- Node.js >= 18.0.0
- TypeScript >= 5.0.0

## License

MIT
