// SuccessView.js

import { FileKey } from 'lucide-react';
import React from 'react';

const SuccessView = ({ jobDetails }) => {
  const trainingKey = `TR_${jobDetails.id}_${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className="text-center">
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <FileKey className="w-8 h-8 text-green-500" />
      </div>
      <h3 className="text-xl font-medium text-gray-900 mb-2">Registration Successful!</h3>
      <p className="text-gray-500 mb-6">Your training key has been generated</p>
      
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <div className="font-mono text-lg text-gray-900 mb-2">{trainingKey}</div>
        <p className="text-sm text-gray-500">Keep this key safe - you'll need it for the training process</p>
      </div>

      <div className="text-sm text-gray-500">
        Refer to the <a href="#" className="text-blue-500 hover:underline">documentation</a> for 
        next steps and setup instructions
      </div>
    </div>
  );
};

export default SuccessView;