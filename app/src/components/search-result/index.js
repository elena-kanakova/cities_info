import React from 'react'
import ResultItem from './result-item'
import Styles from './search-result.scss'

class SearchResult extends React.Component {
    render() {
        return (
            <div className='result_wrap'>
                <div>
                    <ResultItem />
                </div>
            </div>
        )
    }
}

export default SearchResult;