// TableRow.js

import { Globe } from 'lucide-react';
import React from 'react';
import { Line, LineChart, ResponsiveContainer } from 'recharts';

const TableRow = ({ miner, onGraphClick }) => (
  <tr className="hover:bg-gray-50">
    <td className="px-4 py-3">
      <span
        className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-sm
            ${
              miner.rank === 1
                ? 'bg-yellow-100 text-yellow-700'
                : miner.rank === 2
                ? 'bg-gray-100 text-gray-700'
                : miner.rank === 3
                ? 'bg-orange-100 text-orange-700'
                : 'bg-gray-100 text-gray-600'
            }`}
      >
        {miner.rank}
      </span>
    </td>
    <td className="px-4 py-3 font-medium text-gray-900">{miner.name}</td>
    <td className="px-4 py-3 text-gray-500">
      <div className="flex items-center gap-1">
        <Globe className="w-4 h-4" />
        {miner.location}
      </div>
    </td>
    <td className="px-4 py-3 text-right text-gray-900">{miner.currentLoss.toFixed(3)}</td>
    <td className="px-4 py-3 text-right text-gray-900">{miner.bestLoss.toFixed(3)}</td>
    <td className="px-4 py-3">
      <div
        className="h-8 w-32 cursor-pointer hover:bg-gray-50 rounded transition-colors"
        onClick={() => onGraphClick(miner)}
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={miner.metrics}>
            <Line type="monotone" dataKey="loss" stroke="#dc2626" strokeWidth={1} dot={false} />
            <Line type="monotone" dataKey="acc" stroke="#059669" strokeWidth={1} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </td>
    <td className="px-4 py-3 text-right text-gray-900">{miner.currentAcc.toFixed(1)}%</td>
    <td className="px-4 py-3 text-right text-gray-900">{miner.bestAcc.toFixed(1)}%</td>
    <td className="px-4 py-3">
      <span
        className={`inline-flex px-2 py-1 rounded-full text-xs font-medium
            ${
              miner.status === 'active'
                ? 'bg-green-100 text-green-700'
                : 'bg-gray-100 text-gray-700'
            }`}
      >
        {miner.status}
      </span>
    </td>
    <td className="px-4 py-3 text-right text-gray-900">{miner.uptime}</td>
  </tr>
);

export default TableRow;
