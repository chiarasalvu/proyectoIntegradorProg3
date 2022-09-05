import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SerieCard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            mensajeFavorito: 'Agregar a favoritos'
        }
    }


    componentDidMount() {

        let favoritos = [];

        let recuperoStorage = localStorage.getItem('favoritos')

        if (recuperoStorage !== null) {

            let favoritosToArray = JSON.parse(recuperoStorage);

            favoritos = favoritosToArray

            if (favoritos.includes(this.props.datosSerie.id)) {
                this.setState({
                    mensajeFavorito: 'Quitar de favoritos'
                })
            }
        }


    }




    agregarYQuitarDeFavoritos(id) {
        let favoritos = [];

        let recuperoStorage = localStorage.getItem('favoritos')

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
        localStorage.setItem('favoritos', favoritosToString)

        //console.log(localStorage);
    }


    render() {
        // console.log(this.props);
        return (
            <article className='divindex'>
                <div>
                 <Link to={`/peliculas/id/${this.props.datosSerie.id}`}>
                <img src= {`https://image.tmdb.org/t/p/w342/${this.props.datosSerie.poster_path}`} alt=""  className="portada"/> 
                </Link>
                </div>
                    <h2>{this.props.datosSerie.name}</h2> {/* Nombre */}
                
                <p>{this.props.datosSerie.overview}</p> {/*Descripción*/}
                <p className='more'>Ver más</p>

                <p onClick={() => this.agregarYQuitarDeFavoritos(this.props.datosSerie.id)}>{this.state.mensajeFavorito}</p>
            </article>

        )
    }

}

export default SerieCard;