import { baseURLProd } from "api/api"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

const AssignRoleHook = () => {
    const [data, setData] = useState([])
    const [search, setSearch] = useState('')
    const [filter, setFilter] = useState([])
    const [roleId, setRoleId] = useState([])
    const [userValue,setUserValue] =useState("")
    const fetchData = async () => {
        try {
            let req = await fetch(`${baseURLProd}GetAssignedRoleDetails`, {
                method: "GET",
                'Content-Type': 'application/json',
            })
            const res = await req.json()
            setData(res.getAssignedRoleList)
            setFilter(res.getAssignedRoleList)
        }
        catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        fetchData()
    }, [])

    useEffect(() => {
        const result = data.filter((item) => {
          return item.userId.toLowerCase().match(search.toLocaleLowerCase())
        })
        setFilter(result)
      }, [search])

    //-------------select value--------------------
    const handleSelectChange = (e) => {
        setRoleId(e.target.value)
    };

    //---------------Assign Role-------------//
    const handleAssignRole = async () => {

        try {
          const req = await fetch(`${baseURLProd}AssignRoles`, {
                method: 'POST',
                body: JSON.stringify({
                    roleId: roleId,
                    userId: userValue
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const res = await req.json()
            if(res.status == false){
            toast.error(res.message)
            }
            else{
                toast.success("Role assigned Successfully")
                setUserValue("")
                setRoleId("")
                fetchData()
            }
        }
        catch (error) {
            console.error('error', error);
        }
    }
    const handleRemove = async (userId) => {
        await fetch(`${baseURLProd}RemoveUserRoles`, {
            method: "POST",
            body: JSON.stringify({ userId: userId }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const newData = data.filter(row => !(row.userid === userId));
        setFilter(newData);
        fetchData();
        toast.success("Role Removed successfully")
    }
    return {
         roleId, handleSelectChange,search,setSearch,filter,setUserValue,userValue
        , handleAssignRole,handleRemove
    }
}

export default AssignRoleHook
