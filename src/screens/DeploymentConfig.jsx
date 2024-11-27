import { Cpu, Wallet, Zap } from 'lucide-react';
import React, { useState } from 'react';

const DeploymentConfig = ({ selectedGPU, darkMode }) => {
  const [selectedPlan, setSelectedPlan] = useState('on-demand');
  
  const basePrice = parseFloat(selectedGPU?.costPerHour) || 0;
  const plans = [
    {
      id: 'on-demand',
      name: 'Standard',
      description: 'Dedicated compute',
      price: basePrice
    },
    {
      id: 'week',
      name: 'Weekly',
      description: '5% savings',
      price: basePrice * 0.95
    },
    {
      id: 'month',
      name: 'Monthly',
      description: '10% savings',
      price: basePrice * 0.90
    },
    {
      id: '3-month',
      name: 'Quarter',
      description: '15% savings',
      price: basePrice * 0.85
    },
    {
      id: 'spot',
      name: 'Flexible',
      description: 'Variable pricing',
      price: basePrice * 0.50
    }
  ];

  const formatPrice = (price) => Number(price).toFixed(2);

  return (
    <div className={`mt-6 ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-700'}`}>
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center space-x-3 mb-6">
          <div className="h-10 w-10 rounded-lg bg-violet-600 flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">{selectedGPU?.name}</h2>
            <p className="text-sm opacity-60">Polaris HPC Cluster Configuration</p>
          </div>
        </div>

        <div className="grid grid-cols-5 gap-3 mb-6">
          {plans.map((plan) => (
            <div
              key={plan.id}
              onClick={() => setSelectedPlan(plan.id)}
              className={`relative rounded-lg cursor-pointer transition-all p-4
                ${selectedPlan === plan.id 
                  ? `${darkMode ? 'bg-violet-500/10 ring-1 ring-violet-500' : 'bg-violet-50 ring-1 ring-violet-500'}`
                  : `${darkMode ? 'bg-gray-800 hover:bg-gray-800/80' : 'bg-white hover:bg-gray-50'}`}`}
            >
              <h3 className="font-medium text-sm mb-1">{plan.name}</h3>
              <p className="text-xs opacity-60 mb-3">{plan.description}</p>
              <div>
                <span className="text-lg font-semibold">${formatPrice(plan.price)}</span>
                <span className="text-xs opacity-60">/hr</span>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="flex items-center gap-2 mb-4">
              <Cpu className="w-4 h-4 text-violet-500" />
              <h3 className="font-medium">Hardware Specifications</h3>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="opacity-60">CPU</span>
                <span>{selectedGPU?.specifications?.cores} Cores</span>
              </div>
              <div className="flex justify-between">
                <span className="opacity-60">Memory</span>
                <span>{selectedGPU?.specifications?.memory}</span>
              </div>
              <div className="flex justify-between">
                <span className="opacity-60">Storage</span>
                <span>40 GB NVMe</span>
              </div>
            </div>
          </div>

          <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="flex items-center gap-2 mb-4">
              <Wallet className="w-4 h-4 text-violet-500" />
              <h3 className="font-medium">Cost Breakdown</h3>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="opacity-60">Compute</span>
                <span>${formatPrice(plans.find(p => p.id === selectedPlan)?.price)}/hr</span>
              </div>
              <div className="flex justify-between">
                <span className="opacity-60">Storage</span>
                <span>$0.006/hr</span>
              </div>
              <div className="pt-2 mt-2 border-t border-gray-200 dark:border-gray-700">
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>${formatPrice((plans.find(p => p.id === selectedPlan)?.price || 0) + 0.006)}/hr</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <button className="w-full py-3 rounded-lg font-medium text-white bg-violet-600 hover:bg-violet-700 transition-colors">
          Launch {selectedGPU?.name}
        </button>
      </div>
    </div>
  );
};

export default DeploymentConfig;