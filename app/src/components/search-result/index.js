import React from 'react'
import ResultItem from './result-item'
import Styles from './search-result.scss'

function SearchResult(props) {
    return (
        <div className='result_wrap'>
            { props.cities.map(city => {
                return <ResultItem key={city.name} city={city} />
            }) }
        </div>
    )
}

export default SearchResult;