import React, { Component } from 'react';
import MovieCard from '../../components/MovieCard/MovieCard';
const apiKey = 'b8b7f0a177fd64911123a0d6c5c6618b'


class SeeMoreMovies extends Component {
    constructor() {
        super()
        this.state = {
            pagina: 1,
            peliculas: [], //aparecer películas
            peliculasIniciales: [],
            valor: ""
        }
    }

    componentDidMount() {
        //Buscamos datos
        fetch('https://api.themoviedb.org/3/movie/popular?api_key=' + apiKey + '&language=en-US&page=1')
            .then(res => res.json())
            .then(data => this.setState({
                peliculas: data.results,
                peliculasIniciales: data.results
            } ))
            .catch()
    }

    traerMas() {
        //Traer la siguiente página de peliculas
        fetch('https://api.themoviedb.org/3/movie/popular?api_key=' + apiKey + '&language=en-US&page=' + (this.state.pagina + 1))
            .then(res => res.json())
            .then(data => this.setState({
                peliculas: this.state.peliculas.concat(data.results),
                peliculasIniciales: this.state.peliculasIniciales.concat(data.results),
                pagina: this.state.pagina + 1
            }))
            .catch()
    }

    evitarSubmit(event) {
        event.preventDefault();
    }

    controlarCambios(event) {
        this.setState({ valor: event.target.value }, () => this.filtrarPeliculas(this.state.valor))
    }

    filtrarPeliculas(textoDelUsuario) {
        let peliculasFiltradas = this.state.peliculasIniciales.filter(unaPelicula => unaPelicula.title.toLowerCase().includes(textoDelUsuario.toLowerCase()));
        
        this.setState({
            peliculas: peliculasFiltradas,
        })
    }

    render() {
        return (
            <React.Fragment>

                <section className="opciones">

                    <form onSubmit={(event) => this.evitarSubmit(event)}>

                        <input type="text" onChange={(event) => this.controlarCambios(event)} value={this.state.valor} />
                        <input type="submit" value="Submit" />
                    </form>
                    <div>
                        {
                            this.state.peliculas.map((unaPelicula, idx) => <MovieCard key={unaPelicula.title + idx} datosPelicula={unaPelicula} />)
                        }
                    </div>
                </section>
                <button onClick={() => this.traerMas()}> Traer más peliculas </button>
            </React.Fragment>
        )
    }

}


export default SeeMoreMovies