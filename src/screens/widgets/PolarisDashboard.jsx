// PolarisDashboard.js

import { ExternalLink, Search } from 'lucide-react';
import React, { useState } from 'react';
import DetailModal from './DetailModal';
import LeaderboardCard from './LeaderboardCard';
import miners from './minersData';
import TableRow from './TableRow';

const PolarisDashboard = (darkMode={darkMode}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMiner, setSelectedMiner] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: 'rank', direction: 'asc' });

  const handleSort = (key) => {
    setSortConfig({
      key,
      direction: sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc',
    });
  };

  const sortedMiners = [...miners].sort((a, b) => {
    if (sortConfig.key === 'rank') {
      return sortConfig.direction === 'asc' ? a.rank - b.rank : b.rank - a.rank;
    }
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];
    if (sortConfig.direction === 'asc') {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
    }
    return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
  });

  const filteredMiners = sortedMiners.filter(
    (miner) =>
      miner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      miner.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`min-h-screen${darkMode ? 'bg-gray-50' : 'bg-gray-900'}`}>
      <div className="max-w-full mx-auto px-8 py-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className={`text-2xl font-semibold text-gray-600`}>Polaris Subnet Miners</h1>
              <p className="text-gray-500 mt-1">Top performers receive TAO rewards daily</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Find a miner..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-72 bg-white rounded-lg border border-gray-200 py-2 pl-9 pr-4 
                    placeholder-gray-400 focus:outline-none focus:border-gray-300"
                />
              </div>
              <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 
                transition-colors text-sm font-medium">
                Deploy New Miner
              </button>
            </div>
          </div>

          {/* Current Job Card - Horizontal Layout */}
          <div className="bg-white rounded-lg border border-gray-100 p-4">
            <div className="flex items-center gap-8">
              {/* Job Info */}
              <div className="flex items-center gap-6 min-w-[280px]">
                <div>
                  <h2 className="font-medium text-gray-900">Current Job</h2>
                  <p className="text-gray-500 mt-1">Fine-tuning A9Labs Base Model v1.0</p>
                </div>
                <button className="inline-flex items-center px-3 py-1.5 bg-blue-500 text-white text-sm 
                  font-medium rounded-lg hover:bg-blue-600 transition-colors gap-1.5 whitespace-nowrap">
                  View Details
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Vertical Divider */}
              <div className="h-12 w-px bg-gray-200"></div>

              {/* Total Prize */}
              <div className="min-w-[180px]">
                <div className="text-gray-500">Total Prize Pool</div>
                <div className="font-semibold text-lg">2000 τ</div>
              </div>

              {/* Vertical Divider */}
              <div className="h-12 w-px bg-gray-200"></div>

              {/* Rewards Distribution */}
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-3">
                  <span className="text-xl">🥇</span>
                  <div>
                    <div className="text-gray-500 text-sm">1st Place</div>
                    <div className="font-medium">1000 τ</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xl">🥈</span>
                  <div>
                    <div className="text-gray-500 text-sm">2nd Place</div>
                    <div className="font-medium">500 τ</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xl">🥉</span>
                  <div>
                    <div className="text-gray-500 text-sm">3rd Place</div>
                    <div className="font-medium">250 τ</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Leaderboard Cards */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {miners.slice(0, 3).map((miner, index) => (
            <LeaderboardCard key={miner.name} miner={miner} index={index} />
          ))}
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-4 py-3 text-left font-semibold text-gray-900">Rank</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-900">Miner</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-900">Location</th>
                <th className="px-4 py-3 text-right font-semibold text-gray-900">Current Loss</th>
                <th className="px-4 py-3 text-right font-semibold text-gray-900">Best Loss</th>
                <th className="px-4 py-3 text-center font-semibold text-gray-900">Metrics Trend</th>
                <th className="px-4 py-3 text-right font-semibold text-gray-900">Current Acc.</th>
                <th className="px-4 py-3 text-right font-semibold text-gray-900">Best Acc.</th>
                <th className="px-4 py-3 text-center font-semibold text-gray-900">Status</th>
                <th className="px-4 py-3 text-right font-semibold text-gray-900">Uptime</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredMiners.map((miner) => (
                <TableRow key={miner.name} miner={miner} onGraphClick={setSelectedMiner} />
              ))}
            </tbody>
          </table>
        </div>

        {/* Detail Modal */}
        {selectedMiner && (
          <DetailModal miner={selectedMiner} onClose={() => setSelectedMiner(null)} />
        )}
      </div>
    </div>
  );
};

export default PolarisDashboard;
