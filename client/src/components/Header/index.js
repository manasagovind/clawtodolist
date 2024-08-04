import {Link, useNavigate} from 'react-router-dom'

import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
    const navigate=useNavigate()
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    navigate("/login")
  }
  return (
    <nav className="nav-header">
      <div className="nav-content">
        <Link to="/">
          <img
            className="website-logo"
            src="https://media.licdn.com/dms/image/C560BAQGA6UwLhRuXhQ/company-logo_200_200/0/1656262509168?e=1730937600&v=beta&t=czxt1mx-Uzm5PAG30SrKF0j81J8YdIm2eVPQb_mFl9c"
            alt="website logo"
          />
        </Link>
       
        <button
          type="button"
          className="logout-desktop-btn"
          onClick={onClickLogout}
        >
          Logout
        </button>
        </div>
     
    </nav>
  )
}
export default Header