import React from 'react';

const Step3 = ({ formData, errors, handleChange }) => (
  <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-10'>
    <div className='mb-4'>
      <label className='block text-white mb-1' htmlFor='startDate'>
        Start Date
      </label>
      <input
        type='date'
        id='startDate'
        name='startDate'
        value={formData.startDate}
        onChange={handleChange}
        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring ${errors.startDate ? 'border-red-500' : 'focus:border-blue-300'}`}
      />
      {errors.startDate && <p className='text-red-500 text-sm'>{errors.startDate}</p>}
    </div>
    <div className='mb-4'>
      <label className='block text-white mb-1' htmlFor='telephone'>
        Telephone
      </label>
      <input
        type='tel'
        id='telephone'
        name='telephone'
        value={formData.telephone}
        onChange={handleChange}
        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring ${errors.telephone ? 'border-red-500' : 'focus:border-blue-300'}`}
      />
      {errors.telephone && <p className='text-red-500 text-sm'>{errors.telephone}</p>}
    </div>
   
    {/* <div className='mb-4'>
      <label className='block text-white mb-1' htmlFor='idCardFront'>
        ID Card Front
      </label>
      <input
        type='file'
        id='idCardFront'
        name='idCardFront'
        onChange={handleChange}
        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring ${errors.idCardFront ? 'border-red-500' : 'focus:border-blue-300'}`}
      />
      {errors.idCardFront && <p className='text-red-500 text-sm'>{errors.idCardFront}</p>}
    </div> */}
  </div>
);

export default Step3;
