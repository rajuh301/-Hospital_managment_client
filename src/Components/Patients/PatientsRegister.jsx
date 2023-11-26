import React from 'react';

const PatientsRegister = () => {
    const [download, setDownload] = useState('')

    useEffect(() => {
        fetch('http://localhost:5000/pasent')
            .then(res => res.json())
            .then(data => setDownload(data))
    }, [])


    console.log(download[download.length - 1]);
    return (
        <div>

        </div>
    );
};

export default PatientsRegister;