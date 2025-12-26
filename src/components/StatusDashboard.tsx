import { useEffect, useState } from 'react';

interface Stats {
  serverStatus: 'online' | 'offline';
  userCount: number;
  agentCount: number;
  chatCount: number;
}

export function StatusDashboard() {
  const [stats, setStats] = useState<Stats>({
    serverStatus: 'offline',
    userCount: 0,
    agentCount: 5, // Fixwert: Agent 0-4
    chatCount: 0,
  });

  useEffect(() => {
    // 1. Health Check
    fetch('http://178.156.178.70:3000/health')
      .then(res => res.json())
      .then(data => {
        setStats(prev => ({ ...prev, serverStatus: 'online' }));
      })
      .catch(() => {
        setStats(prev => ({ ...prev, serverStatus: 'offline' }));
      });

    // 2. User Count (TODO: API anpassen wenn verfügbar)
    // Aktuell: Dummy Wert
    setStats(prev => ({ ...prev, userCount: 10 }));

    // 3. Memory Stats
    fetch('http://178.156.178.70:3000/api/memory/stats/test-user')
      .then(res => res.json())
      .then(data => {
        setStats(prev => ({ ...prev, chatCount: data.totalChats || 0 }));
      });
  }, []);

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Server Status Card */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-gray-500 text-sm">Server Status</h3>
        <p className={`text-2xl font-bold ${stats.serverStatus === 'online' ? 'text-green-600' : 'text-red-600'}`}>
          {stats.serverStatus}
        </p>
      </div>

      {/* User Count Card */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-gray-500 text-sm">Users</h3>
        <p className="text-2xl font-bold text-blue-600">{stats.userCount}</p>
      </div>

      {/* Agent Count Card */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-gray-500 text-sm">Active Agents</h3>
        <p className="text-2xl font-bold text-purple-600">{stats.agentCount}</p>
      </div>

      {/* Chat Count Card */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-gray-500 text-sm">Total Chats</h3>
        <p className="text-2xl font-bold text-indigo-600">{stats.chatCount}</p>
      </div>
    </div>
  );
}
