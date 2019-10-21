import React from 'react'
import './search-form.scss'

class SearchForm extends React.Component {
    render() {
        return (
            <div className="search-form__wrap">
                <form id="search-form" className="flex" onSubmit={this.props.city}>
                    <div className="input-wrap">
                        <label htmlFor="search-text">Введите название</label>
                        <input type="text" id="search-text" name="city" />
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
