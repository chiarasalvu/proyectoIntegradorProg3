import React, { Component } from 'react';
const apiKey = 'b8b7f0a177fd64911123a0d6c5c6618b'


class MovieDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            info:{
                genres: []

            }
                ,
           
        }
    };

    componentDidMount() {
        fetch('https://api.themoviedb.org/3/movie/' + this.props.match.params.id + '?api_key=' + apiKey +'&language=en-US')
            .then(res => res.json())
            .then(data => this.setState({
                info: data
            }, () => console.log(this.state.info)))
            .catch(error => console.log('El error fue: ' + error))

    }

    render() {
        return (

            <React.Fragment>

                <section className="opciones">
                    <h2>DETALLES DE LA PELÍCULA</h2>
                    <article className='divindex'>
                        <div>

                            <img src={`https://image.tmdb.org/t/p/w342/${this.state.info.poster_path}`} alt="" />

                        </div>
                        <h2>{this.state.info.title}</h2>

                        <ul>
                            Géneros:
                            {
                                this.state.info.genres.map((unGenero, idx) => <li key={unGenero.id + idx}> {unGenero.name} </li>)
                            }
                        </ul>

                        <p>Fecha de estreno: {this.state.info.release_date}</p>
                        <p>Calificación:{this.state.info.vote_avarage}</p>
                        <p>Duración: {this.state.info.runtime} minutos</p>
                        <p>{this.state.info.overview}</p>






                    </article>
                </section>
            </React.Fragment >
        )
    }

}



export default MovieDetail