import React,{ Component } from "react";
import telefone from "../assets/img/image 1.png";
import instagram from "../assets/img/image 2.png";
import logo from "../assets/img/Logo (1).png";
import cadastros from "../assets/img/Área de cadastros (1).png";
import "./style.css";
import axios from 'axios';

class cadastroMedico extends Component{
    constructor(props){
        super(props);
        this.state = {
            nome : '', 
            idclinica : '',
            idespecializacao : '',
            crmM : '', 
            listaEspecializacao : [],
            listaClinica : [],
            isLoading : false
        }
    }

    novoMedico = (event) =>{
        event.preventDefault();

        this.setState({isLoading : true})

        let dados = {
            nomeMedico : this.state.nome,
            crm : this.state.crmM,
            idEspecializacao : this.state.idespecializacao,
            idClinica : this.state.idclinica
        }
        axios.post('https://localhost:5001/api/Medico', dados, { 
            headers : {
            'Authorization' : 'Bearer ' + localStorage.getItem('token-login')
        }})

        .then(resposta =>{
            
            if(resposta.status === 201){
                console.log('medico cadastrado');
                this.setState({isLoading : false})
            }
        })

        .catch(erro => {
            console.log(erro);
            this.setState({isLoading : false})
        })
    }

    listarEspecializacao = () =>{
        fetch('https://localhost:5001/api/Especializacao',{ headers : {
            'Authorization' : 'Bearer ' + localStorage.getItem('token-login') 
        }})

        .then(resposta => resposta.json())

        .then(dados => this.setState({listaEspecializacao : dados}))

        .catch(erro => console.log(erro))
    }

    listarClinica = () =>{
        fetch('https://localhost:5001/api/Clinica',{ headers : {
            'Authorization' : 'Bearer ' + localStorage.getItem('token-login') 
        }})

        .then(resposta => resposta.json())

        .then(dados => this.setState({listaClinica  : dados}))

        .catch(erro => console.log(erro))
    }

    listarTipoUsuario = () =>{
        fetch('https://localhost:5001/api/TipoUsuario',{ headers : {
            'Authorization' : 'Bearer ' + localStorage.getItem('token-login') 
        }})

        .then(resposta => resposta.json())

        .then(dados => this.setState({listaTipoUsuario : dados}))

        .catch(erro => console.log(erro))
    }

    atualizaState = (campo) =>{
        this.setState({[campo.target.name] : campo.target.value})
    }

    componentDidMount(){
        this.listarEspecializacao();
        this.listarClinica();
    }

    render(){
        return(
            <section>
                <section className="header dis ali">
                    <img src={logo} alt="logo sp medical group"/>
                    <a href="/adm"><h3>Início</h3></a>
                </section>

                <section class="content-principal-cadastro dis">
                    
                <img src={cadastros} alt=""/>

                    <form onSubmit={this.novoMedico} class="inputs-cadastro coluna ali spa">
                        
                        <h1>Novo Médico</h1>

                        <input className="input" name="nome" value={this.state.nome} onChange={this.atualizaState} type="text" placeholder="Nome"/>
                        <input className="input" name= "crmM" value={this.state.crmM} onChange={this.atualizaState} type="text" placeholder="CRM"/>
                        
                        <select className="select" name="idespecializacao" value={this.state.idespecializacao} onChange={this.atualizaState}>
                            <option>Selecione uma especialização</option>
                        {
                            this.state.listaEspecializacao.map(esp => {
                                return(
                                    <option value={esp.idEspecializacao}>{esp.nomeEspecializacao}</option>
                                )
                            })
                        }
                        </select>

                        <select className="select" name="idclinica" value={this.state.idclinica} onChange={this.atualizaState}>
                            <option>Selecione uma clínica</option>
                        {
                            this.state.listaClinica.map(esp => {
                                return(
                                    <option value={esp.idClinica}>{esp.nomeFantasia}</option>
                                )
                            })
                        }
                        </select>

                        {/* <select className="select" name="idtipousuario" value={this.state.idtipousuario} onChange={this.atualizaState}>
                            <option>Selecione um tipo de usuário</option>
                        {
                            this.state.listaTipoUsuario.map(esp => {
                                return(
                                    <option value={esp.idTipo}>{esp.nome}</option>
                                )
                            })
                        }
                        </select> */}
                        
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

export default cadastroMedico;