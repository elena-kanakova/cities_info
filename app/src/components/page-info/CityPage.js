import React from 'react'
import PropTypes from 'prop-types'
import './page-info.scss'
import superagent from "superagent"
import SearchForm from "../search-form";

/*const API_KEY = '6730c8df6acdcc426b019e426791955d';*/

class CityPage extends React.Component {

    render() {
        debugger;

        const getUserItem = (name, content) => {

            let outputName = this.outputNameDictionary[name];

            return (
                <div className="basic-info_item flex">
                    <p className="basic-info_item-title">{outputName}</p>
                    <p className="basic-info_item-desc">{content}</p>
                </div>
            )
        };

        const userInfoItems = () => {
            const cityInfo = this.props.cityDetail;

            return Object.keys(cityInfo).map((key) => (getUserItem(key, cityInfo[key])));
        };

        return (
            <div className="container">
                <header id="header" className="flex center">
                    <h1>Узнай про город своей мечты</h1>
                </header>
                <div className="AppContent">
                    <div className="AppResult">
                        <div className='result_wrap'>
                            <div>
                                {userInfoItems()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default CityPage;