
import { baseURLProd } from "api/api";
import { useEffect, useState } from "react";


const ReceivingReportHook = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState([])
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const fetchData = async () => {
    try {
      let req = await fetch(`${baseURLProd}HostReceivingRecord`, {
        method: "GET",
        'Content-Type': 'application/json',

      })
      const res = await req.json();
      setData(res.hostReceivingList);
      setFilter(res.hostReceivingList)

    }
    catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const result = data.filter((item) => {
      return item.userId.toLowerCase().match(search.toLocaleLowerCase())
    })
    setFilter(result)
  }, [search])

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
    link.setAttribute("download", "Receivingreport.csv");
    document.body.appendChild(link);
    link.click();
  };

  //-----------------date picker---------------//
  const handleFilter = () => {
    const filtered = data.filter(item => {
      const parts = item.date.split('-');
      const day = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1;
      const year = parseInt(parts[2], 10);

      const date = new Date(year, month, day);

      let from = fromDate ? new Date(fromDate) : null;
      let to = toDate ? new Date(toDate) : null;

      if (from) {
        from.setHours(0, 0, 0, 0);
      }
      if (to) {
        to.setHours(23, 59, 59, 999);
      }
      return (!from || date >= from) && (!to || date <= to);
    });

    setFilter(filtered);
  };

  const handleAdminRecieving = async () => {
    window.location.href = `/AdminReport`;
  };

  const handleAgencyRecieving = async () => {
    window.location.href = `/AgencyReport`;
  };
  const handleReset = () => {
    if (fromDate && toDate) {
      setFromDate("")
      setToDate("")
    }
    else {
      setSearch('');
      setFilter(data);
    }
  }

  return {
    filter, search, setSearch, downloadCSV, handleFilter, fromDate, toDate, setFromDate, setToDate,
    handleAdminRecieving, handleAgencyRecieving, handleReset, data
  }
}

export default ReceivingReportHook
