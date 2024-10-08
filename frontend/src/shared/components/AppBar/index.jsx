import {
  Button,
  Collapse,
  IconButton,
  Navbar,
  Typography,
} from '@material-tailwind/react';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../../../public/bidphere_logo_notext_v1.png';
import { navLinks } from '../../constants/index';
import { getUserFromToken, clearUserToken } from '../../utils/auth';

function AppBar() {
  const [openNav, setOpenNav] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    window.addEventListener(
      'resize',
      () => window.innerWidth >= 960 && setOpenNav(false),
    );

    const user = getUserFromToken();
    if (user) {
      setIsAuthenticated(true);
      setUsername(user.name || 'User');
    }
  }, []);

  const handleLogout = () => {
    clearUserToken();
    setIsAuthenticated(false);
    navigate('/signin');
  };

  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      {
        navLinks.map(link => (
          <li key={link.id}>
            <Link to={`/${link.path}`} className="link text-white">{link.title}</Link>
          </li>
        ))
      }
    </ul>
  );

  return (
    <motion.div className="mb-10">
      <Navbar
        className="top-0 z-10 h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4 bg-bsnavyblue fixed"
        blurred={false}
      >
        <div className="flex items-center justify-between text-blue-gray-900 cursor-pointer">
          <Link to="/">
            <div className="flex align-middle">
              <img className="mr-4 py-1.5 align-middle" src={Logo} alt="Logo" width="10%" />
              <Typography color="white" className="align-middle mt-3 font-bold">BidSphere</Typography>
            </div>
          </Link>
          <div className="flex items-center gap-4">
            <div className="mr-4 hidden lg:block">{navList}</div>
            <div className="flex items-center gap-x-1">
              {isAuthenticated ? (
                <>
                  <Link to="/profile">
                    <Typography color="white" className="align-middle font-bold">{username}</Typography>
                  </Link>
                  <Button
                    variant="text"
                    size="sm"
                    className="hidden lg:inline-block"
                    onClick={handleLogout}
                  >
                    <span className="text-primary-50">Logout</span>
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/signup">
                    <Button
                      variant="text"
                      size="sm"
                      className="hidden lg:inline-block"
                    >
                      <span className="text-primary-50">Sign Up</span>
                    </Button>
                  </Link>
                  <Link to="/signin">
                    <Button
                      size="sm"
                      className="hidden lg:inline-block bg-bslightgreen"
                    >
                      <span className="text-black">Sign In</span>
                    </Button>
                  </Link>
                </>
              )}
            </div>
            <IconButton
              variant="text"
              className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
              ripple={false}
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  className="h-6 w-6 text-white"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </IconButton>
          </div>
        </div>
        <Collapse open={openNav}>
          {navList}
          <div className="flex items-center gap-x-1">
            {isAuthenticated ? (
              <Button
                fullWidth
                variant="text"
                size="sm"
                onClick={handleLogout}
              >
                <span className="text-primary-50">Logout</span>
              </Button>
            ) : (
              <>
                <Link to="/signup">
                  <Button fullWidth variant="text" className="" size="sm">
                    <span className="text-primary-50">Sign Up</span>
                  </Button>
                </Link>
                <Link to="/signin">
                  <Button fullWidth size="sm" className="bg-bslightgreen">
                    <span className="text-black">Sign In</span>
                  </Button>
                </Link>
              </>
            )}
          </div>
        </Collapse>
      </Navbar>
    </motion.div>
  );
}
export default AppBar;
