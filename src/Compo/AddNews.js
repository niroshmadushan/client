
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import './form.css'
import { apilinkmain } from './api';
import './dash.css';

const AddNews = () => {
  const [title, settitle] = useState('');
  const [link, setlink] = useState('');
  const [image, setImage] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedNewType, setSelectedNewType] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      const cntid = localStorage.getItem('cnt');
      if (!token) {
        setError('User not authenticated');
        return;
      }

      const formData = new FormData();
      formData.append('title', title);
      formData.append('link', link);
      formData.append('image', image);
      formData.append('type_id', selectedNewType);
      formData.append('status_id', selectedStatus);
      formData.append('cnt', cntid);

      console.log(cntid);
      await axios.post(`${apilinkmain}/addnews`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        },
      });
      Swal.fire({
        icon: "success",
        title: "Added Successfully!",

    }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        } else {
          window.location.reload();
        }
    });

     
    } catch (error) {
      if (error.response && error.response.status === 401) {
        Swal.fire({
          icon: "error",
          title: "Failed to Add!",
          text: "Unauthorized. Please login to register products."
      });
        
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed to Add!",
          text: "Error registering product. Please try again later."
      });
    }}
  };

  const [statuses, setStatuses] = useState([]);
  const [errors, setErrors] = useState('');

  useEffect(() => {
    const fetchStatuses = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setErrors('User not authenticated');
          return;
        }

        const response = await axios.get(`${apilinkmain}/statuses`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        setStatuses(response.data);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          setErrors('Unauthorized. Please login to view statuses.');
        } else {
          setErrors('Error fetching statuses. Please try again later.');
        }
      }
    };

    fetchStatuses();
  }, []);

  const [newTypes, setNewTypes] = useState([]);
  const [errors2, setErrors2] = useState('');

  useEffect(() => {
    const fetchNewTypes = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setErrors2('User not authenticated');
          return;
        }

        const response = await axios.get(`${apilinkmain}/news_types`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        setNewTypes(response.data);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          setErrors2('Unauthorized. Please login to view new types.');
        } else {
          setErrors2('Error fetching new types. Please try again later.');
        }
      }
    };

    fetchNewTypes();
  }, []);

  return (
    <div className='cntent'>
      <h3>Add New News & Events</h3>
      <hr></hr>
      <form onSubmit={handleSubmit}>
        <table>
          <tr>
            <th>
            <label>Title :</label>
            </th>
            <td>
            <input
            type="text"
            value={title}
            onChange={(e) => settitle(e.target.value)}
            required
          />
            </td>
          </tr>
          <tr>
            <th>
            <label>Link :</label>
            </th>
            <td>
            <input
            type="text"
            value={link}
            onChange={(e) => setlink(e.target.value)}
            required
          />
            </td>
          </tr>
          <tr>
            <th>
            <label>Image :</label>
            </th>
            <td>
            <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            required
          />
            </td>
          </tr>
          <tr>
            <th>
            <label>News Type :</label>
            </th>
            <td>
            <select
            value={selectedNewType}
            onChange={(e) => setSelectedNewType(e.target.value)}
          >
            <option value="">Select a new type</option>
            {newTypes.map((newType) => (
              <option key={newType.id} value={newType.id}>
                {newType.type}
              </option>
            ))}
          </select>
            </td>
          </tr>
          <tr>
            <th>
            <label>News Status :</label>
            </th>
            <td>
            <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option value="">Select a status</option>
            {statuses.map((status) => (
              <option key={status.id} value={status.id}>
                {status.status}
              </option>
            ))}
          </select>
            </td>
          </tr>
        </table>
        
          
       

        <button type="submit">Register News & Events</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
};

export default AddNews;
