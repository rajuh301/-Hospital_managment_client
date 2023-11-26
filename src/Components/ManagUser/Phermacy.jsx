import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import Navbar from '../Navbar/Navbar';

const Phermacy = () => {
    const [searchData, setSearchData] = useState(null);
    const [datas, setDatas] = useState([]);
    const [patientId, setPatientId] = useState('');

    useEffect(() => {
        fetch('http://localhost:5000/pasent')
            .then((res) => res.json())
            .then((data) => setDatas(data));
    }, []);

    const search = (e) => {
        e.preventDefault();
        if (datas) {
            const searching = datas.find((da) => da.patienID === parseInt(patientId, 10));
            setSearchData(searching ? searching : 'Patient not found');
        }

    };


    const handleInputChange = (e) => {
        setPatientId(e.target.value);
    };





    return (
        <div className='text-center'>
            <Navbar></Navbar>
            <div>

                <form onSubmit={search}>
                    <div className='flex items-center gap-2 justify-center'>

                        <input
                            type="number"
                            placeholder="Input patient ID"
                            className="btn btn-primary w-40 p-1 text-1xl"
                            value={patientId}
                            onChange={handleInputChange}
                        />

                        <div>
                            <button type="submit" className="btn btn-primary">
                                Search <FaSearch />
                            </button>
                        </div>
                    </div>

                </form>
            </div>

            {
                searchData ?
                    <div>
                        <div className='border shadow-lg rounded-lg p-5 font-bold '>
                            <div className=' gap-5'>
                            <small>Date: {searchData?.date ? new Date(searchData.date).toLocaleString() : 'Date Unavailable'}</small>



                                <small className='text-start'>
                                    <p>Patien Name : {searchData?.name}</p>
                                    <p>Age : {searchData?.age}</p>
                                    <p>Physical problem : {searchData?.problem}</p>
                                    <p>Referral : {searchData?.referral}</p>
                                </small>

                                <div className='text-start mt-10'>




                                    {searchData?.prediction?.map(item => (
                                        <div key={item.timestamp}>
                                            <hr className='font-bold'/>
                                            <br />
                                            <p className='text-center text-green-800'>Timestamp: {new Date(item.timestamp).toLocaleString()}</p>
                                         
                                            {item.data.split(/\d+\./).filter(part => part.trim() !== '').map((part, index) => (
                                                <p key={index}>

                                                    {index + 1}. {part.trim()}
                                                </p>
                                            ))}
                                        </div>
                                    ))}


                                </div>


                            </div>

                        </div>

                        <div>

                        </div>

                        {/* --------------------------------------------- */}


                        {/* --------------------------------------------- */}

                    </div>


                    : ''
            }


        </div>
    );
};

export default Phermacy;
