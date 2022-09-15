import React, { Component } from 'react';
const apiKey = 'b8b7f0a177fd64911123a0d6c5c6618b'

class DetailMovie extends Component {
    constructor(props) {
        super(props);
        this.state = {
            info: {
                genres: []
            },
            mensajeFavorito: 'Agregar a favoritos',
            loading: true
        }
    };

    componentDidMount() {
        fetch('https://api.themoviedb.org/3/movie/' + this.props.match.params.id + '?api_key=' + apiKey + '&language=en-US')
            .then(res => res.json())
            .then(data => this.setState({
                info: data,
                loading: false

            }, () => console.log(this.state.info)))
            .catch(error => console.log('El error fue: ' + error))

        let favoritos = [];
        let recuperoStorage = localStorage.getItem('favoritosMovie')

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
        let recuperoStorage = localStorage.getItem('favoritosMovie')

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
        localStorage.setItem('favoritosMovie', favoritosToString)
        //console.log(localStorage);
    }

    render() {
        return (
            <React.Fragment>
                {
                    this.state.loading ?
                        <div>
                            <img src="https://thumbs.gfycat.com/JovialMeagerBull-size_restricted.gif" alt="loader" />
                        </div>
                        :
                        <main className="maindetail">
                            <h2>DETALLES DE LA PELÍCULA</h2>

                            <h3>{this.state.info.title}</h3>
                            <div className='navdetalles'>
                                <img src={`https://image.tmdb.org/t/p/w342/${this.state.info.poster_path}`} alt="" className="portada" />
                            </div>

                            <div className='navdetalles'>
                                <ul>
                                    Géneros:
                                    {
                                        this.state.info.genres.map((unGenero, idx) => <li key={unGenero.id + idx}> {unGenero.name} </li>)
                                    }
                                </ul>

                                <p>Fecha de estreno: {this.state.info.release_date}</p>
                                <p>Calificación:{this.state.info.vote_average}</p>
                                <p>Duración: {this.state.info.runtime} minutos</p>
                                <p >{this.state.info.overview}</p>
                                <button className=" agregarFav" onClick={() => this.agregarYQuitarDeFavoritos(this.state.info.id)}>{this.state.mensajeFavorito}</button>
                            </div>


                        </main>
                }

            </React.Fragment >
        )
    }
}

export default DetailMovie;