/**
 * GitHub Integration Client
 *
 * IMPORTANT: This is a STUB implementation.
 * Do not use in production without explicit approval.
 */

export interface GitHubConfig {
  token: string;
  org?: string;
}

export interface GitHubIssue {
  title: string;
  body: string;
  labels?: string[];
  assignees?: string[];
}

export interface GitHubClient {
  isEnabled(): boolean;
  createIssue(repo: string, issue: GitHubIssue): Promise<{ success: boolean; issueNumber?: number; error?: string }>;
  getStatus(): Promise<{ connected: boolean; error?: string }>;
}

/**
 * Creates a GitHub client instance
 * @param config - GitHub configuration (optional, reads from ENV if not provided)
 * @returns GitHubClient instance
 */
export function createGitHubClient(config?: GitHubConfig): GitHubClient {
  const enabled = process.env.GITHUB_ENABLED === "true";
  const token = config?.token || process.env.GITHUB_TOKEN || "";
  const org = config?.org || process.env.GITHUB_ORG;

  return {
    /**
     * Check if GitHub integration is enabled
     */
    isEnabled(): boolean {
      return enabled;
    },

    /**
     * Create an issue in a GitHub repository
     * @param repo - Repository name (e.g., "owner/repo")
     * @param issue - Issue details
     * @returns Promise with success status and issue number
     */
    async createIssue(_repo: string, _issue: GitHubIssue): Promise<{ success: boolean; issueNumber?: number; error?: string }> {
      if (!enabled) {
        return { success: false, error: "GitHub integration disabled" };
      }

      if (!token) {
        return { success: false, error: "GitHub token not configured" };
      }

      // TODO: Implement actual GitHub API call
      // Example: Use @octokit/rest or fetch to GitHub REST API
      console.warn("GitHub createIssue not yet implemented");
      return { success: false, error: "Not implemented" };
    },

    /**
     * Get connection status to GitHub
     * @returns Promise with connection status
     */
    async getStatus(): Promise<{ connected: boolean; error?: string }> {
      if (!enabled) {
        return { connected: false, error: "GitHub integration disabled" };
      }

      if (!token) {
        return { connected: false, error: "GitHub token not configured" };
      }

      // TODO: Implement actual GitHub user check
      // Example: GET /user with token
      return { connected: false, error: "Not implemented" };
    }
  };
}
