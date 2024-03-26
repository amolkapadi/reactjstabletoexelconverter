import React, { useState, useEffect } from 'react';
import './App.css';
import * as XLSX from 'xlsx';

export default function App() {
  const [user, setUser] = useState([]);

  const userData = async () => {
    const result = await fetch('https://jsonplaceholder.typicode.com/users');
    const res = await result.json();
    setUser(res);
  };

  useEffect(() => {
    userData();
  }, []);

  const exportToExcel = () => {
    const filteredUserData = user.map(({ name, username, email, phone, website }) => ({
      Name: name,
      Username: username,
      Email: email,
      Phone: phone,
      Website: website
    }));

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(filteredUserData);
    XLSX.utils.book_append_sheet(wb, ws, 'Users');
    XLSX.writeFile(wb, 'user_data.xlsx');
  };

  return (
    <div className='container'>
      <div className='main'>
        <h1>All user Data</h1>
        <button className='btn' onClick={exportToExcel}>Convert to Excel</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Website</th>
          </tr>
        </thead>
        <tbody>
          {user.map((userData) => (
            <tr key={userData.id}>
              <td>{userData.name}</td>
              <td>{userData.username}</td>
              <td>{userData.email}</td>
              <td>{userData.phone}</td>
              <td>{userData.website}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
