import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ShowPatienData = () => {

    const [download, setDownload] = useState()
    const { id } = useParams();
    useEffect(() => {
        fetch(`http://localhost:5000/pasent`)
            .then(res => res.json())
            .then(data => setDownload(data))
    }, [])
    console.log(id)

    const findData = download?.find(dat => dat._id === id);

    console.log(findData)



    return (
        <div>
            <p>{findData?.name}</p>
            <p>{findData?.age}</p>
            <p>{findData?.problem}</p>
            <p>{findData?.referral}</p>
            <p>{findData?.type}</p>
        </div>
    );
};

export default ShowPatienData;