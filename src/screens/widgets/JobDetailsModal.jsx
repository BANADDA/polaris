import { Info, X } from 'lucide-react';
import React, { useState } from 'react';
import ComputeRequirements from './ComputeRequirements';
import RegistrationForm from './RegistrationForm';
import SuccessView from './SuccessView';

const JobDetailsModal = ({ onClose, darkMode = false, job }) => {
  const [registrationStep, setRegistrationStep] = useState(0);
  const [formData, setFormData] = useState({
    walletKey: '',
    huggingfaceRepo: '',
    username: '',
    location: '',
  });

  const handleSubmit = (data) => {
    setFormData(data);
    setRegistrationStep(2);
  };

  // Transform rewards into the format expected by the UI
  const prizes = [
    { place: '1st', amount: job.rewards.first },
    { place: '2nd', amount: job.rewards.second },
    { place: '3rd', amount: job.rewards.third }
  ];

  const requirements = [
    "Valid Hugging Face account and repository",
    "Compute resources meeting minimum requirements",
    "Wallet for receiving rewards",
    "Stable internet connection"
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="relative bg-white rounded-xl shadow-xl max-w-4xl w-full mx-4" 
           style={{ maxHeight: 'calc(100vh - 64px)' }}>
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between rounded-t-xl z-10">
          <h2 className="text-xl font-semibold text-gray-900">Job Details</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="overflow-y-auto" style={{ maxHeight: 'calc(100vh - 160px)' }}>
          <div className="p-6">
            {registrationStep === 0 && (
              <>
                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div>
                    <h3 className="font-medium text-gray-900 mb-4">Basic Information</h3>
                    <div className="space-y-3">
                      <div>
                        <div className="text-sm text-gray-500">Job ID</div>
                        <div className="font-medium">{job.id}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Base Model</div>
                        <div className="font-medium">{job.modelId}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Dataset</div>
                        <div className="font-medium">{job.datasetId}</div>
                        <div className="text-sm text-gray-400">{job.datasetSize}GB</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Duration</div>
                        <div className="font-medium">{job.duration} days</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Period</div>
                        <div className="font-medium">
                          {job.startDate} - {job.endDate}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium text-gray-900 mb-4">Rewards</h3>
                    <div className="space-y-3">
                      <div>
                        <div className="text-sm text-gray-500">Total Prize Pool</div>
                        <div className="font-medium text-lg">
                          {parseInt(job.rewards.first) + parseInt(job.rewards.second) + parseInt(job.rewards.third)} τ
                        </div>
                      </div>
                      {prizes.map((prize, index) => (
                        <div key={prize.place} className="flex items-center gap-2">
                          <span className="text-xl">{['🥇', '🥈', '🥉'][index]}</span>
                          <div>
                            <div className="text-sm text-gray-500">{prize.place} Place</div>
                            <div className="font-medium">{prize.amount} τ</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="font-medium text-gray-900 mb-4">Compute Requirements</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <ComputeRequirements 
                      title="Minimum Requirements"
                      requirements={job.requirements.min}
                      isMinimum={true}
                    />
                    <ComputeRequirements 
                      title="Recommended Specifications"
                      requirements={job.requirements.recommended}
                      isMinimum={false}
                    />
                  </div>
                  <div className="mt-3 text-sm text-gray-500">
                    Note: Training performance and completion time may vary based on your hardware specifications
                  </div>
                </div>

                <div className="bg-blue-50 rounded-lg p-4 mb-6">
                  <div className="flex gap-3">
                    <Info className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-blue-900 mb-2">Additional Requirements</h4>
                      <ul className="text-blue-800 text-sm space-y-1">
                        {requirements.map((req, index) => (
                          <li key={index}>• {req}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setRegistrationStep(1)}
                  className="w-full py-2.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 
                    transition-colors font-medium"
                >
                  Register for this Job
                </button>
              </>
            )}
            
            {registrationStep === 1 && (
              <RegistrationForm 
                onSubmit={handleSubmit}
                job={job}
              />
            )}

            {registrationStep === 2 && (
              <SuccessView 
                job={job}
                formData={formData}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailsModal;