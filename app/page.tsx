'use client';

import React, { useState } from 'react';
import { Database, User, LogOut, Users, Trello } from 'lucide-react';
import DataForm from './components/DataForm';
import DynamicTable from './components/DynamicTable';
import UserForm from './components/UserForm';

export default function Dashboard() {
  const [activeForm, setActiveForm] = useState('users');
  const [isEventsOpen, setIsEventsOpen] = useState(false);

  const data = [
    { id: 2, name: "example", age: 20, genre: "hola", lastname: "prueba" },
    { id: 3, name: "example2", age: 21 },
    { id: 4, name: "example3", age: 22, ana: "developer" },
    { id: 4, name: "example3", age: 22, ana: "developer" },
  ];


  return (
    <div className="font-poppins flex flex-col min-h-screen">

      {/* Header */}
      <header className="bg-white text-black py-6 px-5 flex items-center justify-between">
        <h1 style={{ color: "#c7000b" }} className="text-xl font-bold">CRM Huawei Developer Competition</h1>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 flex-col md:flex-row max-w-full">

        {/* Sidebar */}
        <nav className="bg-gray text-white p-5 flex flex-col justify-between w-full md:w-1/4">
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
                  onClick={() => setActiveForm('users')}
                  className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-800 transition-colors">
                  <Users size={20} />
                  <span className="text-lg md:text-xl xl:text-xl">Users</span>
                </a>
              </li>
              <li>
                <a
                  className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-800 transition-colors">
                  <Trello size={20} />
                  <span className="text-lg md:text-xl xl:text-xl">Tasks</span>
                </a>
              </li>
              <li>
                <a
                  onClick={() => setActiveForm('data')}
                  className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-800 transition-colors">
                  <Database size={20} />
                  <span className="text-lg md:text-xl xl:text-xl">OCR Data</span>
                </a>
              </li>

            </ul>
          </div>
          <div className="flex items-center space-x-3 p-2">
            <div style={{ backgroundColor: "#c7000b" }} className="w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center">
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
          {activeForm === 'users' ? (
            <UserForm />
          ) : (
            <>
              <DataForm />
              <DynamicTable data={data} />
            </>
          )}

        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white text-black py-5 text-center">
        <p className="text-sm">2024 CRM </p>
      </footer>
    </div>
  );
}
