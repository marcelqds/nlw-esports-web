import { useState, useEffect } from 'react';
import './styles/main.css';
import logoImg from './assets/imgs/logo.svg';
import { 
  GameBanner, 
  CreateAdsBanner, 
  ModalAds 
} from './components';

interface GamesProps {
  id?: string;
  title: string;
  bannerUrl: string;
  _count: {
    Ad: number;
  }
}

function App() {
  const [games, setGames] = useState<GamesProps[]|[]>();

  useEffect(() => {

    fetch('http://localhost:3200/game')
    .then(response => response.json())
    .then(data => {
      setGames(data);      
    });

  },[]);

  return (
      <div className="max-w-[1344px] mx-auto flex flex-col items-center my-20">
        <img src={logoImg} alt="Logo escrito 'NLW eSports' envolvido por duas elipses que se cruzam em formato de 'x'" />        
        <h1 className="text-6xl text-white font-black mt-20">Seu <span className="bg-nlw-gradient text-transparent bg-clip-text">duo</span> está aqui.</h1>

        <div className="grid grid-cols-6 gap-6 mt-16">
          { 
            games?.map(game => {
              const {id, title, bannerUrl, _count:{Ad}} = game;
              return(
                <GameBanner 
                  key={id} 
                  title={title} 
                  adsCount={Ad} 
                  bannerUrl={bannerUrl}
                />
              )
            })
          }
                              
        </div>
        <ModalAds>
          <CreateAdsBanner />
        </ModalAds>
      </div>
    );
}

export default App
