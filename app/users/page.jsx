import React from 'react';

const Users = async () => {
    const data = await (await fetch('https://dummyjson.com/users')).json();
  return (
    <div>
      {
        data.users.map(user => <span key={user.id}>{user.firstName}</span>)
      }
    </div>
  );
}

export default Users;