// RegistrationForm.js

import { AlertCircle } from 'lucide-react';
import React, { useState } from 'react';

const RegistrationForm = ({ onSubmit, jobDetails }) => {
  const [formData, setFormData] = useState({
    walletKey: '',
    huggingfaceRepo: '',
    username: '',
    location: '',
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Wallet Address</label>
        <input
          type="text"
          name="walletKey"
          value={formData.walletKey}
          onChange={handleInputChange}
          required
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
          placeholder="Enter your wallet address for receiving rewards"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Hugging Face Repository
          <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
            Required
          </span>
        </label>
        <input
          type="text"
          name="huggingfaceRepo"
          value={formData.huggingfaceRepo}
          onChange={handleInputChange}
          required
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
          placeholder="username/repository-name"
        />
        <p className="mt-1 text-sm text-gray-500">
          Don't have a repo yet? <a href="https://huggingface.co/new" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Create one here</a>
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
          required
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
          placeholder="Enter your preferred username"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleInputChange}
          required
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
          placeholder="City, State"
        />
      </div>

      <div className="bg-yellow-50 rounded-lg p-4">
        <div className="flex gap-3">
          <AlertCircle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-yellow-800">
            <strong>Important:</strong> The training key you'll receive is only valid for this job's duration 
            ({jobDetails.startDate} - {jobDetails.endDate}). Make sure you have set up your Hugging Face 
            repository before proceeding.
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="w-full py-2.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 
          transition-colors font-medium"
      >
        Submit Registration
      </button>
    </form>
  );
};

export default RegistrationForm;