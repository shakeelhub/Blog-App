import React,{useState,useEffect} from 'react'
import 'bootstrap-icons/font/bootstrap-icons.css'

const DarkModeToggle = () => {
    const [darkMode, setDarkMode] = useState(false);

    const handleToggle = () => {
      setDarkMode(!darkMode);
    };

    useEffect(() => {
        // Update the body class based on darkMode state
        document.body.className = darkMode ? 'dark' : 'light';
      }, [darkMode]);

  return (
    <div className={`app ${darkMode ? 'dark' : 'light'}`} style={{paddingTop:'8px',paddingLeft:'4px'}}>
    <i 
      className={`bi ${darkMode ? 'bi-moon' : 'bi-brightness-high-fill'}`} 
      id="toggleDark" 
      onClick={handleToggle}
    ></i>
  </div>
  )
}

export default DarkModeToggle