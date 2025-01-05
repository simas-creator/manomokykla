'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useEdgeStore } from '../lib/edgestore';

const SchoolForm = () => {
  const router = useRouter();
  const [jsonData, setJsonData] = useState({
    name: "",
    apskritis: "Alytaus",
    teachers: [],
    imgUrl: "https://files.edgestore.dev/ad4vhbfyqpkhtrl9/publicFiles/_public/c7719798-8e3c-4bbd-b066-54bd43fd86d3.webp",
    mu: "Mokykla",
  });

  const { edgestore } = useEdgeStore();
  
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" && files?.length > 0) {
      setJsonData({ ...jsonData, image: files[0], fileName: files[0].name });
    } else if (name === "rating") {
      setJsonData({ ...jsonData, [name]: Number(value) });
    } else {
      setJsonData({ ...jsonData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const { name, apskritis, mu, image } = jsonData;
    let uploadedImageUrl = image;
  
    if (image && image !== "https://files.edgestore.dev/ad4vhbfyqpkhtrl9/publicFiles/_public/c7719798-8e3c-4bbd-b066-54bd43fd86d3.webp") {
      try {
        const uploadResult = await edgestore.publicFiles.upload({
          file: image,
          onProgressChange: (progress) => console.log("Upload progress:", progress),
        });
        uploadedImageUrl = uploadResult.url;
      } catch (error) {
        console.error("Error uploading image:", error);
        return;
      }
    }
  
    const updatedData = { ...jsonData, image: uploadedImageUrl };
  
    try {
      const response = await fetch("./api/schools/add", {
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
            required
            onInvalid={(e) => e.target.setCustomValidity('Įveskite mokyklą')}
            onInput={(e) => e.target.setCustomValidity('')}
            minLength={3}
          />
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
          <p className="text-sm text-gray-700">{jsonData.fileName}</p>
        </div>

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
