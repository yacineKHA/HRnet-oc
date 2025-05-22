import { Link } from "react-router";
import './header.css'

const Header = () => {

    return (
        <div className="header-container">
            <h2>HRnet</h2>
            <nav className="header-nav">
                <Link to='/'>Home</Link>
                <Link to='/employee-list'>Current Employees</Link>
            </nav>
        </div>
    )
}

export default Header;