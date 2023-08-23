import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Switch,  Route } from "react-router-dom";
import KaydedilenlerListesi from './Filmler/KaydedilenlerListesi';
import FilmListesi from './Filmler/FilmListesi';
import Film from './Filmler/Film';


//burada aslında switch kullanıp (içinden bir tanesini seçtirmek)

export default function App () {
  const [saved, setSaved] = useState([]); // Stretch: the ids of "saved" movies
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    const FilmleriAl = () => {
      axios
        .get('http://localhost:5001/api/filmler') // Burayı Postman'le çalışın
        .then(response => {
          // Bu kısmı log statementlarıyla çalışın
          // ve burdan gelen response'u 'movieList' e aktarın
          setMovieList(response.data);

        })
        .catch(error => {
          console.error('Sunucu Hatası', error);
        });
    }
    FilmleriAl();
  }, []);

  const KaydedilenlerListesineEkle = movie => {
    let film = saved.find(item => item.id==movie.id);
    if(!film){
      setSaved([...saved, movie]);
    }
    // Burası esnek. Aynı filmin birden fazla kez "saved" e eklenmesini engelleyin
    
  };
//Swictch içine sadece değişecek şeyleri yazarız, o yüzden kaydedilenler listesini önce yazıyoruz ki direk hep o gözüksün
  return (
    <div>
      <KaydedilenlerListesi list={saved} />
      <Switch>
      <Route path="/">
        <FilmListesi movies = {movieList} />
      </Route>
      <Route path="./filmler/:id" >
        <Film />
      </Route>
      </Switch>
      
    </div>
  );
}
//:id demek buraya bir parametre gelecek demek, id parametresi