/**
 * Linear Integration Client
 *
 * IMPORTANT: This is a STUB implementation.
 * Do not use in production without explicit approval.
 */

export interface LinearConfig {
  apiKey: string;
  teamId?: string;
}

export interface LinearIssue {
  title: string;
  description: string;
  priority?: number; // 0 (No priority) to 4 (Urgent)
  labels?: string[];
  assigneeId?: string;
}

export interface LinearClient {
  isEnabled(): boolean;
  createIssue(issue: LinearIssue): Promise<{ success: boolean; issueId?: string; error?: string }>;
  getStatus(): Promise<{ connected: boolean; error?: string }>;
}

/**
 * Creates a Linear client instance
 * @param config - Linear configuration (optional, reads from ENV if not provided)
 * @returns LinearClient instance
 */
export function createLinearClient(config?: LinearConfig): LinearClient {
  const enabled = process.env.LINEAR_ENABLED === "true";
  const apiKey = config?.apiKey || process.env.LINEAR_API_KEY || "";
  const teamId = config?.teamId || process.env.LINEAR_TEAM_ID;

  return {
    /**
     * Check if Linear integration is enabled
     */
    isEnabled(): boolean {
      return enabled;
    },

    /**
     * Create an issue in Linear
     * @param issue - Issue details
     * @returns Promise with success status and issue ID
     */
    async createIssue(_issue: LinearIssue): Promise<{ success: boolean; issueId?: string; error?: string }> {
      if (!enabled) {
        return { success: false, error: "Linear integration disabled" };
      }

      if (!apiKey) {
        return { success: false, error: "Linear API key not configured" };
      }

      if (!teamId) {
        return { success: false, error: "Linear team ID not configured" };
      }

      // TODO: Implement actual Linear GraphQL API call
      // Example: Use @linear/sdk or fetch to Linear GraphQL API
      console.warn("Linear createIssue not yet implemented");
      return { success: false, error: "Not implemented" };
    },

    /**
     * Get connection status to Linear
     * @returns Promise with connection status
     */
    async getStatus(): Promise<{ connected: boolean; error?: string }> {
      if (!enabled) {
        return { connected: false, error: "Linear integration disabled" };
      }

      if (!apiKey) {
        return { connected: false, error: "Linear API key not configured" };
      }

      // TODO: Implement actual Linear viewer query
      // Example: GraphQL query { viewer { id name } }
      return { connected: false, error: "Not implemented" };
    }
  };
}
