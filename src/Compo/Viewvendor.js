import React, { useEffect, useState } from 'react';
import axios from 'axios';
import VendorUpdateModal from './VendorUpdateModal';
import './vncard.css';
import { apilinkmain } from './api';

const Viewvendor = () => {
  const [vendor, setvendor] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [error, setError] = useState('');

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem('token');
      const cnt = localStorage.getItem('cnt');
      if (!token) {
        setError('User not authenticated');
        return;
      }

      const response = await axios.get(`${apilinkmain}/vendors`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'id': `${cnt}`
        }
      });

      setvendor(response.data);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError('Unauthorized. Please login to view products.');
      } else {
        setError('Error fetching products. Please try again later.');
      }
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  const renderPillars = (vendor) => {
    const pillars = [
      { label: 'Perimeter and Internal Security', value: vendor.Perimeter_and_internal_security },
      { label: 'Cyber Security Governance & Compliance', value: vendor.Cyber_Security_Governance_Compliance },
      { label: 'Authentication & Identity Management', value: vendor.Authentication_Identity_Management },
      { label: 'Security Management', value: vendor.Security_Management },
      { label: 'Endpoint Security', value: vendor.Endpoint_Security },
      { label: 'Networking', value: vendor.Networking },
      { label: 'Data Center Infrastructure and Infrastructure Monitoring', value: vendor.Data_Center_Infrastructure_and_Infrastructure_Monitoring },
      { label: 'Server Storage & Backup Solutions', value: vendor.Server_Storage_Backup_Solutions }
    ];

    return (
      <ol>
        {pillars.map((pillar, index) => (
          pillar.value === "true" ?<li key={index}>{pillar.label}</li> : null
        ))}
      </ol>
    );
  };
  return (
    <div className='vncard'>
      <div className='space'></div>
      <h2>News & Event List</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div className='crd2'>
        {vendor.map((vendor) => (
          <div className='vcrd' key={vendor.id} onClick={() => setSelectedProduct(vendor)}>
            <div className='image-container'>
              {vendor.image_data ? (
                <>
                  <img
                    src={`data:image/jpeg;base64,${vendor.image_data}`}
                    alt={vendor.title}

                  />
                  <a href={vendor.wlink}  target='_blank'><div className="play-button2">Visit Web Site</div></a>
                </>
              ) : (
                <p>No Image Available</p>
              )}
            </div>
            <h3>#ID:{vendor.vid} - {vendor.name}</h3>
            <hr></hr>
            <table>
              <tr>
                <th>
                  <label>Description:</label>
                </th>
                <td>
                  {vendor.des}
                </td>
              </tr>
              <tr>
                <th>
                  <label>News Status: </label>
                </th>
                <td>
                  {vendor.status}
                </td>
              </tr>
            
                  
                  
                  
               
            </table>
            <div className='pil'>
            <label>Vendor Pillars:</label>
            <ol>
            {renderPillars(vendor)}
            </ol>
           
            
            </div>
           



          </div>
        ))}
      </div>
      {selectedProduct && (
        <VendorUpdateModal
          isOpen={!!selectedProduct}
          onClose={() => setSelectedProduct(null)}
          vendor={selectedProduct}
          onUpdate={fetchProducts} // Directly passing the fetchProducts function
        />
      )}
    </div>
  );
};

export default Viewvendor;
