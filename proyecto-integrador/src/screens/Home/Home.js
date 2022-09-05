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
            valor: ''
        }
    }

    reset(){
        this.setState({
            resultadosDeBusqueda:[]
        })
    }

    evitarSubmit(event) {
        event.preventDefault();
        this.buscar()
              
    }

    controlarCambios(event) {
        this.setState({ valor: event.target.value })
    }

    buscar(textoDeBusqueda){
        fetch('https://api.themoviedb.org/3/search/multi?api_key=' + apiKey + '&query=' + this.state.valor)
            .then( res => res.json())
            .then( data => this.setState({
                resultadosDeBusqueda : data.results
            }))
            .catch()
    
        }
        


    render() {

        return (
            <React.Fragment>
                <main>
                    <form onSubmit={(event) => this.evitarSubmit(event)}>
                        <input type="text" onChange={(event) => this.controlarCambios(event)} value={this.state.valor} />
                        <input type="submit" value="Submit" />
                    </form>
                    <button onClick={()=>this.reset()}>reset</button>
                    

                    {
                        this.state.resultadosDeBusqueda.length > 0 ?  
                        
                            <section className="opciones">
                            <div>
                                {
                                    this.state.resultadosDeBusqueda.map((unaPelicula, idx) => <MovieCard key={unaPelicula.id + idx} datosPelicula={unaPelicula} />)
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