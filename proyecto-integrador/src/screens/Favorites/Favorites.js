import React, { Component } from 'react';
import MovieCard from "../../components/MovieCard/MovieCard";
import SerieCard from "../../components/SerieCard/SerieCard";


const apiKey = 'b8b7f0a177fd64911123a0d6c5c6618b'

class Favorites extends Component {
    constructor() {
        super()
        this.state = {
            peliculas: [],
            series : []
        }
    }

    componentDidMount() {
        let favoritos = [];
        let recuperoStorageMovie = localStorage.getItem('favoritosMovie')
        let recuperoStorageSerie = localStorage.getItem('favoritosSerie')

        if (recuperoStorageMovie !== null) {
            favoritos = JSON.parse(recuperoStorageMovie) //es un array de ids
      
            //recorrer el array y pedirla al endpoint por los datos de cada personaje.
            favoritos.forEach(unIdFavorito => {
                //pedir por cada id los datos del personaje
                fetch(`https://api.themoviedb.org/3/movie/${unIdFavorito}&?api_key=${apiKey}`)
                    .then(res => res.json())
                    .then(data => this.setState({ 
                        peliculas: this.state.peliculas.concat([data])
                    }, () => console.log(this.state.peliculas)))
                    .catch(e => console.log(e))
            })
        }

        if (recuperoStorageSerie !== null) {
            favoritos = JSON.parse(recuperoStorageSerie) //es un array de ids
     

            //recorrer el array y pedirla al endpoint por los datos de cada personaje.
            favoritos.forEach(unIdFavorito => {
                //pedir por cada id los datos del personaje
                fetch(`https://api.themoviedb.org/3/tv/${unIdFavorito}&?api_key=${apiKey}`)
                    .then(res => res.json())
                    .then(data => this.setState({ 
                        series: this.state.series.concat([data])
                    }, () => console.log(this.state.series)))
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
                <section className="opciones" id="movieFav">
                    {
                        this.state.peliculas.map((unaPelicula, idx) => <MovieCard key={unaPelicula.title + idx} datosPelicula={unaPelicula} borrar={(id) => this.borrar(id)}/>)
                    }
                </section>
                <section className="opciones" id="serieFav">
                    {
                        this.state.series.map((unaSerie, idx) => <SerieCard key={unaSerie.name + idx} datosSerie={unaSerie} borrar={(id) => this.borrar(id)}/>)
                    }
                </section>
            </React.Fragment>
        )
    }
}

export default Favorites;