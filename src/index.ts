#!/usr/bin/env node

/**
 * MCP server implementation for Replicate.
 * Provides access to Replicate models and predictions through MCP.
 */

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

import { ReplicateClient } from "./replicate_client.js";
import type { Model } from "./models/model.js";
import type {
  Prediction,
  ModelIO,
  PredictionStatus,
} from "./models/prediction.js";
import type { Collection } from "./models/collection.js";

import { tools } from "./tools/index.js";
import {
  handleSearchModels,
  handleListModels,
  handleListCollections,
  handleGetCollection,
  handleCreatePrediction,
  handleCreateAndPollPrediction,
  handleCancelPrediction,
  handleGetPrediction,
  handleListPredictions,
  handleGetModel,
} from "./tools/handlers.js";
import {
  handleViewImage,
  handleClearImageCache,
  handleGetImageCacheStats,
} from "./tools/image_viewer.js";

// Initialize Replicate client
const client = new ReplicateClient();

// Cache for models, predictions, collections, and prediction status
const modelCache = new Map<string, Model>();
const predictionCache = new Map<string, Prediction>();
const collectionCache = new Map<string, Collection>();
const predictionStatus = new Map<string, PredictionStatus>();

// Cache object for tool handlers
const cache = {
  modelCache,
  predictionCache,
  collectionCache,
  predictionStatus,
};

/**
 * Create an MCP server with capabilities for
 * tools (to run predictions)
 */
const server = new Server(
  {
    name: "replicate",
    version: "0.1.0",
  },
  {
    capabilities: {
      tools: {},
      prompts: {},
    },
  }
);

/**
 * Handler that lists available tools.
 */
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return { tools };
});

/**
 * Handler for tools.
 */
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  switch (request.params.name) {
    case "search_models":
      return handleSearchModels(client, cache, {
        query: String(request.params.arguments?.query),
      });

    case "list_models":
      return handleListModels(client, cache, {
        owner: request.params.arguments?.owner as string | undefined,
        cursor: request.params.arguments?.cursor as string | undefined,
      });

    case "list_collections":
      return handleListCollections(client, cache, {
        cursor: request.params.arguments?.cursor as string | undefined,
      });

    case "get_collection":
      return handleGetCollection(client, cache, {
        slug: String(request.params.arguments?.slug),
      });

    case "create_prediction":
      return handleCreatePrediction(client, cache, {
        version: request.params.arguments?.version as string | undefined,
        model: request.params.arguments?.model as string | undefined,
        input: request.params.arguments?.input as ModelIO,
        webhook: request.params.arguments?.webhook_url as string | undefined,
      });

    case "create_and_poll_prediction":
      return handleCreateAndPollPrediction(client, cache, {
        version: request.params.arguments?.version as string | undefined,
        model: request.params.arguments?.model as string | undefined,
        input: request.params.arguments?.input as ModelIO,
        webhook: request.params.arguments?.webhook_url as string | undefined,
      });

    case "cancel_prediction":
      return handleCancelPrediction(client, cache, {
        prediction_id: String(request.params.arguments?.prediction_id),
      });

    case "get_prediction":
      return handleGetPrediction(client, cache, {
        prediction_id: String(request.params.arguments?.prediction_id),
      });

    case "list_predictions":
      return handleListPredictions(client, cache, {
        limit: request.params.arguments?.limit as number | undefined,
        cursor: request.params.arguments?.cursor as string | undefined,
      });

    case "get_model":
      return handleGetModel(client, cache, {
        owner: String(request.params.arguments?.owner),
        name: String(request.params.arguments?.name),
      });

    case "view_image":
      return handleViewImage(request);

    case "clear_image_cache":
      return handleClearImageCache(request);

    case "get_image_cache_stats":
      return handleGetImageCacheStats(request);

    default:
      throw new Error("Unknown tool");
  }
});

/**
 * Start the server using stdio transport.
 */
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((error) => {
  console.error("Server error:", error);
  process.exit(1);
});
