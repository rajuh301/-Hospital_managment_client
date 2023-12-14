import React, { useEffect, useState } from 'react';

const DisplaySerial = () => {

    const [displayData, setDisplayData] = useState([]);

    useEffect(() => {
        const fetchData = () => {
            fetch('https://hospital-managment-server.vercel.app/pasent')
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
    // console.log(findDate);



    const filteredPredictions = findDate?.prediction?.filter(prediction => {
        if (prediction.timestamp) {
            const predictionDate = new Date(prediction.timestamp).toISOString().slice(0, 10);
            return predictionDate === todayDate;
        }
        return false;
    });
    
    // filteredPredictions will contain only the predictions with today's date
    console.log(filteredPredictions);
    




    return (
        <div>


            {



                findDate.map(da =>

                    <div className='flex gap-5 text-3xl font-bold justify-center mt-5 text-center'>
                        <p>
                            কার্ড নম্বর
                        </p>
                        <p>
                            {da.patienID}
                        </p>
                        <p>
                        ডাক্তারের চেম্বারে আসেন
                          
                        </p>

                    </div>)
            }

        </div>
    );
};

export default DisplaySerial;