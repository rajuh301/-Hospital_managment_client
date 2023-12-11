import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const AdminAccount = () => {

  const [datas, setDatas] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchData = () => {
      fetch('http://localhost:5000/pasent')
        .then((res) => res.json())
        .then((data) => setDatas(data))
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    };

    fetchData();
    const intervalId = setInterval(fetchData, 5000);
    return () => clearInterval(intervalId);
  }, []);



  let sum = datas
    .flatMap(data => data.charge)
    .map(charge => parseInt(charge))
    .filter(value => !isNaN(value))
    .reduce((acc, val) => acc + val, 0);

  // ------------------------------- Cash Section--------------------



  // --------------------------- add test charge ------------------------
  const [testMany, setTestMany] = useState([])

  useEffect(() => {
    const fetchData = () => {
      fetch('http://localhost:5000/testCharge')
        .then((res) => res.json())
        .then((data) => setTestMany(data))
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    };

    fetchData();
    const intervalId = setInterval(fetchData, 5000);
    return () => clearInterval(intervalId);
  }, []);


  let sumTest = testMany
    .map(da => parseInt(da.charge))
    .filter(value => !isNaN(value))
    .reduce((acc, val) => acc + val, 0);


    let sumOperation = datas
    .flatMap(item => item?.operation?.map(op => parseInt(op.price)))
    .filter(value => !isNaN(value))
    .reduce((acc, val) => acc + val, 0);
  

  
  // --------------------------- add test charge ------------------------




  const [cashData, setCashData] = useState([])

  useEffect(() => {
    const fetchData = () => {
      fetch('http://localhost:5000/cashout')
        .then((res) => res.json())
        .then((data) => setCashData(data))
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    };

    fetchData();
    const intervalId = setInterval(fetchData, 5000);
    return () => clearInterval(intervalId);
  }, []);


  const lastOut = cashData[cashData.length - 1];



  const formattedDateTime = lastOut ? new Date(lastOut.timestamp).toLocaleString() : '';

  const sum2 = cashData
    .map((item) => {
      const parsedValue = parseFloat(item.inputText);
      return isNaN(parsedValue) ? 0 : parsedValue;
    })
    .reduce((acc, val) => acc + val, 0);


  const showData = sum - sum2

  const showDataUpdate = showData + sumTest + sumOperation

  // -------------------------

  const [formData, setFormData] = useState({
    inputText: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: `Do you want to withdraw amount ${formData.inputText}`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, I want it!",
        cancelButtonText: "No, cancel it!",
      });

      if (sum < formData.inputText) {
        return Swal.fire({
          title: "Influence balance",
          text: `Your account balence lesthen ${formData.inputText}`,
          icon: "question"
        });
      }

      if (result.isConfirmed) {
        const response = await fetch('http://localhost:5000/cashout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          await Swal.fire({
            title: "Done!",
            text: "Your request has been processed.",
            icon: "success"
          });
          console.log('Form data submitted successfully!');
          // window.location.reload();
        } else {
          console.error('Form submission failed!');
        }
      } else {
        // User clicked cancel, handle accordingly (maybe show a message)
        console.log('User canceled the operation.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };


  // ------------------------------- Cash Section--------------------
  // ----------------------------- Doctor Salary Section ---------------------

  // ------------------------------- Cash Sent functions -----------------
  const [inputValues, setInputValues] = useState({});
  const [selectedDoctorData, setSelectedDoctorData] = useState(null);


  const handleInputChange = (value) => {
    setInputValues(value)

  };

  const handleMoneySubmit = () => {
    const datasss = inputValues;
    const doctorEmail = selectedDoctorData.email;
    const doctorName = selectedDoctorData.name;


    const url = 'http://localhost:5000/cashout';


    const dataToSend = {
      inputText: datasss,
      doctorName: doctorName,
      doctorEmail: doctorEmail
    };

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',

      },
      body: JSON.stringify(dataToSend),
    })
      .then(response => {

        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Network response was not ok.');
        }
      })
      .then(data => {

        console.log('Data sent successfully:', data);
      })
      .catch(error => {

        console.error('There was a problem sending the data:', error);
      });
  };




  // ------------ Histery-------------------
  const formatDate = timestamp => {
    const date = new Date(timestamp);
    return date.toLocaleString(); // Adjust format as needed
  };

  const histery = cashData?.map(histery => (
    <div className='flex justify-between shadow border mx-7 mt-3' key={histery.id}>
      <p className='w-40 font-bold'>Name : {histery.doctorName ? histery.doctorName : "ADMIN"} </p>

      <p className='w-52'>Email : {histery.doctorEmail ? histery.doctorEmail : "ADMIN EMAIL"}</p>
      <p className='w-20'>Amount: {histery.inputText} </p>
      <p className='w-52'>Date: {formatDate(histery.timestamp)}</p>

    </div>
  ));

  // ------------ Histery-------------------







  const handleCashaSent = (id) => {
    document.getElementById('my_modal_1').showModal();
    const doctorData = doctors.find(da => da._id === id);
    setSelectedDoctorData(doctorData);


  }
  // ------------------------------- Cash Sent functions -----------------



  const [doctors, setDoctors] = useState([]);



  useEffect(() => {
    fetch('http://localhost:5000/doctors')
      .then((res) => res.json())
      .then((data) => setDoctors(data));
  }, []);



  const allData = doctors?.map(doctor => (
    <div className='flex justify-between shadow border mx-7 mt-3' key={doctor.id}>
      <p className='w-40 font-bold'>Name: {doctor.name}</p>
      <p className='w-40 '>Specialty: {doctor.specialty}</p>
      <p className='w-40'>Email: {doctor.email}</p>
      <p className='w-40'>Description: {doctor.description}</p>
      <button className="btn" onClick={() => handleCashaSent(doctor._id)}>Sent Salary</button>
    </div>
  ));


  // ----------------------------- Doctor Salary Section ---------------------


  return (
    <div className='md:grid grid-cols-3 gap-10'>

      <div className='w-3/3 h-48 shadow mt-10 mx-10 border text-center rounded'>

        <p className='text-3xl p-5 text-center font-bold'>Main Blance: {showDataUpdate}</p>

        <form onSubmit={handleSubmit}>
          <input
            type="number"
            name="inputText"
            placeholder="Input amout to cash out"
            className="input input-bordered input-info w-full max-w-xs"
            value={formData.inputText}
            onChange={handleChange}
          />
          <button className='btn btn-outline btn-success mt-1' type="submit">
            Cash Out
          </button>
        </form>
      </div>


      <button onClick={() => document.getElementById('my_modal_5').showModal()}>
        <div className='w-3/3 h-48 shadow mt-10 mx-10 border text-center rounded'>
          <p className='text-3xl font-bold p-5'>Last Cash Out</p>
          <p className='text-3xl p-5 text-center font-bold'>{lastOut?.inputText}</p>
          <p>{formattedDateTime}</p>
        </div>
      </button>


      <button className="btn w-3/3 h-48 shadow mt-10 mx-10 border text-center rounded" onClick={() => document.getElementById('my_modal_4').showModal()}>
        <div >
          {/* <p className='text-3xl font-bold p-5 underline'>Doctor Salary</p> */}
          <p className='text-3xl px-5 text-center font-bold'>Click here to sent doctor Salary</p>

        </div>
      </button>



      {/* ----------------------------------- */}


      <dialog id="my_modal_4" className="modal">
        <div className="modal-box w-11/12 max-w-7xl">
          <h3 className="font-bold text-lg">Doctor Info!</h3>



          {/* ----------------------- Main content------------------------ */}
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
              </thead>
              <tbody>
                {/* row 1 */}
                <tr className="bg-base-200">


                  {allData}


                </tr>

              </tbody>
            </table>
          </div>

          {/* ----------------------- Main content------------------------ */}



          <div className="modal-action">
            <form method="dialog">

              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
      {/* ----------------------------------- */}

      {/* ---------------- second modal---------------- */}
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">{selectedDoctorData?.name}</h3>



          {/* -------------------- content----------------- */}

          <form onSubmit={handleMoneySubmit} action="">
            <input
              type="number"
              placeholder="Input Amount"
              className="input input-bordered input-info w-full max-w-xs"
              onChange={(e) => handleInputChange(e.target.value)}
            />
            <button className='btn btn-warning' type="submit">Sent Money</button>
          </form>
          {/* -------------------- content----------------- */}



          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
      {/* ---------------- second modal---------------- */}

      {/* -------------------- Third Modal ----------------- */}
      <dialog id="my_modal_5" className="modal">
        <div className="modal-box w-11/12 max-w-7xl">
          <h3 className="font-bold text-lg">Transaction history!</h3>



          {/* ----------------------- Main content------------------------ */}
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
              </thead>
              <tbody>
                {/* row 1 */}
                <tr className="bg-base-200">


                  {histery}





                </tr>

              </tbody>
            </table>
          </div>

          {/* ----------------------- Main content------------------------ */}



          <div className="modal-action">
            <form method="dialog">

              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>

      {/* -------------------- Third Modal ----------------- */}

    </div>
  );
};

export default AdminAccount;