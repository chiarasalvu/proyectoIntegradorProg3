import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class MovieCard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            mensajeFavorito: 'Agregar a favoritos',
            mensajeVerMas : 'Ver más',
            booleanoVerMas: false
            
        }
    }


    componentDidMount() {

        let favoritos = [];

        let recuperoStorage = localStorage.getItem('favoritos')

        if (recuperoStorage !== null) {

            let favoritosToArray = JSON.parse(recuperoStorage);

            favoritos = favoritosToArray

            if (favoritos.includes(this.props.datosPelicula.id)) {
                this.setState({
                    mensajeFavorito: 'Quitar de favoritos'
                })
            }
        }


    }


    verMas(){
        if(this.state.mensajeVerMas === 'Ver más'){
            this.setState({
                booleanoVerMas : true,
                mensajeVerMas : 'Ver menos'
          } )
          } else {
              this.setState({
                booleanoVerMas : false,
                mensajeVerMas : 'Ver más'
            } )
          
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
                 <Link to={`/peliculas/id/${this.props.datosPelicula.id}`}>
                <img src= {`https://image.tmdb.org/t/p/w342/${this.props.datosPelicula.poster_path}`} alt="" /> 
                </Link>
                </div>
                    <h2>{this.props.datosPelicula.title}</h2> {/* Nombre */}
                
                
                <p className='more' onClick={() => this.verMas()}>{this.state.mensajeVerMas}</p>
                <p className={this.state.booleanoVerMas ? '' : 'no-visible'}>{this.props.datosPelicula.overview}</p> {/*Descripción*/}

                <button onClick={() => this.agregarYQuitarDeFavoritos(this.props.datosPelicula.id)}>{this.state.mensajeFavorito}</button>
                
            </article>

        )
    }

}

export default MovieCard;