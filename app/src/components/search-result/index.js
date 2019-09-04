import React from 'react'
import ResultItem from './result-item'
import Styles from './search-result.scss'

class SearchResult extends React.Component {
    render() {
        return (
            <div className='result_wrap'>
                <div>
                    Result: {this.props.temp}
                    {this.props.city}
                    {this.props.country}
                </div>
            </div>
        )
    }
}

export default SearchResult;