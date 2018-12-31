import React, { Component } from 'react';


class Busqueda extends Component {

    leerDatos = (e) => {
        const termino = e.target.value;
        this.props.busqueda(termino);
    }
    render() {
        return (
            <input onChange={this.leerDatos} className="inputSearch" type="text" placeholder="Search" />
        )
    }
}

export default Busqueda;