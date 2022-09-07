import React, { Component } from 'react';
import MovieCard from "../../components/MovieCard/MovieCard";

const apiKey = 'b8b7f0a177fd64911123a0d6c5c6618b'

class Favorites extends Component {
    constructor() {
        super()
        this.state = {
            peliculas: []
        }
    }

    componentDidMount() {
        let favoritos = [];
        let recuperoStorage = localStorage.getItem('favoritos')

        if (recuperoStorage !== null) {
            favoritos = JSON.parse(recuperoStorage) //es un array de ids
            let peliculas = [];

            //recorrer el array y pedirla al endpoint por los datos de cada personaje.
            favoritos.forEach(unIdFavorito => {
                //pedir por cada id los datos del personaje
                fetch(`https://api.themoviedb.org/3/movie/${unIdFavorito}&?api_key=${apiKey}`)
                    .then(res => res.json())
                    .then(data => peliculas.push(data))
                    .catch(e => console.log(e))
            })

            console.log(peliculas);
        }
    }

    // borrar(id) {
    //     let peliculasFiltradas = this.state.peliculas.filter(unaPelicula => unaPelicula.id !== id);
    //     let seriesFiltradas = this.state.series.filter(unaSerie => unaSerie.id !== id);
    //     this.setState({
    //         peliculas: peliculasFiltradas,
    //         series: seriesFiltradas
    //     })
    // }

    render() {
        return (
            <React.Fragment>
                <h2>Favoritos</h2>
                <section>
                    {
                        this.state.peliculas.map((unaPelicula, idx) => <MovieCard key={unaPelicula.title + idx} datosPelicula={unaPelicula} />)
                    }
                </section>
                {/* {\/* <section className="opciones" id="serieFav">
                    {
                        this.state.series.map((unaSerie, idx) => <SerieCard key={unaSerie.name + idx} datosSerie={unaSerie} borrar={(id)=> this.borrar(id)} />)
                    }
                </section> */}
            </React.Fragment>
        )
    }
}

export default Favorites;