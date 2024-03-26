import React, { useState } from 'react';
import axios from 'axios';

const CreateProductForm = () => {
  const [formData, setFormData] = useState({
    name: '',
   
    // Add any additional fields here
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/products', formData);
      console.log('Product created:', response.data.product);
      // Optionally, you can redirect the user or show a success message
    } catch (error) {
      console.error('Error creating product:', error);
      // Handle error, show error message, etc.
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Product Name" required />
     
      {/* Add more input fields for other product details */}
      <button type="submit">Create Product</button>
    </form>
  );
};

export default CreateProductForm;
