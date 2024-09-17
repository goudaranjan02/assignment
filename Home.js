import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [users, setUsers] = useState([]);
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/api/users', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    const fetchFriends = async () => {
      try {
        const response = await axios.get('/api/friends', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setFriends(response.data);
      } catch (error) {
        console.error('Error fetching friends:', error);
      }
    };

    fetchUsers();
    fetchFriends();
  }, []);

  return (
    <div>
      <h1>Home</h1>
      <div>
        <h2>Users</h2>
        {users.map(user => (
          <div key={user._id}>{user.username}</div>
        ))}
      </div>
      <div>
        <h2>Friends</h2>
        {friends.map(friend => (
          <div key={friend._id}>
            {friend.username}
            <button>Unfriend</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
