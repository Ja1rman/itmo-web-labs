import React, { useState, useEffect } from 'react';
import HeaderContainer from './Header/HeaderContainer';
import TitleHelmet from './common/TitleHelmet'
import MainContent from './MainContent/MainContent';
import IndexContent from './IndexContent/IndexContent'
import Preloader from './Preloader/Preloader';
import Footer from "./Footer/Footer";

const App = (props) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!isLoaded) {
      props.initializeAuth();
      setIsLoaded(true);
    }
  }, [isLoaded, props]);

  if (props.isLoading) {
    return (
      <div>
        <HeaderContainer />
        <TitleHelmet title="Лабораторная работа #4 - Загрузка..." />
        <Preloader />
        <Footer />
      </div>

    );
  } else if (props.loggedUser) {
    return (
      <div>
        <HeaderContainer />
        <TitleHelmet title="Лабораторная работа #4 - Основная страница" />
        <MainContent />
        <Footer />
      </div>
    );
  } else {
    return (
      <div>
        <HeaderContainer />
        <TitleHelmet title="Лабораторная работа #4 - Страница авторизации" />
        <IndexContent />
        <Footer />
      </div>
    );
  }
}

export default App;
