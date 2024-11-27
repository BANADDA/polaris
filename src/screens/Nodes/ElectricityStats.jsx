import { Check, Cloud, HardDrive, Server, Zap } from "lucide-react";
import React from 'react';

const ComputeOptions = ({ darkMode }) => {
    const providers = [
        { 
            name: 'GPU Rental Service', 
            subnet: 'A100/H100 Network',
            availability: '99.9%',
            icon: HardDrive,
            specs: 'Up to 80GB VRAM',
            description: 'High-performance GPU clusters for ML workloads'
        },
        { 
            name: 'Distributed Training', 
            subnet: 'Communex & Bittensor',
            availability: '99.8%',
            icon: Server,
            specs: 'Scalable Multi-node',
            description: 'Decentralized training infrastructure'
        },
        { 
            name: 'Model Inferencing', 
            subnet: 'Inference Network',
            availability: '99.95%',
            icon: Cloud,
            specs: 'Low-latency Serving',
            description: 'Production-grade model deployment'
        },
        { 
            name: 'Network Orchestration', 
            subnet: 'Management Layer',
            availability: '99.99%',
            icon: Zap,
            specs: 'Automated Scaling',
            description: 'Smart resource allocation & monitoring'
        }
    ];

    const bgColor = darkMode ? 'bg-gray-900' : 'bg-white';
    const textColor = darkMode ? 'text-gray-100' : 'text-gray-800';
    const subTextColor = darkMode ? 'text-gray-300' : 'text-gray-600';
    const cardBg = darkMode ? 'bg-gray-800' : 'bg-gray-50';
    const borderColor = darkMode ? 'border-gray-700' : 'border-gray-200';
    const hoverEffect = 'transition-all duration-300 hover:scale-105 hover:shadow-xl';

    return (
        <div className={`p-4 ${bgColor} rounded-xl`}>
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                    Enterprise Compute Solutions
                </h2>
                <div className={`${cardBg} px-2 py-1 rounded-full ${textColor} text-sm`}>
                    <span className="text-blue-500 font-bold">POLARIS</span> Network
                </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                {providers.map((provider) => (
                    <div 
                        key={provider.name} 
                        className={`${cardBg} p-3 rounded-xl border ${borderColor} ${hoverEffect}`}
                    >
                        <div className="flex items-center mb-2">
                            <div className="w-8 h-8 flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl">
                                <provider.icon size={16} className="text-white" />
                            </div>
                            <div className="ml-2">
                                <h3 className={`text-sm font-bold ${textColor}`}>{provider.name}</h3>
                                <p className={`text-xs ${subTextColor}`}>{provider.subnet}</p>
                            </div>
                        </div>
                        <p className={`text-xs ${subTextColor} mb-2`}>{provider.description}</p>
                        <div className="flex items-center justify-between pt-2 border-t border-dashed border-gray-600">
                            <span className={`text-xs font-medium ${textColor}`}>
                                Uptime: {provider.availability}
                            </span>
                            <span className={`text-xs font-medium ${textColor}`}>
                                {provider.specs}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            <div className={`${cardBg} p-3 rounded-xl border ${borderColor} ${hoverEffect}`}>
                <div className="flex items-center justify-between mb-3">
                    <div>
                        <div className={`text-xl font-bold ${textColor} tracking-tight`}>
                            4.2M<span className="text-blue-500">+</span>
                        </div>
                        <p className={`text-xs ${subTextColor} mt-1`}>
                            GPU cores powering global ML infrastructure
                        </p>
                    </div>
                    <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-2 rounded-xl">
                        <Cloud size={20} className="text-white" />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                    {['24/7 Availability', 'Global Infrastructure', 'Auto-scaling', 'Load Balancing'].map((feature) => (
                        <div key={feature} className="flex items-center space-x-1">
                            <div className="w-4 h-4 flex items-center justify-center bg-blue-500/20 rounded-full">
                                <Check size={10} className="text-blue-500" />
                            </div>
                            <span className={`text-xs font-medium ${textColor}`}>{feature}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ComputeOptions;