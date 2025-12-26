/**
 * Agent Control API
 *
 * Provides REST endpoints for managing agents:
 * - List all agents
 * - Get agent status
 * - Start/Stop agents
 * - Get agent logs
 * - Get agent configuration
 * - Get agent metrics
 */

import { Router } from "express";
import { z } from "zod";

// Agent Types in the system
export type AgentType =
  | "ENGINEERING_LEAD_SUPERVISOR"
  | "CLOUD_ASSISTANT"
  | "META_SUPERVISOR";

export type AgentState = "idle" | "working" | "stopped" | "error";

export interface Agent {
  id: string;
  name: AgentType;
  state: AgentState;
  currentTask?: string;
  progress?: number;
  startedAt: string;
  lastActivity: string;
  tasksCompleted: number;
  tasksInProgress: number;
  errorCount: number;
}

export interface AgentLog {
  timestamp: string;
  level: "info" | "warn" | "error" | "debug";
  message: string;
  context?: Record<string, unknown>;
}

export interface AgentMetrics {
  uptime: number; // seconds
  totalTasks: number;
  successfulTasks: number;
  failedTasks: number;
  averageTaskDuration: number; // seconds
  memoryUsage: {
    rss: number;
    heapTotal: number;
    heapUsed: number;
    external: number;
  };
  cpuUsage: {
    user: number;
    system: number;
  };
}

// Request validation schemas
const UpdateAgentStateSchema = z.object({
  state: z.enum(["idle", "working", "stopped"]),
  reason: z.string().optional(),
});

/**
 * In-memory agent state management (in production, use Redis or similar)
 */
class AgentManager {
  private agents: Map<string, Agent> = new Map();
  private logs: Map<string, AgentLog[]> = new Map();
  private startTime: number = Date.now();

  constructor() {
    // Initialize default agents
    this.initializeAgents();
  }

  private initializeAgents(): void {
    const defaultAgents: AgentType[] = [
      "ENGINEERING_LEAD_SUPERVISOR",
      "CLOUD_ASSISTANT",
      "META_SUPERVISOR",
    ];

    defaultAgents.forEach((agentName) => {
      const agentId = this.generateAgentId(agentName);
      this.agents.set(agentId, {
        id: agentId,
        name: agentName,
        state: "idle",
        startedAt: new Date().toISOString(),
        lastActivity: new Date().toISOString(),
        tasksCompleted: 0,
        tasksInProgress: 0,
        errorCount: 0,
      });
      this.logs.set(agentId, []);
    });
  }

  private generateAgentId(agentName: AgentType): string {
    return `agent_${agentName.toLowerCase()}`;
  }

  getAll(): Agent[] {
    return Array.from(this.agents.values());
  }

  getById(agentId: string): Agent | undefined {
    return this.agents.get(agentId);
  }

  updateState(agentId: string, state: AgentState, currentTask?: string, progress?: number): boolean {
    const agent = this.agents.get(agentId);
    if (!agent) return false;

    agent.state = state;
    agent.currentTask = currentTask;
    agent.progress = progress;
    agent.lastActivity = new Date().toISOString();

    // Broadcast state change via WebSocket
    const wsManager = (global as typeof global & { wsManager?: { broadcastAgentStatus: (status: unknown) => void } })
      .wsManager;
    if (wsManager) {
      wsManager.broadcastAgentStatus({
        agentName: agent.name,
        state: agent.state,
        currentTask: agent.currentTask,
        progress: agent.progress,
      });
    }

    return true;
  }

  addLog(agentId: string, level: AgentLog["level"], message: string, context?: Record<string, unknown>): void {
    const logs = this.logs.get(agentId) || [];
    logs.push({
      timestamp: new Date().toISOString(),
      level,
      message,
      context,
    });

    // Keep only last 1000 logs per agent
    if (logs.length > 1000) {
      logs.shift();
    }

    this.logs.set(agentId, logs);
  }

  getLogs(agentId: string, limit: number = 100): AgentLog[] {
    const logs = this.logs.get(agentId) || [];
    return logs.slice(-limit);
  }

  getMetrics(agentId: string): AgentMetrics | null {
    const agent = this.agents.get(agentId);
    if (!agent) return null;

    const memUsage = process.memoryUsage();
    const cpuUsage = process.cpuUsage();

    return {
      uptime: Math.floor((Date.now() - this.startTime) / 1000),
      totalTasks: agent.tasksCompleted + agent.errorCount,
      successfulTasks: agent.tasksCompleted,
      failedTasks: agent.errorCount,
      averageTaskDuration: 0, // TODO: Implement task duration tracking
      memoryUsage: {
        rss: memUsage.rss,
        heapTotal: memUsage.heapTotal,
        heapUsed: memUsage.heapUsed,
        external: memUsage.external,
      },
      cpuUsage: {
        user: cpuUsage.user,
        system: cpuUsage.system,
      },
    };
  }

  incrementTaskCount(agentId: string, success: boolean): void {
    const agent = this.agents.get(agentId);
    if (!agent) return;

    if (success) {
      agent.tasksCompleted++;
    } else {
      agent.errorCount++;
    }
  }
}

