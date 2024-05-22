import { baseURLProd } from "api/api";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';

const AddDeductBeanHook = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState([])
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [newSearchData, setNewSearchData] = useState([])

  //---------------fetch data---------------//
  const fetchData = async () => {
    try {
      let req = await fetch(`${baseURLProd}Add_DeductBeansUserDetails`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ adminId: '123456' }),
      });

      const res = await req.json();
      setData(res.addDeductCoinList);
      setFilter(res.addDeductCoinList);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleFileChange = (event) => {
    setSelectedFiles(event.target.files);
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) {
      alert('Please select files to upload');
      return;
    }

    const formData = new FormData();
    for (const file of selectedFiles) {
      formData.append('file', file);
    }

    try {
      const response = await fetch(`${baseURLProd}ExcelUpload`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      toast.success(data.message)
      setSelectedFiles("")
      fetchData()
    } catch (error) {
      console.error('Error uploading files:', error);
    }
  };
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
              const req = await fetch(`${baseURLProd}SearchByUserIdBean`, {
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


  //----------------download CSV file-----------------//
  const downloadCSV = () => {
    // Format the data for CSV
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [
        Object.keys(filter[0]).join(','),
        ...filter.map((row) => Object.values(row).join(',')),
      ].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "data.csv");
    document.body.appendChild(link);
    link.click();
  };

  //-------------select value--------------------
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

  //---------------add beans-------------//
  const handleSubmit = async () => {
    try {
      for (const row of filter) {
        if (row.userId && row.amount) {
          await fetch(`${baseURLProd}AddBean`, {
            method: 'POST',
            body: JSON.stringify({ userId: row.userId, beanAmount: row.amount }),
            headers: {
              'Content-Type': 'application/json'
            }
          });
        }
      }
      if (window.confirm("Are you sure to add beans")) {
        toast.success("Beans Added successfully");
        fetchData();
      }
    } catch (error) {
      console.error('Error adding beans coins:', error);
    }
  }

  //---------------add beans-------------//
  const handleDeductBean = async () => {
    try {
      for (const row of filter) {
        if (row.userId && row.amount) {
          await fetch(`${baseURLProd}DeductBean`, {
            method: 'POST',
            body: JSON.stringify({ userId: row.userId, beanAmount: row.amount }),
            headers: {
              'Content-Type': 'application/json'
            }
          });
        }
      }
      if (window.confirm("Are you sure to deduct beans")) {
        toast.success("Beans deducted successfully");
        fetchData();
      }
    } catch (error) {
      console.error('Error adding beans coins:', error);
    }
  }

  return {
    filter, search, setSearch, downloadCSV, setFilter, handleSubmit,
    selectedFiles, handleFileChange, handleUpload, handleChange, handleDeductBean, newSearchData
  }
}

export default AddDeductBeanHook
