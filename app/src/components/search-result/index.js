import React from 'react'
import ResultItem from './ResultItem'
import Styles from './search-result.scss'

class SearchResult extends React.Component {
    render() {
        return (
            <div className='result_wrap'>
                <div>
                    <ResultItem {...this.props} />
                </div>
            </div>
        )
    }
}

export default SearchResult;