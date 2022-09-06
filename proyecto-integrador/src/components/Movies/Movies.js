import React, { Component } from 'react';
import MovieCard from '../MovieCard/MovieCard';
const apiKey = 'b8b7f0a177fd64911123a0d6c5c6618b'

class Movies extends Component {
    constructor() {
        super()
        this.state = {
            peliculas: [] //aparecer películas
        }
    }

    componentDidMount() {
        //Buscamos datos
        fetch('https://api.themoviedb.org/3/movie/popular?api_key=' + apiKey)
            .then(res => res.json())
            .then(data => this.setState({
                peliculas: data.results
                
            }))
            .catch()
    }


    
    render() {
        return(
            
            <React.Fragment>
                
                <section className="opciones">
                    <h2>PELÍCULAS POPULARES</h2>
                    <div>
                        {
                            this.state.peliculas.map((unaPelicula, idx) => <MovieCard key={unaPelicula.title + idx} datosPelicula={unaPelicula} />)
                        }
                    </div>
                </section>
            </React.Fragment>
        )
    }

}


export default Movies;