import { collection, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { FaMapMarkerAlt, FaMemory, FaMicrochip } from 'react-icons/fa';
import { SiAmd, SiNvidia } from 'react-icons/si';
import ChipSelection from './ConnectivitySelection';
import DeploymentConfig from './DeploymentConfig';
import db from './firebase/config';

const SelectionPanel = ({ selectedGPU, darkMode, onContinue }) => {
    const isFullyAvailable = selectedGPU && selectedGPU.status === 'available';
    const hasAvailableContainer = selectedGPU && selectedGPU.containers && selectedGPU.containers.some(container => container.status === 'available');
    const hasInUseContainer = selectedGPU && selectedGPU.containers && selectedGPU.containers.some(container => container.status === 'in-use');
    const availabilityStatus = isFullyAvailable ? 'available' : hasAvailableContainer && hasInUseContainer ? '50% available' : 'in-use';
    const canContinue = availabilityStatus !== 'in-use';
    const specificationsText = selectedGPU && selectedGPU.specifications
        ? `${selectedGPU.specifications.cpuInfo}, ${selectedGPU.specifications.cores} Cores, ${selectedGPU.specifications.cpuMaxMHz} MHz, ${selectedGPU.specifications.memory}, ${selectedGPU.specifications.storage}`
        : "No specifications available";

    return (
        <div className={`rounded-lg p-4 h-fit sticky top-4 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'} shadow-lg`}>
            <h2 className="text-lg font-bold mb-3">Selected Hardware</h2>
            {!selectedGPU ? (
                <div className="text-center py-6">
                    <FaMicrochip className={`text-3xl mx-auto mb-2 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`} />
                    <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'} text-sm`}>No hardware selected</p>
                </div>
            ) : (
                <div className="space-y-3">
                    <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                        <div className="flex items-start space-x-3">
                            {selectedGPU.brand === 'Nvidia' ? <SiNvidia className="text-xl mt-1" /> : <SiAmd className="text-xl mt-1" />}
                            <div>
                                <h3 className="font-medium text-sm">{selectedGPU.name}</h3>
                                <p className="text-xs text-gray-500 dark:text-gray-400">{selectedGPU.model || 'No model specified'}</p>
                                <p className="text-xs mt-1">Status: {availabilityStatus}</p>
                                <p className="text-xs mt-1">Cost per hour: ${selectedGPU.costPerHour}</p>
                            </div>
                        </div>
                        <div className="mt-2 pt-2 border-t border-gray-200 dark:border-gray-600">
                            <p className="text-xs">{specificationsText}</p>
                        </div>
                    </div>
                </div>
            )}
            <button
                onClick={onContinue}
                className={`w-full mt-4 py-2 px-3 rounded-lg text-sm font-medium transition-colors
                    ${canContinue ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-gray-700 cursor-not-allowed'}`}
                disabled={!canContinue}
            >
                Continue
            </button>
        </div>
    );
};

const HardwareCard = ({ hardware, isSelected, onSelect, darkMode }) => {
    const isGPU = hardware.type === 'GPU';
    const specificationsText = hardware.specifications
        ? `${hardware.specifications.cpuInfo}, ${hardware.specifications.cores} Cores, ${hardware.specifications.cpuMaxMHz} MHz, ${hardware.specifications.memory}, ${hardware.specifications.storage}`
        : "No specifications available";
    const hasAvailableContainer = hardware.containers && hardware.containers.some(container => container.status === 'available');
    const hasInUseContainer = hardware.containers && hardware.containers.some(container => container.status === 'in-use');
    const displayStatus = hardware.status === 'available'
        ? 'available'
        : hasAvailableContainer && hasInUseContainer
            ? '50% available'
            : 'in-use';

    return (
        <div
            className={`relative overflow-hidden rounded-lg transition-all duration-300 hover:scale-[1.02] cursor-pointer
                ${isSelected ? 'ring-2 ring-blue-500 shadow-lg' : 'shadow-md'}
                ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}
            onClick={() => onSelect(hardware.id)}
        >
            <div className={`p-3 ${isGPU ? 'bg-gradient-to-r from-violet-600 to-indigo-600' : 'bg-gradient-to-r from-blue-600 to-cyan-600'}`}>
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        {hardware.brand === 'Nvidia' ? <SiNvidia className="text-white text-lg" /> : <SiAmd className="text-white text-lg" />}
                        <h3 className="font-bold text-white text-sm truncate">{hardware.name}</h3>
                    </div>
                    <span className="px-2 py-1 bg-white/20 rounded-full text-white text-xs">{hardware.type}</span>
                </div>
            </div>

            <div className="p-3 space-y-2">
                <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center space-x-2">
                        <div className={`p-1.5 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                            <FaMemory className={`text-sm ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                        </div>
                        <div>
                            <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Memory</p>
                            <p className="font-medium text-xs">{hardware.memory}</p>
                        </div>
                    </div>

                    <div className="flex items-center space-x-2">
                        <div className={`p-1.5 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                            <FaMapMarkerAlt className={`text-sm ${darkMode ? 'text-purple-400' : 'text-purple-600'}`} />
                        </div>
                        <div>
                            <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Location</p>
                            <p className="font-medium text-xs">{hardware.location}</p>
                        </div>
                    </div>
                </div>

                <div className={`p-2 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                    <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Specifications</p>
                    <p className="text-xs mt-1 leading-relaxed">{specificationsText}</p>
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <span className={`text-xs px-2 mr-2 py-0.5 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                            {hardware.model}
                        </span>
                        <span className={`text-xs px-2 py-0.5 rounded-full 
                            ${displayStatus === 'available' ? 'bg-green-100 text-green-700' : ''}
                            ${displayStatus === 'in-use' ? 'bg-red-100 text-red-700' : ''}
                            ${displayStatus === '50% available' ? 'bg-yellow-100 text-yellow-700' : ''}`}>
                            ${hardware.costPerHour}/hr
                        </span>
                    </div>
                    <input type="radio" checked={isSelected} onChange={() => onSelect(hardware.id)} className="w-3 h-3 text-blue-600" />
                </div>
            </div>
        </div>
    );
};

const GPUSelectionApp = ({ darkMode }) => {
    const [hardwareData, setHardwareData] = useState([]);
    const [selectedGPUId, setSelectedGPUId] = useState(null);
    const [filter, setFilter] = useState('All');
    const [isConnectivityScreen, setIsConnectivityScreen] = useState(false);

    useEffect(() => {
        const unsubscribeGpu = onSnapshot(collection(db, 'hardware', 'gpu', 'items'), 
            (snapshot) => {
                const gpuData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data(), type: 'GPU' }));
                setHardwareData((prevData) => [...prevData.filter(item => item.type !== 'GPU'), ...gpuData]);
            }
        );

        const unsubscribeCpu = onSnapshot(collection(db, 'hardware', 'cpu', 'items'), 
            (snapshot) => {
                const cpuData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data(), type: 'CPU' }));
                setHardwareData((prevData) => [...prevData.filter(item => item.type !== 'CPU'), ...cpuData]);
            }
        );

        return () => {
            unsubscribeGpu();
            unsubscribeCpu();
        };
    }, []);

    const filteredHardwareData = hardwareData.filter(hardware => 
        filter === 'All' ? true : filter === hardware.type || filter === hardware.brand
    );

    const selectedGPU = hardwareData.find((hardware) => hardware.id === selectedGPUId);

    if (isConnectivityScreen) {
        return <ChipSelection darkMode={darkMode} selectedGPU={selectedGPU} />;
    }

    return (
        <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
            <div className="max-w-7xl mx-auto px-4 py-6">
                <div className="text-center mb-6">
                    <h1 className="text-2xl font-bold mb-2">Select Hardware</h1>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Choose the processing unit that best suits your needs
                    </p>
                </div>

                <div className="flex flex-wrap gap-2 justify-center mb-6">
                    {['All', 'Nvidia', 'Intel', 'CPU', 'GPU'].map((item) => (
                        <button
                            key={item}
                            onClick={() => setFilter(item)}
                            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                                filter === item
                                    ? 'bg-blue-600 text-white'
                                    : `${darkMode ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-700'} hover:bg-gray-100 dark:hover:bg-gray-700`
                            }`}
                        >
                            <div className="flex items-center space-x-2">
                                {item === 'Nvidia' && <SiNvidia />}
                                {item === 'Intel' && <SiAmd />}
                                <span>{item}</span>
                            </div>
                        </button>
                    ))}
                </div>

                <div className="flex flex-col lg:flex-row gap-4">
                    <div className="flex-1">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {filteredHardwareData.map((hardware) => (
                                <HardwareCard
                                    key={hardware.id}
                                    hardware={hardware}
                                    isSelected={hardware.id === selectedGPUId}
                                    onSelect={setSelectedGPUId}
                                    darkMode={darkMode}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            {selectedGPUId && (
    <DeploymentConfig 
      selectedGPU={selectedGPU}
      darkMode={darkMode}
    />
  )}
            </div>
        </div>
    );
};

export default GPUSelectionApp;