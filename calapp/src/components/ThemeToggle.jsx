import { Switch } from '@mui/material';
import { DarkMode, LightMode } from '@mui/icons-material';

const ThemeToggle = ({ darkMode, setDarkMode }) => {
  return (
    <div className="theme-toggle">
      <LightMode />
      <Switch 
        checked={darkMode} 
        onChange={() => setDarkMode(!darkMode)} 
        color="default"
      />
      <DarkMode />
    </div>
  );
};

export default ThemeToggle;