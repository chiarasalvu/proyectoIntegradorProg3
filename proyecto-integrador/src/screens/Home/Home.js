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
                    <section className="opciones">
                        <h2>SERIES POPULARES</h2>
                        <div id="series-populares">
                            <Series />
                        </div>
                    </section>
                </main>
            </React.Fragment>
        )
    }
}

export default Home;