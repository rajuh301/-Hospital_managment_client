import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ShowQrCodeData = () => {

    const [viewData, setDownload] = useState()
    const { id } = useParams();
    useEffect(() => {
        fetch(`https://hospital-managment-server.vercel.app/viewData/${id}`)
            .then(res => res.json())
            .then(data => setDownload(data))
    }, [])

    return (
        <div>
           <p>{viewData?.name}</p>
        </div>
    );
};

export default ShowQrCodeData;