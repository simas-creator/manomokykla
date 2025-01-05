'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useEdgeStore } from '../lib/edgestore';

const AddTeacher = () => {
  const router = useRouter();
  const [jsonData, setJsonData] = useState({
    name: "",
    surname: "",
    subject: "",
    school: "",
    review: "",
    image: "https://files.edgestore.dev/ad4vhbfyqpkhtrl9/publicFiles/_public/c7719798-8e3c-4bbd-b066-54bd43fd86d3.webp", 
    fileName: "",
    rating: 1,
  });
  const { edgestore } = useEdgeStore();
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    console.log('value', value)
    if (name === "image" && files?.length > 0) {
      setJsonData({ ...jsonData, image: files[0], fileName: files[0].name });
    } else if (name === "rating") {
      // Ensure rating is a number
      setJsonData({ ...jsonData, [name]: Number(value) });
    } else {
      setJsonData({ ...jsonData, [name]: value });
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, surname, subject, school, review, rating, image } = jsonData;
  
    // Ensure required fields are filled
    if (!name || !surname || !subject || !school) {
      setError('Užpildykit privalomus laukus')
      return
    }
  
    // If an image is uploaded, handle its upload
    let i;
    if (image === "https://files.edgestore.dev/ad4vhbfyqpkhtrl9/publicFiles/_public/c7719798-8e3c-4bbd-b066-54bd43fd86d3.webp") {
      i = image;
    }
    if (image && image !== "https://files.edgestore.dev/ad4vhbfyqpkhtrl9/publicFiles/_public/c7719798-8e3c-4bbd-b066-54bd43fd86d3.webp") {
      try {
        const uploadResult = await edgestore.publicFiles.upload({
          file: image, 
          onProgressChange: (progress) => {
            console.log("Upload progress:", progress);
          },
        });
        i = uploadResult.url;
        console.log(i);
      } catch (error) {
        console.error("Error uploading image:", error);
        return; // Abort if image upload fails
      }
    }
  
    // Submit the form with the URL included in jsonData
    try {
      const formDataToSubmit = {
        name,
        surname,
        subject,
        school,
        review,
        image: i,
        rating
      };
  
      const response = await fetch('/api/teachers/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formDataToSubmit),
      });
  
      const result = await response.json();
  
      if (response.ok) {
        router.push("/perziureti-ivertinimus");
      } else {
        console.log("Error adding teacher:", result.error);
      }
    } catch (error) {
      console.log("Error submitting form:", error);
    }
  };
  
  return (
    <section className="flex justify-between flex-col px-4 py-8 max-w-3xl mx-auto">
    <h1 className='text-center text-3xl font-title'>Pridėti mokytoją</h1>
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-4 bg-white shadow-md rounded-lg space-y-4 my-5 font-title"
    >
      <div className="flex gap-10">
        <div className="space-y-2">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Vardas*
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={jsonData.name}
            onChange={handleChange}
            className="input input-bordered input-primary w-full max-w-xs"
            required
            onInvalid={(e) => e.target.setCustomValidity('Įveskite vardą')}
            onInput={(e) => e.target.setCustomValidity('')}
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="surname" className="block text-sm font-medium text-gray-700">
            Pavardė*
          </label>
          <input
            type="text"
            id="surname"
            name="surname"
            value={jsonData.surname}
            onChange={handleChange}
            className="input input-bordered input-primary w-full max-w-xs"
            required
            onInvalid={(e) => e.target.setCustomValidity('Įveskite pavardę')}
            onInput={(e) => e.target.setCustomValidity('')}
          />
        </div>
      </div>
      <div className="space-y-2">
        <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
          Dalykas*
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={jsonData.subject}
          onChange={handleChange}
          className="input input-bordered input-primary w-full"
          required
          onInvalid={(e) => e.target.setCustomValidity('Įveskite dalyką')}
          onInput={(e) => e.target.setCustomValidity('')}
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="school" className="block text-sm font-medium text-gray-700">
          Mokykla/universitetas*
        </label>
        <input
          type="text"
          id="school"
          name="school"
          value={jsonData.school}
          onChange={handleChange}
          className="input input-bordered input-primary w-full"
          required
          onInvalid={(e) => e.target.setCustomValidity('Įveskite mokyklą ar universitetą')}
          onInput={(e) => e.target.setCustomValidity('')}
        />
        </div>
        <div className="rating items-center">
          <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mr-2">Įvertinimas:</label>
          {[1, 2, 3, 4, 5].map((value) => (
            <input
              key={value}
              type="radio"
              name="rating"
              value={value}
              className="mask mask-star-2 bg-orange-400"
              checked={jsonData.rating === value}
              onChange={handleChange}
            />
          ))}
        </div>
        <div>
          <div className="flex items-center space-x-2">
            <label htmlFor="files" className="btn btn-outline btn-primary">
              Pasirinkite nuotrauką
            </label>
            <input
              id="files"
              className="hidden"
              type="file"
              name="image"
              onChange={handleChange}
            />
            <p className="text-sm text-gray-700">{jsonData.fileName}</p>
          </div>
        </div>
        <div className="space-y-2">
          <label htmlFor="review" className="block text-sm font-medium text-gray-700">
            Aprašymas
          </label>
          <textarea
            id="review"
            name="review"
            value={jsonData.review}
            onChange={handleChange}
            className="textarea textarea-primary"
            rows="4"
          ></textarea>
        </div>
        <button type="submit" className="btn btn-outline btn-primary">
          Pridėti
        </button>
      </form>
    </section>
  );
};

export default AddTeacher;
