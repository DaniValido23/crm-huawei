import { X, Upload } from 'lucide-react';
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

export default function UserForm() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [birthday, setBirthday] = useState('')
  const [phone, setPhone] = useState('')
  const [photo, setPhoto] = useState<File | null>(null)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      setPhoto(acceptedFiles[0])
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {'image/*': []},
    multiple: false
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log({ firstName, lastName, email, birthday, phone, photo })    
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center justify-center text-2xl bg-white p-10 text-black rounded-lg shadow-lg w-full md:w-4/5 xl:w-3/5">
      <div className="w-full max-w-screen space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-xl md:text-2xl xl:text-3xl font-bold">Create User</h1>
        </div>
        <div className="space-y-4">
          <div className="flex space-x-4">
            <div className="flex-1 flex flex-col justify-center space-y-2">
              <label htmlFor="first-name" className="text-lg md:text-xl xl:text-xl font-medium leading-none ">
                First Name
              </label>
              <input
                id="first-name"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="flex h-12 w-full rounded-md border bg-white px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                placeholder="User name"
                required
              />
            </div>
            <div className="w-32 space-y-2">
              <label className="text-sm font-medium leading-none ">
                Photo
              </label>
              <div
                {...getRootProps()}
                className={`flex flex-col items-center justify-center h-20 rounded-md border-2 border-dashed ${
                  isDragActive ? 'border-[hsl(222.2,47.4%,11.2%)] bg-[hsl(210,40%,98%)]' : 'border-[hsl(214.3,31.8%,91.4%)]'
                } cursor-pointer transition-colors duration-200 ease-in-out`}
              >
                <input {...getInputProps()} />
                {photo ? (
                  <div className="flex flex-col items-center">
                    <span className="text-xs truncate max-w-[100px]">{photo.name}</span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        setPhoto(null)
                      }}
                      className="mt-1"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <Upload size={16} />
                    <span className="mt-1 text-xs">Upload</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <label htmlFor="last-name" className="text-lg md:text-xl xl:text-xl font-medium leading-none">Last Name</label>
            <input
              id="last-name"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="flex h-12 w-full rounded-md border bg-white px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
              placeholder="User last name"
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="text-lg md:text-xl xl:text-xl font-medium leading-none">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex h-12 w-full rounded-md border bg-white px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
              placeholder="email@example.com"
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="birthday" className="text-lg md:text-xl xl:text-xl font-medium leading-none">Birthday</label>
            <input
              id="birthday"
              type="date"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
              className="flex h-12 w-full rounded-md border bg-white px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="phone" className="text-lg md:text-xl xl:text-xl font-medium leading-none">Phone Number</label>
            <input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="flex h-12 w-full rounded-md border bg-white px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
              placeholder="+1 (555) 123-4567"
              required
            />
          </div>
          <button
            type="submit"
            style={{ backgroundColor: "#c7000b" }}
            className="inline-flex items-center justify-center rounded-md text-lg text-white bg-black font-medium h-10 px-4 py-2 w-full transition-colors hover:bg-gray-700">
            Create
          </button>
        </div>
      </div>
    </form>
  );
}
