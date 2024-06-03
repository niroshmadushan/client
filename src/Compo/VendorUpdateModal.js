import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { apilinkmain } from './api';

const VendorUpdateModal = ({ isOpen, onClose, vendor, onUpdate }) => {
  const [error, setError] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [name, setname] = useState(vendor.name);
  const [des, setdes] = useState(vendor.des);
  const [link, setlink] = useState(vendor.wlink);
  const [image, setImage] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(vendor.vstatus);
  const [pis, setpis] = useState(false);
  const [csgc, setcsgc] = useState(false);
  const [aim, setaim] = useState(false);
  const [sm, setsm] = useState(false);
  const [es, setes] = useState(false);
  const [nt, setnt] = useState(false);
  const [dci, setdci] = useState(false);
  const [ssb, setssb] = useState(false);
  useEffect(() => {
    setname(vendor.name);
    setdes(vendor.des);
    setlink(vendor.wlink);
    setSelectedStatus(vendor.vstatus);
    setpis(vendor.Perimeter_and_internal_security === 'true');
    setcsgc(vendor.Cyber_Security_Governance_Compliance === 'true');
    setaim(vendor.Authentication_Identity_Management === 'true');
    setsm(vendor.Security_Management === 'true');
    setes(vendor.Endpoint_Security === 'true');
    setnt(vendor.Networking === 'true');
    setdci(vendor.Data_Center_Infrastructure_and_Infrastructure_Monitoring === 'true');
    setssb(vendor.Server_Storage_Backup_Solutions === 'true');


    console.log(name, des, link, image, selectedStatus, pis, csgc, aim, sm, es, nt, dci, ssb,);
    if (vendor.image_data) {
      const blob = new Blob([Uint8Array.from(atob(vendor.image_data), c => c.charCodeAt(0))], { type: 'image/jpeg' });
      const url = URL.createObjectURL(blob);
      setImageUrl(url);
    }
  }, [vendor]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('User not authenticated');
        return;
      }

      const formData = new FormData();
      formData.append('name', name);
      formData.append('link', link);
      formData.append('des', des);
      formData.append('image', image || new Blob([Uint8Array.from(atob(vendor.image_data), c => c.charCodeAt(0))], { type: 'image/jpeg' }));
      formData.append('status', selectedStatus);
      formData.append('pis', pis);
      formData.append('csgc', csgc);
      formData.append('aim', aim);
      formData.append('sm', sm);
      formData.append('es', es);
      formData.append('nt', nt);
      formData.append('dci', dci);
      formData.append('ssb', ssb);


      await axios.put(`${apilinkmain}/addvendor/${vendor.vid}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        },
      });

      onUpdate();
      onClose();
    } catch (error) {
      setError('Error updating product. Please try again later.');
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

  if (!isOpen) return null;
  function testcheck(data) {
    if (data === "true") {
      return true;
    } else {
      return false;
    }
  }


  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Update Product</h2>
        <form onSubmit={handleUpdate}>
        {imageUrl && !image && (
            <img src={imageUrl} alt="News"/>
          )}
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
          <button type="submit">Update Vendor</button>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
        <button id='b1' onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default VendorUpdateModal;
