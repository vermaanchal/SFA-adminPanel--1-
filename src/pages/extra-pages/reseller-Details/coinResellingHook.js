import { baseURLProd } from "api/api";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';

const CoinResellingHook = () => {
  const [filter, setFilter] = useState('');
  const [userId, setUserId] = useState('');
  const [show, setShow] = useState(false)
  const handleUserIdChange = (event) => {
    setUserId(event.target.value);
  };

  const handleButtonClick = async () => {
    if (userId.length === 7) {
      setShow(true)
      try {
        const response = await fetch(`${baseURLProd}SearchResellerByUserId`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ userId: userId })
        });
        const data = await response.json();
        setFilter(data);
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };
  useEffect(() => {
    handleButtonClick()
  }, [userId])
  //----------------download CSV file-----------------//
  const downloadCSV = () => {
    // Format the data for CSV
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [
        Object.keys(filter[0]).join(','), // Header row
        ...filter.map((row) => Object.values(row).join(',')), // Data rows
      ].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "CoinReselling.csv");
    document.body.appendChild(link);
    link.click();
  };
  //  //-------------select value--------------------

  const handleChange = (e, userId) => {
    const { value } = e.target;
    const validNumberPattern = /^[0-9]*$/;
    if (!validNumberPattern.test(value)) {
      window.alert("Coin Amount should be in number only");
    }
    else if (!isNaN(value) && Number(value) <= 50000000) {
      const newData = { ...filter };
      if (newData.userId === userId) {
        newData.coinAmount = value;
      }
      setFilter(newData);
    }
    else {
      window.alert("Coin Amount can't exceed 50 Million");

    }
  };

  // //---------------Add Reseller-------------//
  const handleSubmit = async () => {

    try {
        if (!filter.userId || !filter.coinAmount) {
          alert('please enter the coin amount');
          return;
        }
      if (window.confirm("Are you sure to Add coins")) {
      await fetch(`${baseURLProd}AddResellerCoin`, {
        method: 'POST',
        body: JSON.stringify({ userId: filter.userId, coinAmount: filter.coinAmount }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
        toast.success("Reseller coin Added Succesfully")
        handleButtonClick()
      }
    }
    catch (error) {
      console.error('error', error);
    }
  }
  return {
    downloadCSV, handleSubmit,
    filter, setFilter, handleUserIdChange, handleButtonClick, userId, handleChange, show
  }
}

export default CoinResellingHook
