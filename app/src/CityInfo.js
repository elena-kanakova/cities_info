import React, { useEffect } from 'react'
import './index.css';
import SearchForm from './components/search-form/index'
import SearchResult from './components/search-result/index'
import ModalInfo from './components/modal-info/modal-info.js'

function CityInfo() {
    const cities = [
        {name: 'Москва', country: 'Россия', timezone: '', desc: 'Столица России'},
        {name: 'New York', country: 'США', timezone: '', desc: 'Город мечты'}
    ]

    useEffect(() => {
        fetch('https://api.teleport.org/api/cities')
            .then(response => response.json())
            .then(cities => {
                console.log(cities)
            })
    }, [])

  return (
    <div className="container">
        <header id="header" className="flex center">
            <h1>Узнай про город своей мечты</h1>
        </header>
        <div className="AppContent">
            <div className="AppForm">
                <SearchForm/>
            </div>
            <div className="AppResult">
                <SearchResult cities={cities}/>
            </div>
        </div>
        {/*<div className="AppModal">
            <ModalInfo/>
        </div>*/}
    </div>
  );
}

export default CityInfo;
