import React, { Component } from 'react';
import Movies from '../../components/Movies/Movies'
import Series from '../../components/Series/Series'


class Home extends Component {
    constructor() {
        super()

        this.state = {

        }
    }


    render() {

        return (
            <React.Fragment>
                <main>
                    <Movies />
                    <Series />
                </main>
            </React.Fragment>
        )
    }
}

export default Home;