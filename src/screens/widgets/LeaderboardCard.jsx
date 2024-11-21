// LeaderboardCard.js

import { Globe, Medal, Trophy } from 'lucide-react';
import React from 'react';
import { Line, LineChart, ResponsiveContainer } from 'recharts';

const LeaderboardCard = ({ miner, index }) => (
  <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex items-center gap-3 mb-3">
      {index === 0 ? (
        <Trophy className="w-6 h-6 text-yellow-500" />
      ) : index === 1 ? (
        <Medal className="w-6 h-6 text-gray-500" />
      ) : (
        <Medal className="w-6 h-6 text-orange-500" />
      )}
      <div>
        <div className="font-medium text-gray-900">{miner.name}</div>
        <div className="text-sm text-gray-500 flex items-center gap-1">
          <Globe className="w-3 h-3" />
          {miner.location}
        </div>
      </div>
      <div className="ml-auto text-right">
        <div className="text-lg font-bold text-yellow-600">{miner.prize} τ</div>
        <div className="text-xs text-gray-500">Daily Prize</div>
      </div>
    </div>
    <div className="grid grid-cols-2 gap-4 mb-3">
      <div>
        <div className="text-sm text-gray-500">Loss</div>
        <div className="text-xl font-semibold text-gray-900">{miner.bestLoss.toFixed(3)}</div>
      </div>
      <div>
        <div className="text-sm text-gray-500">Accuracy</div>
        <div className="text-xl font-semibold text-gray-900">{miner.bestAcc.toFixed(1)}%</div>
      </div>
    </div>
    <div className="h-8">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={miner.metrics}>
          <Line type="monotone" dataKey="loss" stroke="#dc2626" strokeWidth={1} dot={false} />
          <Line type="monotone" dataKey="acc" stroke="#059669" strokeWidth={1} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  </div>
);

export default LeaderboardCard;
