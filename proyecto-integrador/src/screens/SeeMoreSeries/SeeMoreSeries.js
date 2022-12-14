import React, { Component } from 'react';
import SerieCard from '../../components/SerieCard/SerieCard';
const apiKey = 'b8b7f0a177fd64911123a0d6c5c6618b'

class SeeMoreSeries extends Component {
    constructor() {
        super()
        this.state = {
            pagina: 1,
            series: [], //aparecer series
            seriesIniciales: [],
            valor: "",
            loading: true
        }
    }

    componentDidMount() {
        //Buscamos datos
        fetch('https://api.themoviedb.org/3/tv/popular?api_key=' + apiKey + '&language=en-US&page=1')
            .then(res => res.json())
            .then(data => this.setState({
                series: data.results,
                seriesIniciales: data.results,
                loading: false
            }))
            .catch()
    }

    traerMas() {
        //Traer la siguiente página de series
        fetch('https://api.themoviedb.org/3/tv/popular?api_key=' + apiKey + '&language=en-US&page=' + (this.state.pagina + 1))
            .then(res => res.json())
            .then(data => this.setState({
                series: this.state.series.concat(data.results),
                seriesIniciales: this.state.seriesIniciales.concat(data.results),
                pagina: this.state.pagina + 1
            }))
            .catch()
    }

    evitarSubmit(event) {
        event.preventDefault();
    }

    controlarCambios(event) {
        this.setState({ valor: event.target.value }, () => this.filtrarSeries(this.state.valor))
    }

    filtrarSeries(textoDelUsuario) {
        let seriesFiltradas = this.state.seriesIniciales.filter(unaSerie => unaSerie.name.toLowerCase().includes(textoDelUsuario.toLowerCase()));
        this.setState({
            series: seriesFiltradas,
        })
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
                        <section className="opciones">
                        <article className='search-box'>
                            <form onSubmit={(event) => this.evitarSubmit(event)} className='search-form'>
                                <input className='search-text' type="text" onChange={(event) => this.controlarCambios(event)} value={this.state.valor} />
                                <input className='search-button' type="submit" value="Buscar" />
                            </form>
                        </article>
                        <div>
                            {
                                this.state.series.map((unaSerie, idx) => <SerieCard key={unaSerie.name + idx} datosSerie={unaSerie} />)
                            }
                        </div>
                    </section>
                }
               
                <div className='botonTraerMas'>
                    <button onClick={() => this.traerMas()} className='traerMas'> Traer más series </button>
                </div>
            </React.Fragment>
        )
    }
}

export default SeeMoreSeries;