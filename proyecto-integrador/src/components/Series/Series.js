import React, { Component } from 'react';
import SerieCard from '../SerieCard/SerieCard';
const apiKey = 'b8b7f0a177fd64911123a0d6c5c6618b'

class Series extends Component {
    constructor() {
        super()
        this.state = {
            series: [] //aparecer series
        }
    }

    componentDidMount() {
        //Buscamos datos
        fetch('https://api.themoviedb.org/3/tv/popular?api_key=' + apiKey)
            .then(res => res.json())
            .then(data => this.setState({
                series: data.results

            }))
            .catch()
    }



    render() {
        console.log(this.state.series)
        return (

            <React.Fragment>

                <section className="opciones">
                    <h2>SERIES POPULARES</h2>
                    <div>
                        {
                            this.state.series.map((unaSerie, idx) => <SerieCard key={unaSerie.name + idx} datosSerie={unaSerie} />)
                        }
                    </div>
                </section>
            </React.Fragment>
        )
    }

}


export default Series;