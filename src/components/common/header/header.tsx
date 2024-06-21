import { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove token and user data from local storage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    
    navigate('/'); 
  };

  return (
    <Fragment>
      <header className="app-header">
        <div className='d-flex justify-content-end mx-4 mt-2'>
          <div className="d-flex flex-sm-row">
            <button 
              onClick={handleLogout}
              className="btn btn-danger btn-sm text-nowrap mt-2"
              type="button"
            >
              Logout
            </button>
          </div>
        </div>
      </header>
    </Fragment>
  );
}

export default Header;
