import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faX, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar({ history }) {
  const [toggle, setToggle] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate() // Instead of useHistory

  const onToggleMenu = () => {
    setToggle(!toggle);
  };

  const handleSearch = async () => {
    try {
      navigate(`/search?q=${searchQuery}`); // Instead of history.push
    } catch (error) {
      console.error('Error searching articles:', error);
    } finally {
      setSearchQuery(''); // Clear the search box
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setToggle(false)
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, [])
  
  return (
    <header className="bg-white min-h-fit h-[15%]">
        <nav className="flex justify-between items-center w-[92%] mx-auto h-full">
            <div>
                <h1 className='w-36 font-bold text-3xl cursor-pointer'>Blog Page</h1>
            </div>
            <div
          className={`nav-links duration-500 md:static absolute bg-white md:min-h-fit min-h-[50vh] left-0 ${toggle === true ? 'top-[15%]' : 'top-[-100%]'} md:w-auto  w-full flex items-center px-5`}>
                <ul className="flex md:flex-row flex-col md:items-center md:gap-[4vw] gap-8">
                    <li>
                        <Link className="hover:text-gray-500" to="/">Home</Link>
                    </li>
                    <li>
                        <Link className="hover:text-gray-500" to="/blog">Blog</Link>
                    </li>
                    <li>
                         <Link className="hover:text-gray-500" to="/Categories">Categories</Link>
                     </li>
                    <li>
                        <Link className="hover:text-gray-500" to="/">Contact Us</Link>
                    </li>
                </ul>
            </div>
            <div className="flex items-center gap-6">
          {/* Search box */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                    handleSearch();
                }
              }}
              className="border rounded-md py-1 px-3 focus:outline-none focus:border-blue-500"
            />
            <FontAwesomeIcon icon={faSearch} className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500" />
          </div>
          </div>
            <div className="flex items-center gap-6">
          <button className="bg-blue-800 text-white px-5 py-2 rounded-full hover:bg-blue-900">Sign in</button>
          {
            toggle === false ?
              <FontAwesomeIcon icon={faBars} className='text-3xl cursor-pointer md:hidden' onClick={onToggleMenu} /> :
              <FontAwesomeIcon icon={faX} className='text-3xl cursor-pointer md:hidden' onClick={onToggleMenu} />   
          }
        </div>
      </nav>
    </header>
  )
}