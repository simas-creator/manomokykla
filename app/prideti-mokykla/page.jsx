'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const SchoolForm = () => {
  const [error, setError] = useState(null);
  const [fileError, setFileError] = useState(null);
  const router = useRouter();
  const [jsonData, setJsonData] = useState({
    name: "",
    apskritis: "Alytaus",
    url: "",
    mu: "Mokykla",
  });
  const [imagePreview, setImagePreview] = useState(null)
  const [file, setFile] = useState(null)
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" && files?.length > 0) {
        const uploadedFile = files[0];

        // Validate file type
        const validImageTypes = ["image/jpeg", "image/png", "image/gif"];
        if (!validImageTypes.includes(uploadedFile.type)) {
            setFileError("Netinkamas failo tipas");
            setFile(null);
            setImagePreview(null);
            return;
        }

        // Validate file size (5MB max)
        const maxFileSize = 5 * 1024 * 1024; // 5MB in bytes
        if (uploadedFile.size > maxFileSize) {
            setFileError("Failas negali būti didesnis nei 5MB");
            setFile(null);
            setImagePreview(null);
            return;
        }

        // If valid, update state
        setFile(uploadedFile);
        setFileError(null);
        const previewUrl = URL.createObjectURL(uploadedFile);
        setImagePreview(previewUrl);
    } else {
        setJsonData({ ...jsonData, [name]: value });
        setError(null);
    }
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!jsonData.name || jsonData.name.trim() === "" || jsonData.name.length < 4) {
      setError("Įveskite tinkamą pavadinimą");
    } else setError(null);
    if (!file) {
      setFileError("Būtina įkelti nuotrauką");
      return;
    } else setFileError(null);


    /// add image to cloudinary
    const iUrl = null;
  
    const updatedData = { ...jsonData, url: iUrl };
    try {
      const response = await fetch("/api/schools/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Server response:", result);
        router.push("./mokyklu-ivertinimai");
      } else {
        console.log("Error:", response.status, response.statusText);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };
  
  return (
    <section className="flex justify-center flex-col px-4 py-8 max-w-3xl mx-auto">
      <h1 className='text-center text-3xl font-title text-gray-800 mb-6'>Pridėti mokyklą</h1>
      <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-8 space-y-6 font-title">
        {/* Input for Name */}
        <div className="space-y-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Pavadinimas*</label>
          <input
            type="text"
            id="name"
            name="name"
            value={jsonData.name}
            onChange={handleChange}
            className="input input-bordered input-primary w-full"
          />
          {error && <p className="text-sm text-red-600">{error}</p>}
        </div>

        {/* Input for Image */}
        <div className="flex items-center space-x-2">
          <label htmlFor="files" className="btn btn-outline btn-primary px-4 py-2 rounded-lg">Pasirinkite nuotrauką</label>
          <input
            id="files"
            className="hidden"
            type="file"
            name="image"
            onChange={handleChange}
          />
          <p className="text-sm text-gray-700">{file?.name}</p>
        </div>
        {fileError && <p className="text-sm text-red-600">{fileError}</p>}
        {imagePreview && (
        <div>
            <img
              src={imagePreview}
              className="rounded-lg border-2 border-gray-300 h-20 w-20"
            />
        </div>
      )}
        {/* Dropdown for Apskritis */}
        <div className="space-y-4">
          <label htmlFor="apskritis" className="block text-sm font-medium text-gray-700">Apskritis*</label>
          <select
            id="apskritis"
            name="apskritis"
            value={jsonData.apskritis}
            onChange={handleChange}
            className="block w-full rounded-lg border border-gray-300 bg-gray-100 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option>Alytaus</option>
            <option>Kauno</option>
            <option>Klaipėdos</option>
            <option>Marijampolės</option>
            <option>Panevėžio</option>
            <option>Šiaulių</option>
            <option>Tauragės</option>
            <option>Telšių</option>
            <option>Utenos</option>
            <option>Vilniaus</option>
          </select>
        </div>

        {/* Dropdown for Type */}
        <div className="space-y-4">
          <label htmlFor="mu" className="block text-sm font-medium text-gray-700">Tipas*</label>
          <select
            id="mu"
            name="mu"
            value={jsonData.mu}
            onChange={handleChange}
            className="block w-full rounded-lg border border-gray-300 bg-gray-100 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option>Mokykla</option>
            <option>Universitetas</option>
          </select>
        </div>
        <button type="submit" className="btn btn-outline btn-primary w-full py-2 rounded-lg">
          Pridėti
        </button>
      </form>
    </section>
  );
};

export default SchoolForm;
