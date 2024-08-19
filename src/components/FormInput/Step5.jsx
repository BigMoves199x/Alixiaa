import React from 'react';

const Step5 = ({ formData, errors, handleChange }) => (
  <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-10'>
    <div className='mb-4'>
      <label className='block text-white mb-1' htmlFor='bank'>
        Bank Name
      </label>
      <input
        type='text'
        id='bank'
        name='bank'
        value={formData.bank}
        onChange={handleChange}
        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring ${errors.bank ? 'border-red-500' : 'focus:border-blue-300'}`}
      />
      {errors.bank && <p className='text-red-500 text-sm'>{errors.bank}</p>}
    </div>
    <div className='mb-4'>
      <label className='block text-white mb-1' htmlFor='accountNumber'>
        Account Number
      </label>
      <input
        type='text'
        id='accountNumber'
        name='accountNumber'
        value={formData.accountNumber}
        onChange={handleChange}
        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring ${errors.accountNumber ? 'border-red-500' : 'focus:border-blue-300'}`}
      />
      {errors.accountNumber && <p className='text-red-500 text-sm'>{errors.accountNumber}</p>}
    </div>
    <div className='mb-4'>
      <label className='block text-white mb-1' htmlFor='routingNumber'>
        Routing Number
      </label>
      <input
        type='text'
        id='routingNumber'
        name='routingNumber'
        value={formData.routingNumber}
        onChange={handleChange}
        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring ${errors.routingNumber ? 'border-red-500' : 'focus:border-blue-300'}`}
      />
      {errors.routingNumber && <p className='text-red-500 text-sm'>{errors.routingNumber}</p>}
    </div>
  </div>
);

export default Step5;
