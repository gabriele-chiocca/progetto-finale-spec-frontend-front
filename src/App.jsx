import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';

import Home from './pages/Home';
import AnimeDetail from './pages/AnimeDetail';
import Favorites from './pages/Favorites';
import Compare from './pages/Compare';
import { FavoritesProvider } from './context/FavoritesContext';
import { CompareProvider } from './context/CompareContext';

function App() {
  return (
    <FavoritesProvider>
      <CompareProvider>
        <BrowserRouter>
          <Header />

          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/anime/:id" element={<AnimeDetail />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/compare" element={<Compare />} />
            </Routes>
          </main>

          <Footer />
        </BrowserRouter>
      </CompareProvider>
    </FavoritesProvider>
  );
}

export default App;
