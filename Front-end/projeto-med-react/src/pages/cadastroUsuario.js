import axios from "axios";
import React,{ Component } from "react";
import telefone from "../assets/img/image 1.png";
import instagram from "../assets/img/image 2.png";
import logo from "../assets/img/Logo (1).png";
import cadastros from "../assets/img/Área de cadastros (1).png";
import "./style.css";

class cadastroUsuario extends Component{
    constructor(props){
        super(props);
        this.state = {
            email : '', 
            idTipo : '',
            senha : '',
            listaTipoUsuario: [],
            isLoading : false
        }
    }

    novoUsuario = () => {

        this.setState({ isLoading : true });

        let dados = {
            email : this.state.email, 
            idTipo : this.state.idTipo,
            senha : this.state.senha
        }

        axios.post('https://localhost:5001/api/Usuario', dados, { 
            headers : {
            'Authorization' : 'Bearer ' + localStorage.getItem('token-login')
        }})

        .then(resposta => {
            if (resposta.status === 201) {
                console.log('usuario cadastrtdao')
                this.setState({ isLoading : false })
            }
        })

        .catch(erro => {
            console.log(erro);
            this.setState({ isLoading : false });
        })
        
    }

    listarTipoUsuario = () =>{
        fetch('https://localhost:5001/api/TipoUsuario')

        .then(resposta => resposta.json())

        .then(dados => this.setState({listaTipoUsuario : dados}))

        .catch(erro => console.log(erro))
    }

    atualizaState = (campo) =>{
        this.setState({[campo.target.name] : campo.target.value})
    }

    componentDidMount(){
        this.listarTipoUsuario()
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

                    <form onSubmit={this.novoUsuario} className="inputs-cadastro coluna ali spa">
                        
                        <h1>Novo Usuário</h1>

                        <input className="input" name="email" value={this.state.email} onChange={this.atualizaState} type="text" placeholder="E-Mail"/>
                        <input className="input" name= "senha" value={this.state.senha} onChange={this.atualizaState} type="text" placeholder="Senha"/>

                        <select className="select" name="idtipousuario" value={this.state.idtipousuario} onChange={this.atualizaState}>
                            <option>Selecione um tipo de usuário</option>
                        {
                            this.state.listaTipoUsuario.map(esp => {
                                return(
                                    <option value={esp.idTipo}>{esp.nome}</option>
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

export default cadastroUsuario;