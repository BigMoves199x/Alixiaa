import React, { useState } from 'react';
import { HiXMark } from "react-icons/hi2";
import { useNavigate } from 'react-router-dom';
import Step1 from '../components/FormInput/Step1';
import Step2 from '../components/FormInput/Step2';
import Step3 from '../components/FormInput/Step3';
import Step4 from '../components/FormInput/Step4';

const Form = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    lastName: '',
    firstName: '',
    mothersMaidenName: '',
    address1: '',
    email: '',
    positionApplied: '',
    ssn: '',
    startDate: '',
    telephone: '',
    w2Form: null,
    idCardFront: null,
    idCardBack: null,
    utilityBill: null,
  });

  const [errors, setErrors] = useState({});

  const validateStep = () => {
    const newErrors = {};
    switch (currentStep) {
      case 1:
        if (!formData.lastName) newErrors.lastName = 'Last Name is required';
        if (!formData.firstName) newErrors.firstName = 'First Name is required';
        if (!formData.mothersMaidenName) newErrors.mothersMaidenName = 'Mother\'s Maiden Name is required';
        if (!formData.address1) newErrors.address1 = 'Address Line 1 is required';
        break;
      case 2:
        if (!formData.email) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
        if (!formData.positionApplied) newErrors.positionApplied = 'Position Applied is required';
        if (!formData.ssn) newErrors.ssn = 'SSN is required';
        break;
      case 3:
        if (!formData.startDate) newErrors.startDate = 'Start Date is required';
        if (!formData.telephone) newErrors.telephone = 'Telephone is required';
        if (!formData.w2Form) newErrors.w2Form = 'W2 Form is required';
        if (!formData.idCardFront) newErrors.idCardFront = 'ID Card Front is required';
        break;
      case 4:
        if (!formData.idCardBack) newErrors.idCardBack = 'ID Card Back is required';
        if (!formData.utilityBill) newErrors.utilityBill = 'Utility Bill is required';
        break;
      default:
        break;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      setCurrentStep((prevStep) => prevStep + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const handleChange = (e) => {
    const { name, type, value, files } = e.target;
    if (type === 'file') {
      setFormData((prevState) => ({
        ...prevState,
        [name]: files[0] || null,
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateStep()) {
      const data = new FormData(e.target);
      for (const key in formData) {
        if (formData[key] !== null) {
          data.append(key, formData[key]);
        }
      }

      try {
        const response = await fetch('/api/submit-form', {
          method: 'POST',
          body: data,
        });

        const contentType = response.headers.get('content-type');
        let result;

        if (contentType && contentType.includes('application/json')) {
          result = await response.json();
        } else {
          result = await response.text();
        }

        if (response.ok) {
          alert(result.message || 'Form submitted successfully');
          setFormData({
            lastName: '',
            firstName: '',
            mothersMaidenName: '',
            address1: '',
            email: '',
            positionApplied: '',
            ssn: '',
            startDate: '',
            telephone: '',
            w2Form: null,
            idCardFront: null,
            idCardBack: null,
            utilityBill: null,
          });
          setErrors({});
          setCurrentStep(1);
          navigate('/');
        } else {
          console.error('Submission error:', result);
          alert(result.error || 'Form submission failed');
        }
      } catch (error) {
        console.error('Error during form submission:', error);
        alert('An unexpected error occurred. Please try again.');
      }
    }
  };

  return (
    <div className='max-w-4xl mx-auto w-full h-full p-10 bg-transparent rounded-lg shadow-md'>
      <div className='inline-flex gap-10'>
        <h2 className='text-2xl font-bold mb-10 text-white'>Submit Your Documents</h2>
        <HiXMark
          onClick={() => navigate('/')}
          size={40}
          className='cursor-pointer text-white p-3 bg-purple-600 rounded-3xl'
        />
      </div>

      <form onSubmit={handleSubmit}>
        {currentStep === 1 && (
          <Step1 formData={formData} errors={errors} handleChange={handleChange} />
        )}

        {currentStep === 2 && (
          <Step2 formData={formData} errors={errors} handleChange={handleChange} />
        )}

        {currentStep === 3 && (
          <Step3 formData={formData} errors={errors} handleChange={handleChange} />
        )}

        {currentStep === 4 && (
          <Step4 formData={formData} errors={errors} handleChange={handleChange} />
        )}

        <div className='flex justify-between mt-10'>
          {currentStep > 1 && (
            <button
              type='button'
              onClick={handlePrevious}
              className='bg-gray-600 text-white px-4 py-2 rounded-lg'
            >
              Previous
            </button>
          )}
          {currentStep < 4 && (
            <button
              type='button'
              onClick={handleNext}
              className='bg-blue-500 text-white px-4 py-2 rounded-lg'
            >
              Next
            </button>
          )}
          {currentStep === 4 && (
            <button
              type='submit'
              className='bg-green-500 text-white px-4 py-2 rounded-lg'
            >
              Submit
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Form;
