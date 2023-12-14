import React from 'react';

const PatientsRegister = () => {
    const [download, setDownload] = useState('')


    useEffect(() => {
        const fetchData = () => {
            fetch('https://hospital-managment-server.vercel.app/pasent')
                .then((res) => res.json())
                .then((data) => setDownload(data))
                .catch((error) => {
                    console.error('Error fetching data:', error);
                });
        };

        fetchData();
        const intervalId = setInterval(fetchData, 1000);
        return () => clearInterval(intervalId);
    }, []);




    console.log(download[download.length - 1]);
    return (
        <div>

        </div>
    );
};

export default PatientsRegister;