import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { apilinkmain } from './api';

const UpdateProduct = () => {
  const { id } = useParams();
  const [productName, setProductName] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState(null);
  const [vipCustomer, setVipCustomer] = useState(false);
  const [normalCustomer, setNormalCustomer] = useState(false);
  const [specialCustomer, setSpecialCustomer] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${apilinkmain}/products/${id}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const product = response.data;
        setProductName(product.productName);
        setCategory(product.category);
        setVipCustomer(product.vipCustomer);
        setNormalCustomer(product.normalCustomer);
        setSpecialCustomer(product.specialCustomer);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('productName', productName);
    formData.append('category', category);
    if (image) {
      formData.append('image', image);
    }
    formData.append('vipCustomer', vipCustomer);
    formData.append('normalCustomer', normalCustomer);
    formData.append('specialCustomer', specialCustomer);

    try {
      await axios.put(`${apilinkmain}/products/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      navigate('/products');
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  return (
    <div>
      <h2>Update Product</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Product Name:</label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            
            required
          />
        </div>
        <div>
          <label>Category:</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)} required>
            <option value="">Select Category</option>
            <option value="Category1">Category1</option>
            <option value="Category2">Category2</option>
            <option value="Category3">Category3</option>
          </select>
        </div>
        <div>
          <label>Image:</label>
          <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        </div>
        <div>
          <label>Can be sold to:</label>
          <div>
            <input
              type="checkbox"
              checked={vipCustomer}
              onChange={(e) => setVipCustomer(e.target.checked)}
            />{' '}
            VIP Customer
          </div>
          <div>
            <input
              type="checkbox"
              checked={normalCustomer}
              onChange={(e) => setNormalCustomer(e.target.checked)}
              />{' '}
              Normal Customer
            </div>
            <div>
              <input
                type="checkbox"
                checked={specialCustomer}
                onChange={(e) => setSpecialCustomer(e.target.checked)}
              />{' '}
              Special Customer
            </div>
          </div>
          <button type="submit">Update Product</button>
        </form>
      </div>
    );
  };
  
  export default UpdateProduct;
  
