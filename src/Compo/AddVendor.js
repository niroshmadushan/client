
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import './form.css'
import { apilinkmain } from './api';

const AddVendor = () => {
  const [name, setname] = useState('');
  const [des, setdes] = useState('');
  const [link, setlink] = useState('');
  const [image, setImage] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [pis, setpis] = useState(false);
  const [csgc, setcsgc] = useState(false);
  const [aim, setaim] = useState(false);
  const [sm, setsm] = useState(false);
  const [es, setes] = useState(false);
  const [nt, setnt] = useState(false);
  const [dci, setdci] = useState(false);
  const [ssb, setssb] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      const cnt = localStorage.getItem('cnt');
      if (!token) {
        setError('User not authenticated');
        return;
      }

      const formData = new FormData();
      formData.append('name', name);
      formData.append('link', link);
      formData.append('image', image);
      formData.append('des', des);
      formData.append('status', selectedStatus);
      formData.append('pis', pis);
      formData.append('csgs', csgc);
      formData.append('aim', aim);
      formData.append('sm', sm);
      formData.append('es', es);
      formData.append('nt', nt);
      formData.append('dci', dci);
      formData.append('ssb', ssb);
      formData.append('cnt', cnt);

      console.log(cnt);

      await axios.post(`${apilinkmain}/addvendor`, formData, {
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
      // Product registered successfully, you can redirect or show a success message here
      console.log('Product registered successfully');
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

      }
    }
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
      <h3>Add New Vendor</h3>
      <form onSubmit={handleSubmit}>
        <table>
          <tr>
            <th>
              <label>Name :</label>
            </th>
            <td>
              <input
                type="text"
                value={name}
                onChange={(e) => setname(e.target.value)}
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
              <label>Description :</label>
            </th>
            <td>
              <textarea
                type="text"
                value={des}
                onChange={(e) => setdes(e.target.value)}
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
              <label>Status :</label>
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
          <tr>
            <th>
              <label>Pillor Type:</label>
            </th>
          </tr>
        </table>

        <div className='chk'>

          <div>
            <br></br>
            <input
              type="checkbox"
              checked={pis}
              onChange={(e) => setpis(e.target.checked)}
            />
            <label>Perimeter and internal security</label>
          </div>
          <div>
            <input
              type="checkbox"
              checked={csgc}
              onChange={(e) => setcsgc(e.target.checked)}
            />
            <label>Cyber Security Governance & Compliance	</label>
          </div>
          <div>
            <input
              type="checkbox"
              checked={aim}
              onChange={(e) => setaim(e.target.checked)}
            />
            <label>Authentication & Identity Management</label>
          </div>
          <div>
            <input
              type="checkbox"
              checked={sm}
              onChange={(e) => setsm(e.target.checked)}
            />
            <label>Security Management</label>
          </div>
          <div>
            <input
              type="checkbox"
              checked={es}
              onChange={(e) => setes(e.target.checked)}
            />
            <label>Endpoint Security</label>
          </div>
          <div>
            <input
              type="checkbox"
              checked={nt}
              onChange={(e) => setnt(e.target.checked)}
            />
            <label>Networking</label>
          </div>
          <div>
            <input
              type="checkbox"
              checked={dci}
              onChange={(e) => setdci(e.target.checked)}
            />
            <label>Data Center Infrastructure and Infrastructure Monitoring</label>
          </div>
          <div>
            <input
              type="checkbox"
              checked={ssb}
              onChange={(e) => setssb(e.target.checked)}
            />
            <label>Server Storage & Backup Solutions</label>
          </div>
        </div>
        <button type="submit">Register Vendor</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
};

export default AddVendor;
