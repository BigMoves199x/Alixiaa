import React from 'react';

const Step4 = ({ formData, errors, handleChange }) => (
  <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-10'>
    <div className='mb-4'>
      <label className='block text-white mb-1' htmlFor='idCardBack'>
        ID Card Back
      </label>
      <input
        type='file'
        id='idCardBack'
        name='idCardBack'
        onChange={handleChange}
        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring ${errors.idCardBack ? 'border-red-500' : 'focus:border-blue-300'}`}
      />
      {errors.idCardBack && <p className='text-red-500 text-sm'>{errors.idCardBack}</p>}
    </div>
    <div className='mb-4'>
      <label className='block text-white mb-1' htmlFor='utilityBill'>
        Utility Bill
      </label>
      <input
        type='file'
        id='utilityBill'
        name='utilityBill'
        onChange={handleChange}
        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring ${errors.utilityBill ? 'border-red-500' : 'focus:border-blue-300'}`}
      />
      {errors.utilityBill && <p className='text-red-500 text-sm'>{errors.utilityBill}</p>}
    </div>
  </div>
);

export default Step4;
