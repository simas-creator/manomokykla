import React from 'react';
import StarRating from './StarRating'

const TeacherCase = ({
  name = 'Vardenis',
  surname = 'Pavardenis',
  subject = 'Dalykas',
  school = 'Mokykla',
  rating,
  imgUrl = 'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp',
}) => {
  console.log('THE RATING IS', rating)
  return (
    <div className="card bg-base-100 w-auto max-w-96 h-auto shadow-xl p-4 flex flex-col sm:flex-row items-center gap-4 border">
      <div className="avatar">
        <div className="w-16 h-16 rounded-full border-2 border-accent overflow-hidden">
          <img src={imgUrl} alt={`${name} ${surname}`} />
        </div>
      </div>
      <div className="flex flex-col">
        <h6 className="text-lg font-bold text-primary">
          {name} {surname}
        </h6>
        <p className="text-sm text-gray-600">{subject}</p>
        <p className="text-sm text-gray-400">{school}</p>
        <StarRating r={rating} />
      </div>
    </div>
  );
};

export default TeacherCase;