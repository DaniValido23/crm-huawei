'use client';
import React, { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

export default function DataForm() {
  const [eventImage, setEventImage] = useState<File | null>(null);
  const [fileType, setFileType] = useState('');
  const [table, setTable] = useState(''); // Añadir estado para el select

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setEventImage(file);
      console.log(file.type);

      const type = file.type.includes('image') ? 'img' : file.name.toLowerCase().endsWith('.xlsx') ? 'excel' : '';
      setFileType(type);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
        'image/*': [],
        '.xlsx': []
      },
    multiple: false
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();

    if (eventImage) {
      formData.append("data", eventImage);
    } else {
      console.error("No file selected");
      return;
    }

    formData.append("type", fileType);
    formData.append("table", table); // Añadir el valor del select al FormData

    console.log('data:', eventImage);
    console.log('type:', fileType);
    console.log('select:', table);
    console.log(formData);

    try {
      const response = await fetch('https://', { //// URL ENDPOINT <-------------------------
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Data sent successfully:', result);

      setEventImage(null);
      setFileType('');
      setTable('');
    } catch (error) {
      console.error('Error sending file:', error);
    }
  };

  return (
    <div className="flex items-center justify-center text-2xl bg-white p-10 text-black rounded-lg shadow-lg w-full md:w-4/5 xl:w-3/5">
      <div className="w-full space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-lg md:text-xl xl:text-xl font-medium leading-none">
              Upload Data
            </label>
            <div className='pb-2'></div>
            <div
              {...getRootProps()}
              className={`flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-6 transition-colors ${
                isDragActive ? 'border-primary' : 'border-gray-300 dark:border-gray-700'
              }`}
            >
              <input {...getInputProps()} />
              <svg
                className="w-10 h-10 mb-3 text-gray-400"
                fill="none"
                height="24"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" x2="12" y1="3" y2="15" />
              </svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG, XLSX</p>
            </div>
            {eventImage && (
              <p className="text-sm text-gray-500 dark:text-gray-400 pt-2 pb-2">{eventImage.name}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="select" className="text-lg md:text-xl xl:text-xl font-medium leading-none">Table</label>
            <select
              id="select"
              name="select"
              value={table} // Agregar el valor del estado
              onChange={(e) => setTable(e.target.value)} // Actualizar el estado al cambiar la selección
              required
              className="flex h-10 w-full rounded-md border border-input px-3 py-2 text-sm focus-visible:outline-none"
            >
              <option value="">--Select an option--</option>
              <option value="clients">Clients</option>
              <option value="inventory">Inventory</option>
            </select>
          </div>

          <button
            onClick={handleSubmit}
            style={{ backgroundColor: "#c7000b" }}
            className="inline-flex items-center justify-center rounded-md text-sm text-white font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full">
            Upload File
          </button>
        </div>
      </div>
    </div>
  );
}
