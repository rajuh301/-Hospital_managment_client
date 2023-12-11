import React, { useEffect, useState } from 'react';

const DisplaySerial = () => {

    const [displayData, setDisplayData] = useState([]);

    useEffect(() => {
        const fetchData = () => {
            fetch('http://localhost:5000/pasent')
                .then((res) => res.json())
                .then((data) => setDisplayData(data))
                .catch((error) => {
                    console.error('Error fetching data:', error);
                });
        };

        fetchData();
        const intervalId = setInterval(fetchData, 5000);
        return () => clearInterval(intervalId);
    }, []);




    // ------------------------ Date Finction ------------------
    function getTodayDate() {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0'); // Adding 1 because January is 0
        const day = String(today.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`;
    }

    const todayDate = getTodayDate();
    // console.log(todayDate); // Output: YYYY-MM-DD format of today's date

    // ------------------------ Date Finction ------------------


    const findDate = displayData.filter(da => {
        const dateWithoutTime = da.date.slice(0, 10); // Extracting the date part from ISO string
        return dateWithoutTime === todayDate;
    });
    console.log(findDate);




    return (
        <div>
          

          {
            findDate.map(da => <p>{da.patienID}</p>)
          }
          
        </div>
    );
};

export default DisplaySerial;