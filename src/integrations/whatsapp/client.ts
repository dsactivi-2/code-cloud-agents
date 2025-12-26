/**
 * WhatsApp Integration Client
 *
 * IMPORTANT: This is a STUB implementation.
 * Do not use in production without explicit approval.
 */

export interface WhatsAppConfig {
  apiUrl: string;
  apiToken: string;
}

export interface WhatsAppMessage {
  to: string;
  body: string;
  type: "text" | "template";
  templateName?: string;
  templateParams?: Record<string, string>;
}

export interface WhatsAppClient {
  isEnabled(): boolean;
  sendMessage(message: WhatsAppMessage): Promise<{ success: boolean; messageId?: string; error?: string }>;
  getStatus(): Promise<{ connected: boolean; error?: string }>;
}

/**
 * Creates a WhatsApp client instance
 * @param config - WhatsApp configuration (optional, reads from ENV if not provided)
 * @returns WhatsAppClient instance
 */
export function createWhatsAppClient(config?: WhatsAppConfig): WhatsAppClient {
  const enabled = process.env.WHATSAPP_ENABLED === "true";
  const apiUrl = config?.apiUrl || process.env.WHATSAPP_API_URL || "";
  const apiToken = config?.apiToken || process.env.WHATSAPP_API_TOKEN || "";

  return {
    /**
     * Check if WhatsApp integration is enabled
     */
    isEnabled(): boolean {
      return enabled;
    },

    /**
     * Send a message via WhatsApp
     * @param message - Message details including recipient and content
     * @returns Promise with success status and message ID
     */
    async sendMessage(_message: WhatsAppMessage): Promise<{ success: boolean; messageId?: string; error?: string }> {
      if (!enabled) {
        return {
          success: false,
          error: "WhatsApp integration disabled",
        };
      }

      if (!apiUrl || !apiToken) {
        return {
          success: false,
          error: "WhatsApp API credentials not configured",
        };
      }

      // TODO: Implement actual WhatsApp Business API call
      // Example: POST to apiUrl with message payload
      console.warn("WhatsApp sendMessage not yet implemented");
      return {
        success: false,
        error: "Not implemented",
      };
    },

    /**
     * Get connection status to WhatsApp Business API
     * @returns Promise with connection status
     */
    async getStatus(): Promise<{ connected: boolean; error?: string }> {
      if (!enabled) {
        return {
          connected: false,
          error: "WhatsApp integration disabled",
        };
      }

      if (!apiUrl || !apiToken) {
        return {
          connected: false,
          error: "WhatsApp API credentials not configured",
        };
      }

      // TODO: Implement actual health check
      return {
        connected: false,
        error: "Not implemented",
      };
    },
  };
}
