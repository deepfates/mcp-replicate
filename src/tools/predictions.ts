/**
 * Tools for managing Replicate predictions.
 */

import type { Tool } from "@modelcontextprotocol/sdk/types.js";
import type { ReplicateClient } from "../replicate_client.js";
import type { Prediction } from "../models/prediction.js";

/**
 * Tool for creating new predictions.
 */
export const createPredictionTool: Tool = {
  name: "create_prediction",
  description:
    "Create a new prediction using either a model version (for community models) or model name (for official models)",
  inputSchema: {
    type: "object",
    properties: {
      version: {
        type: "string",
        description: "Model version ID to use (for community models)",
      },
      model: {
        type: "string",
        description: "Model name to use (for official models)",
      },
      input: {
        type: "object",
        description: "Input parameters for the model",
        additionalProperties: true,
      },
      webhook_url: {
        type: "string",
        description: "Optional webhook URL for notifications",
      },
    },
    oneOf: [
      { required: ["version", "input"] },
      { required: ["model", "input"] },
    ],
  },
};

/**
 * Tool for creating a new prediction, waiting for it to complete,
 * and returning the final output URL.
 */
export const createAndPollPredictionTool: Tool = {
  name: "create_and_poll_prediction",
  description:
    "Create a new prediction and wait until it's completed. Accepts either a model version (for community models) or a model name (for official models)",
  inputSchema: {
    type: "object",
    properties: {
      version: {
        type: "string",
        description: "Model version ID to use (for community models)",
      },
      model: {
        type: "string",
        description: "Model name to use (for official models)",
      },
      input: {
        type: "object",
        description: "Input parameters for the model",
        additionalProperties: true,
      },
      webhook_url: {
        type: "string",
        description: "Optional webhook URL for notifications",
      },
      poll_interval: {
        type: "number",
        description: "Optional interval between polls (default: 1)",
      },
      timeout: {
        type: "number",
        description: "Optional timeout for prediction (default: 60)",
      },
    },
    oneOf: [
      { required: ["version", "input"] },
      { required: ["model", "input"] },
    ],
  },
};

/**
 * Tool for canceling predictions.
 */
export const cancelPredictionTool: Tool = {
  name: "cancel_prediction",
  description: "Cancel a running prediction",
  inputSchema: {
    type: "object",
    properties: {
      prediction_id: {
        type: "string",
        description: "ID of the prediction to cancel",
      },
    },
    required: ["prediction_id"],
  },
};

/**
 * Tool for getting prediction details.
 */
export const getPredictionTool: Tool = {
  name: "get_prediction",
  description: "Get details about a specific prediction",
  inputSchema: {
    type: "object",
    properties: {
      prediction_id: {
        type: "string",
        description: "ID of the prediction to get details for",
      },
    },
    required: ["prediction_id"],
  },
};

/**
 * Tool for listing recent predictions.
 */
export const listPredictionsTool: Tool = {
  name: "list_predictions",
  description: "List recent predictions",
  inputSchema: {
    type: "object",
    properties: {
      limit: {
        type: "number",
        description: "Maximum number of predictions to return",
        default: 10,
      },
      cursor: {
        type: "string",
        description: "Cursor for pagination",
      },
    },
  },
};
