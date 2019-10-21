import React from 'react';
import superagent from 'superagent';


class Agent extends React.Component {

    requests = {
        get: (url) =>
            superagent
                .get('/search')
                .query({ query: 'Manny' })
                .then(res => {
                    // res.body, res.headers, res.status
                })
                .catch(err => {
                    // err.message, err.response
                })
    };

}