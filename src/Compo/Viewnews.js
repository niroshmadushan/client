import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NewsUpdateModal from './NewsUpdateModal';
import VideoModal from './VideoModal';
import './vncard.css';
import { apilinkmain } from './api';

const Viewnews = () => {
  const [newses, setnewses] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [error, setError] = useState('');
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem('token');
      const cnt = localStorage.getItem('cnt');
      if (!token) {
        setError('User not authenticated');
        return;
      }

      const response = await axios.get(`${apilinkmain}/newses`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'id':`${cnt}`
        }
      });

      setnewses(response.data);
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
  const openVideoModal = (url) => {
    setVideoUrl(url);
    setVideoModalOpen(true);
  };

  const closeVideoModal = () => {
    setVideoModalOpen(false);
    setVideoUrl('');
  };
  return (
    <div className='vncard'>
      <div className='space'></div>
      <h2>News & Event List</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div className='crd'>
        {newses.map((newses) => (
          <div className='vcrd' key={newses.id} onClick={() => setSelectedProduct(newses)}>
             <div className='image-container'>
            {newses.image_data ? (
              <>
              <img
                src={`data:image/jpeg;base64,${newses.image_data}`}
                alt={newses.title}
                
              />
             <a href={newses.nlink} target='_blank'><button className="play-button">&#9658;</button></a>
              </>
            ) : (
              <p>No Image Available</p>
            )}
            </div>
            <h3>#ID :{newses.nid} - {newses.ntitle}</h3>
            <hr></hr>
            <table>
              <tr>
                <th>
                  <label>News Type:</label>
                </th>
                <td>
                {newses.type}
                </td>
              </tr>
              <tr>
                <th>
                  <label>News Status: </label>
                </th>
                <td>
                {newses.status}
                </td>
              </tr>
            </table>
            <p></p>
            
            

          </div>
        ))}
      </div>
      {selectedProduct && (
        <NewsUpdateModal
          isOpen={!!selectedProduct}
          onClose={() => setSelectedProduct(null)}
          newses={selectedProduct}
          onUpdate={fetchProducts} // Directly passing the fetchProducts function
        />
      )}
    
    </div>
  );
};

export default Viewnews;
