import { ExternalLink, Search } from 'lucide-react';
import React, { useState } from 'react';
import DetailModal from './DetailModal';
import { jobDetails } from './jobData';
import JobDetailsModal from './JobDetailsModal';
import LeaderboardCard from './LeaderboardCard';
import miners from './minersData';
import TableRow from './TableRow';

const PolarisDashboard = ({ darkMode = false }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMiner, setSelectedMiner] = useState(null);
  const [showJobDetails, setShowJobDetails] = useState(false);
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

  // Calculate remaining time for the current job
  const getTimeRemaining = () => {
    const endDate = new Date(jobDetails.endDate);
    const now = new Date();
    const timeLeft = endDate - now;
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    return `${days}d ${hours}h remaining`;
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-full mx-auto px-8 py-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className={`text-2xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Polaris Subnet Miners
              </h1>
              <p className={`mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Top performers receive TAO rewards daily
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Find a miner..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`w-72 rounded-lg border py-2 pl-9 pr-4 
                    focus:outline-none focus:ring-2 focus:ring-blue-500 
                    ${darkMode 
                      ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400' 
                      : 'bg-white border-gray-200 text-gray-900 placeholder-gray-500'
                    }`}
                />
              </div>
              <button 
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 
                  transition-colors text-sm font-medium focus:outline-none focus:ring-2 
                  focus:ring-green-500 focus:ring-offset-2"
              >
                Deploy New Miner
              </button>
            </div>
          </div>

          {/* Current Job Card - Horizontal Layout */}
          <div className={`rounded-lg border p-4 ${
            darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'
          }`}>
            <div className="flex items-center gap-8">
              {/* Job Info */}
              <div className="flex items-center gap-6 min-w-[280px]">
                <div>
                  <h2 className={`font-medium ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}>Current Job</h2>
                  <p className={`mt-1 ${
                    darkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>{jobDetails.baseModel}</p>
                  <p className={`text-sm ${
                    darkMode ? 'text-gray-500' : 'text-gray-400'
                  }`}>{getTimeRemaining()}</p>
                </div>
                <button 
                  onClick={() => setShowJobDetails(true)}
                  className="inline-flex items-center px-3 py-1.5 bg-blue-500 text-white text-sm 
                    font-medium rounded-lg hover:bg-blue-600 transition-colors gap-1.5 whitespace-nowrap
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  View Details
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Vertical Divider */}
              <div className={`h-12 w-px ${
                darkMode ? 'bg-gray-700' : 'bg-gray-200'
              }`}></div>

              {/* Total Prize */}
              <div className="min-w-[180px]">
                <div className={darkMode ? 'text-gray-400' : 'text-gray-500'}>
                  Total Prize Pool
                </div>
                <div className={`font-semibold text-lg ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>{jobDetails.totalPrize}</div>
              </div>

              {/* Vertical Divider */}
              <div className={`h-12 w-px ${
                darkMode ? 'bg-gray-700' : 'bg-gray-200'
              }`}></div>

              {/* Rewards Distribution */}
              <div className="flex items-center gap-6">
                {jobDetails.prizes.map((prize, index) => (
                  <div key={prize.place} className="flex items-center gap-3">
                    <span className="text-xl">{['🥇', '🥈', '🥉'][index]}</span>
                    <div>
                      <div className={darkMode ? 'text-gray-400' : 'text-gray-500'}>
                        {prize.place} Place
                      </div>
                      <div className={`font-medium ${
                        darkMode ? 'text-white' : 'text-gray-900'
                      }`}>{prize.amount}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Leaderboard Cards */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {miners.slice(0, 3).map((miner, index) => (
            <LeaderboardCard 
              key={miner.name} 
              miner={miner} 
              index={index} 
              darkMode={darkMode}
            />
          ))}
        </div>

        {/* Table */}
        <div className={`rounded-lg shadow-sm border overflow-hidden ${
          darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <table className="w-full">
            <thead>
              <tr className={darkMode ? 'border-gray-700' : 'border-gray-200'}>
                {[
                  'Rank', 'Miner', 'Location', 'Current Loss', 'Best Loss',
                  'Metrics Trend', 'Current Acc.', 'Best Acc.', 'Status', 'Uptime'
                ].map((header) => (
                  <th 
                    key={header}
                    className={`px-4 py-3 text-left font-semibold ${
                      header.includes('Current') || header.includes('Best') ? 'text-right' : ''
                    } ${header === 'Metrics Trend' ? 'text-center' : ''} ${
                      darkMode ? 'text-gray-200' : 'text-gray-900'
                    }`}
                    onClick={() => handleSort(header.toLowerCase())}
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className={`divide-y ${
              darkMode ? 'divide-gray-700' : 'divide-gray-200'
            }`}>
              {filteredMiners.map((miner) => (
                <TableRow 
                  key={miner.name} 
                  miner={miner} 
                  onGraphClick={setSelectedMiner}
                  darkMode={darkMode}
                />
              ))}
            </tbody>
          </table>
        </div>

        {/* Miner Detail Modal */}
        {selectedMiner && (
          <DetailModal 
            miner={selectedMiner} 
            onClose={() => setSelectedMiner(null)}
            darkMode={darkMode}
          />
        )}

        {/* Job Details Modal */}
        {showJobDetails && (
          <JobDetailsModal 
            onClose={() => setShowJobDetails(false)}
            darkMode={darkMode}
          />
        )}
      </div>
    </div>
  );
};

export default PolarisDashboard;