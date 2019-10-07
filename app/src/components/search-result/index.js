import React from 'react'
import ResultItem from './ResultItem'
import Styles from './search-result.pcss'

class SearchResult extends React.Component {
    render() {
        return (
            <div className='result_wrap'>
                <ResultItem {...this.props} />
            </div>
        )
    }
}

export default SearchResult;