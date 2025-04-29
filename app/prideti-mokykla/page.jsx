'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
const SchoolForm = () => {
  const [error, setError] = useState(null);
  const [fileError, setFileError] = useState(null);
  const router = useRouter();
  
  const [imagePreview, setImagePreview] = useState(null)
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false);
  const {data: session, status} = useSession();
  const [jsonData, setJsonData] = useState({
    name: "",
    apskritis: "Alytaus",
    imgUrl: "",
    type: "Gimnazija",
  });
  useEffect(() => {
    if (session?.user?.email) {
      setJsonData(prev => ({ ...prev, user: session.user.email }));
    }
  }, [session]);
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
    setLoading(true);
    if (!jsonData.name || jsonData.name.trim() === "" || jsonData.name.length < 4) {
      setLoading(false);
      setError("Įveskite tinkamą pavadinimą");
      return;
    } else {
      setError(null);
    }
    if (!file) {
      setLoading(false);
      setFileError("Būtina įkelti nuotrauką");
      return;
    } else {
      setFileError(null);
    }
    const formData = new FormData();
    formData.append("file", file);
    formData.append("mokykla", jsonData.name);
    try {
      const res1 = await fetch("/api/s3-file", {
        method: "POST",
        body: formData,
      })

      if (!res1.ok) {
        setFileError("Klaida įkeliant failą");
        setLoading(false);
        return;
      }

      const data = await res1.json();
      jsonData.imgUrl = data.fileName;

      const response = await fetch("/api/schools/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${session?.user?.accessToken}`,
        },
        body: JSON.stringify(jsonData),
      });
      if (response.ok) {
        const result = await response.json();
        console.log("Server response:", result);
        router.push("/perziureti-mokyklas");
      } else {
        console.log("Error:", response.status, response.statusText);
      }
    } catch (error) {
      console.log("Fetch error:", error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <section className="flex justify-center flex-col px-4 py-8 max-w-3xl mx-auto">
      <h1 className='text-center text-3xl font-title text-gray-800 mb-6 mt-4 font-semibold'>Pridėti mokyklą</h1>
      <form onSubmit={handleSubmit} className="bg-white shadow-lg border border-primary rounded-lg p-8 space-y-6 font-title">
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
              className="rounded-lg object-contain border-2 border-gray-300 h-20 w-20"
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
            className="block w-full rounded-lg border border-gray-300 bg-gray-100 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
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
          <label htmlFor="type" className="block text-sm font-medium text-gray-700">Tipas*</label>
          <select
            id="type"
            name="type"
            value={jsonData.type}
            onChange={handleChange}
            className="block w-full rounded-lg border border-gray-300 bg-gray-100 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option>Gimnazija</option>
            <option>Universitetas</option>
            <option>Profesinė mokykla</option>
          </select>
        </div>
        
        {/* Submit Button */}
        {loading ? (<button disabled className="btn btn-outline btn-primary w-full py-2 rounded-lg">
            Kraunama...
        </button>): (<button type="submit" className="btn btn-outline btn-primary w-full py-2 rounded-lg">
            Pridėti
        </button>)}
      </form>
    </section>
  );
};

export default SchoolForm;
