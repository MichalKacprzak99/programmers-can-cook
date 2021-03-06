import React, { useState, useEffect} from 'react';
import { Table} from './UsersControllers.css';

const UsersController = () => {
  const [usersData, setUsersData] = useState(null)

  const getUsersInfo = async() => {
    const url = 'https://data-base-api.herokuapp.com/admin/get_users';
    const response = await fetch(url,{
        method: 'POST',
        credentials: 'omit',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({"token": localStorage.getItem('admin-token')})
    });
    if(response.status !== 200) {
      setUsersData(false)
    } else {
      setUsersData(await response.json())
    }
  }

  const handleBlocking = async(e, toBlock) => {
    const url = 'https://data-base-api.herokuapp.com/admin/user_blocking';
    const response = await fetch(url,{
        method: 'POST',
        credentials: 'omit',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({"token": localStorage.getItem('admin-token'), "user_id": Number(e.target.id), "toBlock": toBlock})
    });
    if(response.status === 200) {
      getUsersInfo();
    } 
}

  useEffect(() => {
    if(!usersData){
      getUsersInfo()
    } 
  },[]);

  const renderTableHeader = () => {
    if(usersData!= null){
      let header = Object.keys(usersData[0])
      header.push("Blokowanie")
      return header.map((key, index) => {
         return <th key={index}>{key.toUpperCase()} </th>
      })
    }
  }

  const renderTableData = () => {
    if(usersData!=null){
      return usersData.map((user) => {
        const { id_uzytkownika, pseudonim, email, zablokowany } = user 
        return (
          <tr key={id_uzytkownika}>
              <td>{id_uzytkownika}</td>
              <td>{pseudonim}</td>
              <td>{email}</td>
              <td>{zablokowany ? "TAK" : "NIE"}</td>
              <td><button id={id_uzytkownika} onClick={(e) => handleBlocking(e,!zablokowany)}>{zablokowany ? "Odblokuj"  : "Zablokuj"}</button></td>
          </tr>
        )
      })
    } 
  }

    return (
      <>
        <Table>
          <thead>
            <tr>{renderTableHeader()}</tr>
          </thead>
            <tbody>  
              {renderTableData()}
            </tbody>
        </Table>
      </>

        )
}
export default UsersController;