// Global agent manager instance
const agentManager = new AgentManager();

/**
 * Creates Agent Control API router
 */
export function createAgentRouter(): Router {
  const router = Router();

  /**
   * GET /api/agents
   * List all agents
   */
  router.get("/", (_req, res) => {
    const agents = agentManager.getAll();
    res.json({
      success: true,
      agents,
      count: agents.length,
    });
  });

  /**
   * GET /api/agents/:agentId
   * Get specific agent details
   */
  router.get("/:agentId", (req, res) => {
    const { agentId } = req.params;
    const agent = agentManager.getById(agentId);

    if (!agent) {
      return res.status(404).json({
        success: false,
        error: "Agent not found",
      });
    }

    res.json({
      success: true,
      agent,
    });
  });

  /**
   * POST /api/agents/:agentId/start
   * Start an agent
   */
  router.post("/:agentId/start", (req, res) => {
    const { agentId } = req.params;
    const agent = agentManager.getById(agentId);

    if (!agent) {
      return res.status(404).json({
        success: false,
        error: "Agent not found",
      });
    }

    if (agent.state !== "stopped") {
      return res.status(400).json({
        success: false,
        error: `Agent is already ${agent.state}`,
      });
    }

    const updated = agentManager.updateState(agentId, "idle");
    agentManager.addLog(agentId, "info", "Agent started");

    res.json({
      success: updated,
      message: "Agent started successfully",
      agent: agentManager.getById(agentId),
    });
  });

  /**
   * POST /api/agents/:agentId/stop
   * Stop an agent
   */
  router.post("/:agentId/stop", (req, res) => {
    const { agentId } = req.params;
    const { reason } = req.body;

    const agent = agentManager.getById(agentId);

    if (!agent) {
      return res.status(404).json({
        success: false,
        error: "Agent not found",
      });
    }

    if (agent.state === "stopped") {
      return res.status(400).json({
        success: false,
        error: "Agent is already stopped",
      });
    }

    const updated = agentManager.updateState(agentId, "stopped");
    agentManager.addLog(agentId, "info", `Agent stopped${reason ? `: ${reason}` : ""}`, { reason });

    res.json({
      success: updated,
      message: "Agent stopped successfully",
      agent: agentManager.getById(agentId),
    });
  });

  /**
   * PATCH /api/agents/:agentId/state
   * Update agent state (idle/working/stopped)
   */
  router.patch("/:agentId/state", (req, res) => {
    const { agentId } = req.params;

    const parsed = UpdateAgentStateSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        error: "Invalid request",
        details: parsed.error.issues,
      });
    }

    const agent = agentManager.getById(agentId);

    if (!agent) {
      return res.status(404).json({
        success: false,
        error: "Agent not found",
      });
    }

    const updated = agentManager.updateState(agentId, parsed.data.state);
    agentManager.addLog(agentId, "info", `State changed to ${parsed.data.state}`, {
      reason: parsed.data.reason,
    });

    res.json({
      success: updated,
      agent: agentManager.getById(agentId),
    });
  });

  /**
   * GET /api/agents/:agentId/logs
   * Get agent logs
   */
  router.get("/:agentId/logs", (req, res) => {
    const { agentId } = req.params;
    const limit = parseInt(req.query.limit as string) || 100;
    const level = req.query.level as AgentLog["level"] | undefined;

    const agent = agentManager.getById(agentId);

    if (!agent) {
      return res.status(404).json({
        success: false,
        error: "Agent not found",
      });
    }

    let logs = agentManager.getLogs(agentId, limit);

    // Filter by level if specified
    if (level) {
      logs = logs.filter((log) => log.level === level);
    }

    res.json({
      success: true,
      logs,
      count: logs.length,
    });
  });

  /**
   * GET /api/agents/:agentId/metrics
   * Get agent metrics
   */
  router.get("/:agentId/metrics", (req, res) => {
    const { agentId } = req.params;

    const agent = agentManager.getById(agentId);

    if (!agent) {
      return res.status(404).json({
        success: false,
        error: "Agent not found",
      });
    }

    const metrics = agentManager.getMetrics(agentId);

    res.json({
      success: true,
      metrics,
    });
  });

  /**
   * GET /api/agents/health
   * Get overall system health
   */
  router.get("/health/status", (_req, res) => {
    const agents = agentManager.getAll();
    const stoppedCount = agents.filter((a) => a.state === "stopped").length;
    const errorCount = agents.filter((a) => a.state === "error").length;
    const workingCount = agents.filter((a) => a.state === "working").length;
    const idleCount = agents.filter((a) => a.state === "idle").length;

    const health = errorCount === 0 && stoppedCount === 0 ? "healthy" : errorCount > 0 ? "unhealthy" : "degraded";

    res.json({
      success: true,
      health,
      summary: {
        total: agents.length,
        idle: idleCount,
        working: workingCount,
        stopped: stoppedCount,
        error: errorCount,
      },
      agents: agents.map((a) => ({
        id: a.id,
        name: a.name,
        state: a.state,
      })),
    });
  });

  return router;
}

// Export agent manager for internal use
export { agentManager };
