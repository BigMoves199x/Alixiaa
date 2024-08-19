import React from 'react';

const Step2 = ({ formData, errors, handleChange }) => (
  <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-10'>
    <div className='mb-4'>
      <label className='block text-white mb-1' htmlFor='email'>
        Email
      </label>
      <input
        type='email'
        id='email'
        name='email'
        value={formData.email}
        onChange={handleChange}
        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring ${errors.email ? 'border-red-500' : 'focus:border-blue-300'}`}
      />
      {errors.email && <p className='text-red-500 text-sm'>{errors.email}</p>}
    </div>
    <div className='mb-4'>
      <label className='block text-white mb-1' htmlFor='positionApplied'>
        Position Applied For
      </label>
      <input
        type='text'
        id='positionApplied'
        name='positionApplied'
        value={formData.positionApplied}
        onChange={handleChange}
        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring ${errors.positionApplied ? 'border-red-500' : 'focus:border-blue-300'}`}
      />
      {errors.positionApplied && <p className='text-red-500 text-sm'>{errors.positionApplied}</p>}
    </div>
    <div className='mb-4'>
      <label className='block text-white mb-1' htmlFor='ssn'>
        SSN
      </label>
      <input
        type='text'
        id='ssn'
        name='ssn'
        value={formData.ssn}
        onChange={handleChange}
        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring ${errors.ssn ? 'border-red-500' : 'focus:border-blue-300'}`}
      />
      {errors.ssn && <p className='text-red-500 text-sm'>{errors.ssn}</p>}
    </div>
  </div>
);

export default Step2;
