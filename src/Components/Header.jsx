import React from 'react'
import { Link } from 'react-router-dom'

function Header({insideDashboard}) {
  return (
    <div className='mb-5 d-flex  position-fixed top-0 w-100' style={{ width: '100%', height: '10vh', backgroundColor: '#90ee90' }}>
      <Link to={'/'} style={{ textDecoration: 'none', color: 'white' }}>
        <h1 style={{ fontSize: '30px' }} className='fw-bolder text-light mt-3 ms-5'><i class="fa-brands fa-stack-overflow fa-bounce"></i>
          Project fair</h1>
      </Link>
      {insideDashboard&& 
      <div className=' ms-auto '>
        <Link to={'/'} style={{ textDecoration: 'none', color: 'white' }}>

          <h2 style={{ fontSize: '20px' }} className='fw-bolder text-primary mt-4 me-5'>LogOut<i class="fa-solid fa-right-from-bracket fa-bounce"></i></h2>
        </Link>
      </div>
}

    </div >
  )
}

export default Header