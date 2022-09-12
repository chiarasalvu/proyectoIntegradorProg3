import React, { Component } from 'react';
const apiKey = 'b8b7f0a177fd64911123a0d6c5c6618b'

class DetailSerie extends Component {
    constructor(props) {
        super(props);
        this.state = {
            info: {
                genres: []
            },
            mensajeFavorito: 'Agregar a favoritos',
        }
    };

    componentDidMount() {
        fetch('https://api.themoviedb.org/3/tv/' + this.props.match.params.id + '?api_key=' + apiKey + '&language=en-US')
            .then(res => res.json())
            .then(data => this.setState({
                info: data
            }, () => console.log(this.state.info)))
            .catch(error => console.log('El error fue: ' + error))

        let favoritos = [];
        let recuperoStorage = localStorage.getItem('favoritosSerie')

        if (recuperoStorage !== null) {
            let favoritosToArray = JSON.parse(recuperoStorage);
            favoritos = favoritosToArray

            if (favoritos.includes(this.props.match.params.id)) {
                this.setState({
                    mensajeFavorito: 'Quitar de favoritos'
                })
            }
        }
    }

    agregarYQuitarDeFavoritos(id) {
        let favoritos = [];
        let recuperoStorage = localStorage.getItem('favoritosSerie')

        if (recuperoStorage !== null) {
            let favoritosToArray = JSON.parse(recuperoStorage);
            favoritos = favoritosToArray
        }

        //Preguntemos si el id ya está en el array
        if (favoritos.includes(id)) { //el método includes retorna un booleano
            favoritos = favoritos.filter(unId => unId !== id)
            this.setState({
                mensajeFavorito: 'Agregar a favoritos'
            })
        } else {
            favoritos.push(id); this.setState({
                mensajeFavorito: 'Quitar de favoritos'
            })
        }

        let favoritosToString = JSON.stringify(favoritos)
        localStorage.setItem('favoritosSerie', favoritosToString)
        //console.log(localStorage);
    }

    render() {
        return (
            <React.Fragment>
                <section className="opciones">
                    <h2>DETALLES DE LA SERIE</h2>
                    <article className='divindex'>
                        <div>
                            <img src={`https://image.tmdb.org/t/p/w342/${this.state.info.poster_path}`} alt="" className="portada" />
                        </div>
                        <h3>{this.state.info.name}</h3>
                        <div className='detalle'>
                            <ul>
                                Géneros:
                                {
                                    this.state.info.genres.map((unGenero, idx) => <li key={unGenero.id + idx}> {unGenero.name} </li>)
                                }
                            </ul>
                            <p>Fecha de estreno: {this.state.info.first_air_date}</p>
                            <p>Calificación:{this.state.info.vote_average}</p>
                            <p>{this.state.info.overview}</p>
                            <button onClick={() => this.agregarYQuitarDeFavoritos(this.state.info.id)}>{this.state.mensajeFavorito}</button>
                        </div>
                    </article>
                </section>
            </React.Fragment>
        )
    }
}

export default DetailSerie;