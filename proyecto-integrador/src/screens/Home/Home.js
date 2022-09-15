import React, { Component } from 'react';
import Movies from '../../components/Movies/Movies'
import Series from '../../components/Series/Series'
import MovieCard from '../../components/MovieCard/MovieCard'

const apiKey = 'b8b7f0a177fd64911123a0d6c5c6618b'

class Home extends Component {
    constructor() {
        super()
        this.state = {
            resultadosDeBusqueda: [],
            valor: '',
            buscando: false

        }
    }

    reset() {
        this.setState({
            resultadosDeBusqueda: [],
            valor: "",
            buscando: false

        })
    }

    evitarSubmit(event) {
        event.preventDefault();
        if (this.state.valor === '') {
            return
        }
        this.buscar()
    }

    controlarCambios(event) {
        this.setState({ valor: event.target.value })
    }

    buscar(textoDeBusqueda) {
        fetch('https://api.themoviedb.org/3/search/movie?api_key=' + apiKey + '&query=' + this.state.valor)
            .then(res => res.json())
            .then(data => this.setState({
                resultadosDeBusqueda: data.results,
                buscando: true
            }))
            .catch()
    }

    render() {
        return (
            <React.Fragment>

                <main>
                    <article className='search-box'>
                        <form onSubmit={(event) => this.evitarSubmit(event)}>
                            <input className='search-text' type="text" onChange={(event) => this.controlarCambios(event)} value={this.state.valor} />
                            <input className='search-button' type="submit" value="Buscar" />
                            <button onClick={() => this.reset()} className='search-button'>Resetear</button>
                        </form>
                    </article>

                    {
                        this.state.buscando ?

                            <section className="opciones">
                                <div>
                                    {
                                        this.state.resultadosDeBusqueda.length === 0 ?
                                            <>No se encontraron resultados</>
                                            :
                                            this.state.resultadosDeBusqueda.map((unaPelicula, idx) => <MovieCard key={unaPelicula.title + idx} datosPelicula={unaPelicula} />)
                                    }
                                </div>
                            </section>
                            :
                            <React.Fragment>
                                <Movies />
                                <Series />
                            </React.Fragment>
                    }
                </main>
            </React.Fragment>
        )
    }
}

export default Home;