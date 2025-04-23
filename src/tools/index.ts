/**
 * MCP tools for interacting with Replicate.
 */

export * from "./models.js";
export * from "./predictions.js";
export * from "./image_viewer.js";

import type { Tool } from "@modelcontextprotocol/sdk/types.js";
import {
  searchModelsTool,
  listModelsTool,
  listCollectionsTool,
  getCollectionTool,
  getModelTool,
} from "./models.js";
import {
  createPredictionTool,
  createAndPollPredictionTool,
  cancelPredictionTool,
  getPredictionTool,
  listPredictionsTool,
} from "./predictions.js";
import {
  viewImageTool,
  clearImageCacheTool,
  getImageCacheStatsTool,
} from "./image_viewer.js";

/**
 * All available tools.
 */
export const tools: Tool[] = [
  searchModelsTool,
  listModelsTool,
  listCollectionsTool,
  getCollectionTool,
  createPredictionTool,
  createAndPollPredictionTool,
  cancelPredictionTool,
  getPredictionTool,
  listPredictionsTool,
  getModelTool,
  // Image viewer tools
  viewImageTool,
  clearImageCacheTool,
  getImageCacheStatsTool,
];
