import React, { useState } from 'react';

export default function Auth(props) {
  const [page, setPage] = useState('login')

  if(page === 'login') {
    return (
      <div className="container">

      </div>
    )
  } else {
    return (
      <div className="container">

      </div>
    )
  }
}
