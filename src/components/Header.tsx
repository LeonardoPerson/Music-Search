import React from 'react'

const Header = () => {
  return(
    <header id="navbar" className="nav">
      <div className="nav-list">
        <div>
          <a href="#about-section">About</a>
        </div>
        <div>
          <a href="#music">Songs</a>
        </div>
        <div>
          <a href="#contact">Contact</a>
        </div>
      </div>
    </header>  
  )
}

export default Header