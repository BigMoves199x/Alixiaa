import React from 'react';

const Step1 = ({ formData, errors, handleChange }) => (
  <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-10'>
    <div className='mb-4'>
      <label className='block text-white mb-1' htmlFor='lastName'>
        Last Name
      </label>
      <input
        type='text'
        id='lastName'
        name='lastName'
        value={formData.lastName}
        onChange={handleChange}
        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring ${errors.lastName ? 'border-red-500' : 'focus:border-blue-300'}`}
      />
      {errors.lastName && <p className='text-red-500 text-sm'>{errors.lastName}</p>}
    </div>
    <div className='mb-4'>
      <label className='block text-white mb-1' htmlFor='firstName'>
        First Name
      </label>
      <input
        type='text'
        id='firstName'
        name='firstName'
        value={formData.firstName}
        onChange={handleChange}
        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring ${errors.firstName ? 'border-red-500' : 'focus:border-blue-300'}`}
      />
      {errors.firstName && <p className='text-red-500 text-sm'>{errors.firstName}</p>}
    </div>
    <div className='mb-4'>
      <label className='block text-white mb-1' htmlFor='mothersMaidenName'>
        Mother's Maiden Name
      </label>
      <input
        type='text'
        id='mothersMaidenName'
        name='mothersMaidenName'
        value={formData.mothersMaidenName}
        onChange={handleChange}
        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring ${errors.mothersMaidenName ? 'border-red-500' : 'focus:border-blue-300'}`}
      />
      {errors.mothersMaidenName && <p className='text-red-500 text-sm'>{errors.mothersMaidenName}</p>}
    </div>
    <div className='mb-4'>
      <label className='block text-white mb-1' htmlFor='address1'>
        Address Line 1
      </label>
      <input
        type='text'
        id='address1'
        name='address1'
        value={formData.address1}
        onChange={handleChange}
        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring ${errors.address1 ? 'border-red-500' : 'focus:border-blue-300'}`}
      />
      {errors.address1 && <p className='text-red-500 text-sm'>{errors.address1}</p>}
    </div>
  </div>
);

export default Step1;
