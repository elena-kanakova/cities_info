import React from 'react'
import './search-form.scss'

function search() {
    return (
        <div className="search-form__wrap">
            <form id="search-form" className="flex">
                <div className="input-wrap">
                    <label htmlFor="search-text">Введите название</label>
                    <input type="text" id="search-text" name="search-text" />
                </div>
                <div className="btn-submit_wrap">
                    <button type="submit">Найти</button>
                </div>
            </form>
        </div>
    )
}

export default search;
