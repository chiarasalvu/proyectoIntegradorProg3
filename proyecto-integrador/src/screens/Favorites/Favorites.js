import React, { Component } from 'react';
import MovieCard from "../../components/MovieCard/MovieCard";
import SerieCard from "../../components/SerieCard/SerieCard";

const apiKey = 'b8b7f0a177fd64911123a0d6c5c6618b'

class Favorites extends Component {
    constructor() {
        super()
        this.state = {
            peliculas: [],
            series: [],
            isFav: true,
            loading: true
        }
    }

    componentDidMount() {
        let favoritos = [];
        let recuperoStorageMovie = localStorage.getItem('favoritosMovie')
        let recuperoStorageSerie = localStorage.getItem('favoritosSerie')

        if (recuperoStorageMovie !== null) {
            favoritos = JSON.parse(recuperoStorageMovie) //es un array de ids
            let peliculasFavoritos = [];
            //recorrer el array y pedirla al endpoint por los datos de cada pelicula.
            favoritos.forEach(unIdFavorito => {
                //pedir por cada id los datos de la pelicula
                fetch(`https://api.themoviedb.org/3/movie/${unIdFavorito}&?api_key=${apiKey}`)
                    .then(res => res.json())
                    .then(data => {
                        peliculasFavoritos.push(data)
                        this.setState({
                            peliculas : peliculasFavoritos,
                            loading : false
                        })
                    })
                    .catch(e => console.log(e))
            })
        }

        if (recuperoStorageSerie !== null) {
            favoritos = JSON.parse(recuperoStorageSerie) //es un array de ids
            let serieFavoritos = [];
            //recorrer el array y pedirla al endpoint por los datos de cada pelicula.
            favoritos.forEach(unIdFavorito => {
                //pedir por cada id los datos de la pelicula
                fetch(`https://api.themoviedb.org/3/tv/${unIdFavorito}&?api_key=${apiKey}`)
                    .then(res => res.json())
                    .then(data => {
                        serieFavoritos.push(data)
                        this.setState({
                            series : serieFavoritos,
                            loading : false
                        })
                    })
                    .catch(e => console.log(e))
            })
        }
    }

    borrar(id) {
        let peliculasFiltradas = this.state.peliculas.filter(unaPelicula => unaPelicula.id !== id);
        let seriesFiltradas = this.state.series.filter(unaSerie => unaSerie.id !== id);
        this.setState({
            peliculas: peliculasFiltradas,
            series: seriesFiltradas
        })
    }

    render() {
        return (
            <React.Fragment>
                <h2>Favoritos</h2>
                {
                    this.state.loading === 0 ?
                        <div>
                            <img src="https://thumbs.gfycat.com/JovialMeagerBull-size_restricted.gif" alt="loader" />
                        </div>
                        :
                        <>
                            <section className="opciones" >
                                <h3>Películas Favoritas</h3>
                                <div>
                                {
                                    this.state.peliculas.map((unaPelicula, idx) => <MovieCard key={unaPelicula.title + idx} isFav={this.state.isFav} datosPelicula={unaPelicula} borrar={(id) => this.borrar(id)} />)
                                }
                                </div>
                            </section>
                            <section className="opciones" >
                                <h3>Series Favoritas</h3>
                                <div>
                                {
                                    this.state.series.map((unaSerie, idx) => <SerieCard key={unaSerie.name + idx} isFav={this.state.isFav} datosSerie={unaSerie} borrar={(id) => this.borrar(id)} />)
                                }
                                </div>
                            </section>
                        </>
                }


            </React.Fragment>
        )
    }
}

export default Favorites;