// ComputeRequirements.js

import { MemoryOutlined } from '@material-ui/icons';
import { Cpu, HardDrive, Wifi } from 'lucide-react';
import React from 'react';

const ComputeRequirements = ({ title, requirements, isMinimum }) => (
  <div className={`p-4 rounded-lg ${isMinimum ? 'bg-orange-50' : 'bg-green-50'}`}>
    <h4 className={`font-medium mb-3 ${isMinimum ? 'text-orange-800' : 'text-green-800'}`}>
      {title}
    </h4>
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Cpu className={`w-4 h-4 ${isMinimum ? 'text-orange-500' : 'text-green-500'}`} />
        <span className="text-sm">{requirements.gpu}</span>
      </div>
      <div className="flex items-center gap-2">
        <MemoryOutlined className={`w-4 h-4 ${isMinimum ? 'text-orange-500' : 'text-green-500'}`} />
        <span className="text-sm">{requirements.vram} + {requirements.ram}</span>
      </div>
      <div className="flex items-center gap-2">
        <HardDrive className={`w-4 h-4 ${isMinimum ? 'text-orange-500' : 'text-green-500'}`} />
        <span className="text-sm">{requirements.storage}</span>
      </div>
      <div className="flex items-center gap-2">
        <Wifi className={`w-4 h-4 ${isMinimum ? 'text-orange-500' : 'text-green-500'}`} />
        <span className="text-sm">{requirements.bandwidth}</span>
      </div>
    </div>
  </div>
);

export default ComputeRequirements;