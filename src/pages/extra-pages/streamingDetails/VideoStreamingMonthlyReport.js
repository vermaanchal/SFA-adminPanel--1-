import MainCard from 'components/MainCard';
import {
    Grid, Button,
    InputLabel, FormControl, Select, MenuItem
} from '@mui/material';
import DataTable from 'react-data-table-component';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import { ToastContainer } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { baseURLProd } from 'api/api';
const VideoStreamingMonthlyReport = () => {

    const params = useParams()
    const [data, setData] = useState([]);
    const [selectedMonth, setSelectedMonth] = useState('');
    const [filter, setFilter] = useState([])
    //---------------fetch data---------------//
    const fetchData = async () => {
        try {
            let req = await fetch(`${baseURLProd}UserMonthlyVideoStreamingDetails`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json' // Set Content-Type header here
                },
                body: JSON.stringify({ userId: params.userId }),
            });

            const res = await req.json();
            setData(res.monthlyUserAudioStreamingList);
            setFilter(res.monthlyUserAudioStreamingList)

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleBack = () => {
        window.location.assign('/videostreaming')
    }
    //--------------------filter------------------//
    // useEffect(() => {
    //     const result = data.filter((item) => {
    //         return item.userId.toLowerCase().match(search.toLocaleLowerCase())
    //     })
    //     setFilter(result)
    // }, [search])
    const filterDataByMonth = () => {
        if (!selectedMonth) {
            return data;
        } else {
            return data.filter(item => {
                const itemMonth = item.date.split('-')[1];
                return itemMonth === selectedMonth;
            });
        }
    };

    const filteredData = filterDataByMonth();

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
        link.setAttribute("download", "videoStreaming_monthlyreport.csv");
        document.body.appendChild(link);
        link.click();
    };
    const column = [
        {
            name: "User Id",
            cell: row => <div className="custom-cell">{row.userId}</div>,
        },
        {
            name: "Status",
            // selector: id,
            cell: row => <div className="custom-cell">{row.isLive}</div>,
        },
        {
            name: "Date",
            // selector: id,
            cell: row => <div className="custom-cell">{row.date}</div>,
        },
        {
            name: "Live Start Time",
            // selector: id,
            cell: row => <div className="custom-cell">{row.liveStartTime}</div>,
        },
        {
            name: "Live End Time",
            // selector: id,
            cell: row => <div className="custom-cell">{row.liveEndTime}</div>,
        }, {
            name: "Live Duration",
            // selector: id,
            cell: row => <div className="custom-cell">{row.liveDUration}</div>,
        }, {
            name: "Valid Day",
            // selector: id,
            cell: row => <div className="custom-cell">{row.isValidDay}</div>,
        },
    ]
    const tableHeaderStyle = {
        headCells: {
            style: {
                fontWeight: "bold",
                fontSize: "0.875rem",
                backgroundColor: "rgba(241,244,249,255)",
            },
            head: {
                style: {
                    borderTopLeftRadius: '10px',
                    borderTopRightRadius: '10px',
                }
            },
            cells: {
                style: {
                    fontSize: "0.875rem",
                    fontFamily: "'Public Sans',sans-serif"
                }
            }
        }
    }

    return (

        <MainCard title="User Today Report">
            <Grid item xs={12} md={12} lg={12}>
                <Grid >
                    <ToastContainer />
                </Grid>
                <div><button className='btn btn-primary mb-3' style={{ backgroundColor: '#EF9848', border: '0px' }} onClick={handleBack}>Back</button></div>
                <div className='text-end'>
                    <DataTable columns={column} data={filteredData} fixedHeader customStyles={tableHeaderStyle} className='data-table'
                        pagination
                        subHeader
                        subHeaderComponent={
                            <>
                                <div className='d-flex justify-content-between'>
                                    <div className='d-flex'>
                                        <FormControl className='designationForm'>
                                            <InputLabel id="select-label">Select Month</InputLabel>
                                            <Select
                                                labelId="select-label"
                                                label='Select Role'
                                                id="select"
                                                value={selectedMonth}
                                                onChange={(e) => setSelectedMonth(e.target.value)}
                                                className='selectDiv'
                                            >
                                                <MenuItem>All Month</MenuItem>
                                                <MenuItem value="01">January 2023</MenuItem>
                                                <MenuItem value="02">February 2023</MenuItem>
                                                <MenuItem value="03">March 2023</MenuItem>
                                                <MenuItem value="04">April 2023</MenuItem>
                                                <MenuItem value="05">May 2023</MenuItem>
                                                <MenuItem value="06">June 2023</MenuItem>
                                                <MenuItem value="07">July 2023</MenuItem>
                                                <MenuItem value="08">August 2023</MenuItem>
                                                <MenuItem value="09">September 2023</MenuItem>
                                                <MenuItem value="10">October 2023</MenuItem>
                                                <MenuItem value="11">November 2023</MenuItem>
                                                <MenuItem value="12">December 2023</MenuItem>
                                                <MenuItem value="01">January 2024</MenuItem>
                                                <MenuItem value="02">February 2024</MenuItem>
                                                <MenuItem value="03">March 2024</MenuItem>
                                                <MenuItem value="04">April 2024</MenuItem>
                                                <MenuItem value="05">May 2024</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </div>
                                    <div>
                                        <Button className='csvDiv' onClick={downloadCSV} >Download<FileDownloadOutlinedIcon style={{ color: '#EF9848' }} /></Button>
                                    </div>
                                </div>
                            </>
                        }
                    />
                </div>
            </Grid>
        </MainCard>
    )
};

export default VideoStreamingMonthlyReport;





