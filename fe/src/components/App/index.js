import { ThemeProvider } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';
import { useState } from 'react';
import themes from '../../assets/styles/themes';
import colors from '../../assets/styles/themes/default';

import GlobalStyle from '../../assets/styles/global';
import { Container } from './styles';
import { Header } from '../Header';

import Routes from '../../Routes';
import { ToastContainer } from '../Toast/ToastContainer';
import NavBar from '../NavBar';

function App() {
  const [theme, setTheme] = useState('light');

  function handleToggleTheme() {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  }

  const defaultTheme = {
    colors,
    mode: themes[theme] || themes.light,
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <GlobalStyle />
        <Container>
          <ToastContainer />

          <NavBar
            theme={theme}
            onToggleTheme={handleToggleTheme}
          />
          <Header />
          <Routes />
        </Container>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
