import React from 'react';
import superagent from 'superagent';

class Agent extends React.Component {

    state = {
        fullName: undefined,
        country: undefined,
        timeZone: undefined,
        population: undefined,
        image: undefined
    };

    gettingWeather = async(e) => {
        e.preventDefault();
        const city = e.target.elements.city.value;

        try {
            if (city) {
                const api_url = await superagent
                    .get('https://api.teleport.org/api/cities/')
                    .query({search: city});
                const apiCitiesSearch = api_url.body;
                const apiCityInfo = await superagent.get(`${getValue(apiCitiesSearch, 'href').value}`);
                const dataCityBasicInfo = apiCityInfo.body;
                const dataCityCountry = getValue(dataCityBasicInfo, 'city:country').value;
                const dataCityTimezone = getValue(dataCityBasicInfo, 'city:timezone').value;
                const dataCityBasicInfoUrban = getValue(dataCityBasicInfo, 'city:urban_area').value;
                const dataCityUrbanHref = getValue(dataCityBasicInfoUrban, 'href').value;
                const apiCityUrban = await superagent.get(`${dataCityUrbanHref}`);
                const dataCityUrban = apiCityUrban.body;
                const dataCityUrbanImages = getValue(dataCityUrban, 'ua:images').value;
                const dataCityImagesHref = getValue(dataCityUrbanImages, 'href').value;
                const apiCityImages = await superagent.get(`${dataCityImagesHref}`);
                const dataCityImages = apiCityImages.body;

                this.setState({
                    fullName: getValue(apiCitiesSearch, 'matching_full_name').value,
                    country: getValue(dataCityCountry, 'name').value,
                    timeZone: getValue(dataCityTimezone, 'name').value,
                    population: getValue(dataCityBasicInfo, 'population').value,
                    image: getValue(dataCityImages, 'web').value
                })
            }
        } catch (err) {
            console.log('error');
        }
    };
}