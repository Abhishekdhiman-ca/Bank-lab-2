import React, { useState, useEffect } from 'react';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [users, setUsers] = useState([]);
  const [lastAccountNumber, setLastAccountNumber] = useState(4711);

  const url = "https://json-storage-api.p.rapidapi.com/datalake";
  const headers = {
    "content-type": "application/json",
    "X-RapidAPI-Key": "737b5b8023msh5dc8759b04faf33p1be655jsn98f86fc2f298",
    "X-RapidAPI-Host": "json-storage-api.p.rapidapi.com",
  };

  useEffect(() => {
    loadUsers();
    getLastAccountNumber();
  }, []);

  const loadUsers = async () => {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          '@context': [
            'http://schema4i.org/Thing.jsonld',
            'http://schema4i.org/Action.jsonld',
            'http://schema4i.org/SearchAction.jsonld'
          ],
          '@type': 'SearchAction',
          Object: {
            '@context': [
              'http://schema4i.org/Thing.jsonld',
              'http://schema4i.org/Filter',
              'http://schema4i.org/DataLakeItem',
              'http://schema4i.org/UserAccount'
            ],
            '@type': 'Filter',
            FilterItem: {
              '@type': 'DataLakeItem',
              Creator: {
                '@type': 'UserAccount',
                Identifier: 'USERID-4715'
              }
            }
          }
        })
      });
      const data = await response.json();
      setUsers(data.Result.ItemListElement.map(item => item.Item));
    } catch (error) {
      console.error('Error loading users:', error);
    }
  };

  const getLastAccountNumber = async () => {
    try {
      const response = await fetch('https://your-api.com/last-account-number');
      const data = await response.json();
      setLastAccountNumber(data.lastAccountNumber);
    } catch (error) {
      console.error('Error fetching last account number:', error);
    }
  };

  const handleSignup = async () => {
    try {
      const newAccountNumber = lastAccountNumber + users.length + 1;

      const response = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          '@context': [
            'http://schema4i.org/Thing.jsonld',
            'http://schema4i.org/Action.jsonld',
            'http://schema4i.org/CreateAction.jsonld'
          ],
          '@type': 'CreateAction',
          Result: {
            '@context': [
              'http://schema4i.org/DataLakeItem.jsonld',
              'http://schema4i.org/UserAccount.jsonld',
              'http://schema4i.org/OfferForPurchase.jsonld',
              'http://schema4i.org/Offer.jsonld',
              'http://schema4i.org/Organization.jsonld',
              'http://schema4i.org/PostalAddress.jsonld'
            ],
            '@type': 'DataLakeItem',
            Name: username,
            Creator: {
              '@type': 'UserAccount',
              Identifier: 'USERID-4715',
            },
            About: {
              '@type': 'Organization',
              Email: email,
              Password: password,
              AccountNumber: newAccountNumber
            }
          }
        })
      });
      await response.text();
      setUsername('');
      setEmail('');
      setPassword('');
      setErrorMessage('');
      loadUsers();
    } catch (error) {
      console.error('Error signing up:', error);
      setErrorMessage('Error signing up. Please try again.');
    }
  };

  return (
    <div className="signup-area container mt-5">
      <h1>Signup</h1>
      <div className="form-group">
        <input className="form-control" type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div className="form-group">
        <input className="form-control" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div className="form-group">
        <input className="form-control" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button className="btn btn-primary themebutton" onClick={handleSignup}>Signup</button>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <div className="mt-4">
        <h2>Registered Users:</h2>
        <ul>
          {users.map((user, index) => (
            <li key={index}>{user.Name} - {user.About.Email}- {user.About.Password} - {user.About.AccountNumber}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Signup;
