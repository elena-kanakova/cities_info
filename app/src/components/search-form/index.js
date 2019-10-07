import React from 'react'
import './search-form.pcss'

class SearchForm extends React.Component {

    render() {
        return (
            <div className="search-form__wrap">
                <form id="search-form" className="flex" onSubmit={this.props.city}>
                    <div className="input-wrap">
                        <input type="text" id="search-text" name="city" placeholder="Введите название" />
                    </div>
                    <div className="btn-submit_wrap">
                        <button type="submit">Найти</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default SearchForm;
