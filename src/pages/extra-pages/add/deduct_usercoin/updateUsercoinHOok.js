
import { baseURLProd } from "api/api";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";


const UpdateUsercoinHook = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState([])
  const [newSearchData, setNewSearchData] = useState([])

  const fetchData = async () => {
    try {
      let req = await fetch(`${baseURLProd}Add_DeductCoinUserDetails`, {
        method: "GET",
        'Content-Type': 'application/json',

      })
      const res = await req.json();
      setData(res.addDeductCoinList);
      setFilter(res.addDeductCoinList)

    }
    catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchData();
  }, []);
  //--------------------filter------------------//

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (search) {
        const uniqueResults = data.filter((item, index, self) =>
          index === self.findIndex(t => t.userId.toLowerCase() === item.userId.toLowerCase())
        ).filter((item) =>
          item.userId.toLowerCase().includes(search.toLowerCase())
        );

        setFilter(uniqueResults);
        let aggregatedResults = [];
        try {
          for (const row of uniqueResults) {
            if (row.userId) {
              const req = await fetch(`${baseURLProd}SearchByUserIdCoinAmount`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userId: row.userId })
              });
              const result = await req.json();
              aggregatedResults.push(result);
            }
          }
          setNewSearchData(aggregatedResults);
        } catch (error) {
          console.log(error)
        }
      } else {
        setFilter(data);
        setNewSearchData([]);
      }
    };

    fetchSearchResults();
  }, [search, data]);

  const downloadCSV = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [
        Object.keys(filter[0]).join(','), // Header row
        ...filter.map((row) => Object.values(row).join(',')), // Data rows
      ].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "data.csv");
    document.body.appendChild(link);
    link.click();
  };

  const handleChange = (e, userId) => {
    const { value } = e.target;
    const newData = newSearchData.map(item => {
      if (item.userId === userId) {
        return { ...item, amount: value };
      }
      return item;
    });
    setFilter(newData);
    setNewSearchData(newData);
  };
  //  const handleChange = (e, userId) => {
  //   const { value } = e.target;
  //   const newData = { ...filter };
  //   if (newData.userId === userId) {
  //     newData.amount = value;
  //   }
  //   setNewSearchData(newData);
  // };
  //---------------add Coin-------------//
  const handleSubmit = async () => {
    try {
      for (const row of newSearchData) {
        if (row.userId && row.amount) {
          await fetch(`${baseURLProd}AddCoinAmount`, {
            method: 'POST',
            body: JSON.stringify({ userId: row.userId, coinAmount: row.amount }),
            headers: {
              'Content-Type': 'application/json'
            }
          });
        }
      }
      if (window.confirm("Are you sure to add Coins")) {
        toast.success("Coins Added successfully");
        fetchData();
      }
    } catch (error) {
      console.error('Error adding beans coins:', error);
    }
  }

  //---------------deduct beans-------------//
  const handleDeductCoin = async () => {
    try {
      for (const row of newSearchData) {
        if (row.userId && row.amount) {
          await fetch(`${baseURLProd}DeductCoinAmount`, {
            method: 'POST',
            body: JSON.stringify({ userId: row.userId, coinAmount: row.amount }),
            headers: {
              'Content-Type': 'application/json'
            }
          });
        }
      }
      if (window.confirm("Are you sure to deduct Coins")) {
        toast.success("Coins deducted successfully");
        fetchData();
      }
    } catch (error) {
      console.error('Error adding beans coins:', error);
    }
  }
  return {
    filter, search, setSearch, downloadCSV, handleChange, handleSubmit, handleDeductCoin
    , newSearchData, data, setFilter, setNewSearchData
  }
}

export default UpdateUsercoinHook
