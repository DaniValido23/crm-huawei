'use client';

import React, { useState } from 'react';
import { Settings, User, LogOut, ChevronDown, ChevronUp, Users, Trello } from 'lucide-react';
import DataForm from './components/DataForm';

export default function Dashboard() {
  const [activeForm, setActiveForm] = useState('promotions');
  const [isEventsOpen, setIsEventsOpen] = useState(false);


  return (
    <div className="font-poppins flex flex-col min-h-screen">
      
      {/* Header */}
      <header className="bg-white text-black py-8 px-5 flex items-center justify-between">
        <h1 className="text-xl font-bold">CRM Huawei Developer Competition</h1>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 flex-col md:flex-row max-w-full">
        
        {/* Sidebar */}
        <nav className="bg-black text-white p-5 flex flex-col justify-between w-full md:w-1/4">
          <div>
            <div className="flex justify-between items-center mb-6 md:mb-10">
              <h2 className="text-xl md:text-2xl font-bold">Dashboard</h2>
              <button
              className="flex items-center space-x-2 p-2 rounded hover:bg-gray-700">
              <LogOut size={20} />
            </button>
            </div>
            <ul className="space-y-4">
              <li>
                <a
                  onClick={() => setActiveForm('')}
                  className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-800 transition-colors">
                  <Users size={20} />
                  <span className="text-lg md:text-xl xl:text-xl">Users</span>
                </a>
                
              </li>
              <li>
                <a
                  onClick={() => setActiveForm('')}
                  className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-800 transition-colors">
                  <Trello size={20} />
                  <span className="text-lg md:text-xl xl:text-xl">Tasks</span>
                </a>
                
              </li>
              <li>
                <div>
                  <button
                    onClick={() => setIsEventsOpen(!isEventsOpen)}
                    className = "flex items-center justify-between w-full p-2 rounded-lg hover:bg-gray-800 transition-colors">
                    <div className="flex items-center space-x-3">
                      <Settings size={20} />
                      <span className="text-lg md:text-xl xl:text-xl">Data</span>
                    </div>
                    {isEventsOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>
                  {isEventsOpen && (
                    <ul className="ml-6 mt-2 space-y-2">
                      <li>
                        <a
                          onClick={() => setActiveForm('')}
                          className="block p-2 rounded-lg hover:bg-gray-800 transition-colors">
                          Upload Data
                        </a>
                      </li>
                      <li>
                        <a
                          onClick={() => setActiveForm('')}
                          className="block p-2 rounded-lg hover:bg-gray-800 transition-colors">
                          View Data
                        </a>
                      </li>
                    </ul>
                  )}
                </div>
              </li>
            </ul>
          </div>
          
          <div className="flex items-center space-x-3 p-2">
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gray-800 flex items-center justify-center">
              <User size={20} />
            </div>
            <div>
              <p className="text-sm md:text-base font-semibold"> User</p>
              <p className="text-xs md:text-sm xl:text-xl text-gray-400">email@example.com</p>
            </div>
          </div>
        </nav>

        {/* Form Content */}
        <div className="flex-1 bg-gray-200 flex flex-col justify-center items-center p-4 text-black max-w-full">
          <DataForm/>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white text-black py-8 text-center">
        <p className="text-sm">2024 CRM</p>
      </footer>
    </div>
  );
}
