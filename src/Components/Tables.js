import DataTable from 'react-data-table-component'
import React, { useEffect } from 'react';
import axios from "axios";
import { useState } from 'react';



const Tables = () => {
  const [user, setUser] = useState([]);
  const [search, setSearch] = useState("");
  const [filteruser, setFilter] = useState([]);
  const [loading,setLoading]= useState(false)


  const getUsers = async () => {
    setLoading(true)
    try {
      const response = await axios.get('https://random-data-api.com/api/v2/users?size=100&is_xml=true');
      setUser(response.data)
      setFilter(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const columns = [
    {
      name: "First Name",
      selector: (row) => row.first_name,
    },
    {
      name: "Last Name",
      selector: (row) => row.last_name,
    },
    {
      name: "Gender",
      selector: (row) => row.gender,
    },
    {
      name: "Phone Number",
      selector: (row) => row.phone_number,
    },
    {
      name: "Email",
      selector: (row) => row.email,
    },
    {
      name: "Action",
      cell: row => <button className='btn btn-primary' onClick={() => ((""))}>Delete</button>
    },

  ]



  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    const result = user.filter((use) =>{
      return use.email.toLowerCase().match(search.toLowerCase())
    })
    setFilter(result)
  }, [])




  return (
    <DataTable columns={columns} data={filteruser}
    bordered loading={loading}
      pagination highlightOnHover
      subHeader subHeaderComponent={<input type="text" placeholder='Search...' className='w-50 form-control' />}
      subHeaderAlign="center" value={search} onChange={(e) => setSearch(e.target.value)} />
  )

}

export default Tables