import React from 'react';
import { useNavigate } from 'react-router-dom';
import AddNews from './AddNews';
import AddVendor from './AddVendor';
import './dash.css'
import Viewnews from './Viewnews';
import Viewvendor from './Viewvendor';
import img1 from './ConnexIT.png'
const Dashboard = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('cntid');
        navigate('/');
    };

    const handleRegisterProduct = () => {
        document.getElementById('srs1').style.display = 'block';
        document.getElementById('srs2').style.display = 'none';
        document.getElementById('sv1').style.display = 'none';
        document.getElementById('sv2').style.display = 'none';
        document.getElementById('sv3').style.display = 'none';
        document.getElementById('sv4').style.display = 'none';
        document.getElementById('sv5').style.display = 'none';
    };

    const handleViewProducts = () => {
        document.getElementById('srs2').style.display = 'block';
        document.getElementById('srs1').style.display = 'none';
        document.getElementById('sv1').style.display = 'none';
        document.getElementById('sv2').style.display = 'none';
        document.getElementById('sv3').style.display = 'none';
        document.getElementById('sv4').style.display = 'none';
        document.getElementById('sv5').style.display = 'none';
    };
    const addnews = () => {
        document.getElementById('sv1').style.display = 'block';
        document.getElementById('sv2').style.display = 'none';
        document.getElementById('sv3').style.display = 'none';
        document.getElementById('sv4').style.display = 'none';
        document.getElementById('sv5').style.display = 'none';
    }
    const addvendor = () => {
        document.getElementById('sv2').style.display = 'block';
        document.getElementById('sv1').style.display = 'none';
        document.getElementById('sv3').style.display = 'none';
        document.getElementById('sv4').style.display = 'none';
        document.getElementById('sv5').style.display = 'none';
    }
    const viewnews = () => {
        document.getElementById('sv1').style.display = 'none';
        document.getElementById('sv2').style.display = 'none';
        document.getElementById('sv3').style.display = 'block';
        document.getElementById('sv4').style.display = 'none';
        document.getElementById('sv5').style.display = 'none';
    }
    const viewvendor = () => {
        document.getElementById('sv1').style.display = 'none';
        document.getElementById('sv2').style.display = 'none';
        document.getElementById('sv3').style.display = 'none';
        document.getElementById('sv4').style.display = 'block';
        document.getElementById('sv5').style.display = 'none';
    }
    const home =()=>{
        document.getElementById('srs1').style.display = 'none';
        document.getElementById('srs2').style.display = 'none';
        document.getElementById('sv1').style.display = 'none';
        document.getElementById('sv2').style.display = 'none';
        document.getElementById('sv3').style.display = 'none';
        document.getElementById('sv4').style.display = 'none';
        document.getElementById('sv5').style.display = 'block';
    }

    return (

        <>
            <div className='dash'>
                <div id='fx'>
                    <img src={img1} onClick={home}></img>
                <h2>Connex Admin Dashboard</h2>
                <hr></hr>

                <button className='btndh ft' onClick={handleRegisterProduct}>Add New </button>
                <button className='btndh' onClick={handleViewProducts}>View & Update</button>
                <button className='btndh lgt' onClick={handleLogout}>Logout</button>
                <hr></hr>
                <div className='srsbtnset1' id='srs1'>
                    <button onClick={addnews}>Add News & Events</button>
                    <button onClick={addvendor}>Add Vendor</button>
                    <hr></hr>
                </div>

                <div className='srsbtnset2' id='srs2'>
                    <button onClick={viewnews}> View News & Events</button>
                    <button onClick={viewvendor}>View Vendor</button>
                    <hr></hr>
                </div>
                </div>
                <div className='welcome' id='sv5'>
                <img src={img1}></img>
                <h1>Welcome To Connex IT !</h1>
                <h4>Introducing New Connex IT Web Application.</h4>
                <p>This Portal can be use to add and change News & events <br></br>and Add vendor information to new Connex IT web pages.</p>
                <hr></hr>
                <h6>Designed and Developed By ConnexIT SE Team</h6>
                <h7>Copyright © 2024 - Connex information Technologhy (PVT) Ltd</h7>
                </div>
                <div className='svs1' id='sv1'>
                    <AddNews />
                </div>
                <div className='svs1' id='sv2'>
                    <AddVendor />
                </div>
                <div className='svs1' id='sv3'>
                    <Viewnews />
                </div>
                <div className='svs2' id='sv4'>
                    <Viewvendor/>
                </div>

            </div>
        </>
    );
};

export default Dashboard;
