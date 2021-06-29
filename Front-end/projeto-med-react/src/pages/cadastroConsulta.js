import React,{ Component } from "react";
import cadastros from "../assets/img/Área de cadastros (1).png"
import telefone from "../assets/img/image 1.png";
import instagram from "../assets/img/image 2.png";
import logo from "../assets/img/Logo (1).png";
import "./style.css";
import axios from 'axios'

class cadastroConsulta extends Component{
    constructor(props){
        super(props);
        this.state = {
            idPaciente : '',
            data : '',
            idmedico : '',
            idclinica : '',
            descricao : '',
            situacao : '',
            listaMedicos : [],
            listaPaciente : [],
            listaSituacao : [],
            isLoading : false
        }
    }

    

    novaConsulta = () => {
        this.setState({ isLoading : true });

        let dados = {
            idCliente : this.state.idPaciente,
            idMedico : this.state.idmedico,
            idSituacao : this.state.situacao,
            dataConsulta : new Date (this.state.data),
            sobreConsulta : this.state.descricao
        }

        axios.post('https://localhost:5001/api/Consulta', dados, { 
            headers : {
            'Authorization' : 'Bearer ' + localStorage.getItem('token-login')
        }})

        .then(resposta => {
            if (resposta.status === 201) {
                console.log('consulta cadastrada')
                this.setState({ isLoading : false })
            }
        })

        .catch(erro => {
            console.log(erro);
            this.setState({ isLoading : false });
        })
        
    }

    listarMedicos = () =>{
        fetch('https://localhost:5001/api/Medico',{ headers : {
            'Authorization' : 'Bearer ' + localStorage.getItem('token-login') 
        }})

        .then(resposta => resposta.json())

        .then(dados => this.setState({listaMedicos : dados}))

        .catch(erro => console.log(erro))
    }

    listarPaciente = () =>{
        fetch('https://localhost:5001/api/Cliente',{ headers : {
            'Authorization' : 'Bearer ' + localStorage.getItem('token-login') 
        }})

        .then(resposta => resposta.json())

        .then(dados => this.setState({ listaPaciente : dados}))

        .catch(erro => console.log(erro))
    }

    listarSituacao = () =>{
        fetch('https://localhost:5001/api/Situacao',{ headers : {
            'Authorization' : 'Bearer ' + localStorage.getItem('token-login') 
        }})

        .then(resposta => resposta.json())

        .then(dados => this.setState({ listaSituacao : dados}))

        .catch(erro => console.log(erro))
    }

    atualizaState = (campo) =>{
        this.setState({[campo.target.name] : campo.target.value})
    }

    componentDidMount(){
        this.listarPaciente();
        this.listarMedicos();
        this.listarSituacao();
    }

    render(){
        return(
            <section>
                <section className="header dis ali">
                    <img src={logo} alt="logo sp medical group"/>
                    <a href="/adm"><h3>Início</h3></a>
                </section>
            <section className="content-principal-cadastro dis">
                
                <img src={cadastros} alt=""/>

                <form className="inputs-cadastro coluna ali spa" onSubmit={this.novaConsulta}>
                    
                    <h1>Nova Consulta</h1>
                   
                    <select className= "select" value={this.state.idPaciente} name="idPaciente" onChange={this.atualizaState}>
                        <option value ="0">Selecione o nome do paciente</option>
                        {
                            this.state.listaPaciente.map( (nome) =>{
                                return(
                                    <option value={nome.idCliente}>{nome.nomeCliente}</option>
                                )
                            })
                        }
                    </select>

                    <input className= "input" name="data" value={this.state.data} type="date" onChange={this.atualizaState} placeholder="Data"/>

                    <select className= "select" value={this.state.idmedico} name="idmedico" onChange={this.atualizaState}>
                        <option value ="0">Selecione o médico</option>
                        {
                            this.state.listaMedicos.map( (nome) =>{
                                return(
                                    <option value={nome.idMedico}>{nome.nomeMedico}</option>
                                )
                            })
                        }
                    </select>

                    {/* <select className= "select" value={this.state.idclinica} name="idclinica" onChange={this.atualizaState}>
                        <option value ="0">Selecione a clínica</option>
                        {
                            this.state.listaConsultas.map( (nome) =>{
                                return(
                                    <option value={nome.idClinica}>{nome.idClinicaNavigation.nomeClinica}</option>
                                )
                            })
                        }
                    </select> */}

                    <input className= "input" type="text" name="descricao" value={this.state.descricao} onChange={this.atualizaState} placeholder="Descrição"/>

                    <select className= "select" value={this.state.situacao} name="situacao" onChange={this.atualizaState}>
                        {
                            this.state.listaSituacao.map( (nome) =>{
                                return(
                                    <option value={nome.idSituacao}>{nome.nomeSituacao}</option>
                                )
                            })
                        }
                    </select>

                    <button type="submit">Cadastrar</button>

                </form>
                

            </section>
            
            <footer className="dis ali spaa">

                <h4>A melhor rede de clínicas médicas de SP reunidas em um único grupo</h4>

                <img className="logoFooter" src={logo} alt="logo do sp medical group"/>

                <div className="contato coluna spa">
                    <h5>Como nos contatar?</h5>
                    <div className="contatos dis">
                        <img src={telefone} alt=""/>
                        <p>(11) 4002-8922</p>
                    </div>
                    <div className="contatos dis">
                        <img src={instagram} alt=""/>
                        <p>@spmedicalgroup</p>
                    </div>
                </div>
            </footer>
            </section>

        )
    }
}

export default cadastroConsulta;