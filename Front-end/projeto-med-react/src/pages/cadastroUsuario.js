import axios from "axios";
import React,{ Component } from "react";
import telefone from "../assets/img/image 1.png";
import instagram from "../assets/img/image 2.png";
import logo from "../assets/img/Logo (1).png";
import reload from "../assets/img/redo-alt-solid.svg"
import cadastros from "../assets/img/Área de cadastros (1).png";
import "./style.css";

class cadastroUsuario extends Component{
    constructor(props){
        super(props);
        this.state = {
            email : '', 
            idTipo : '',
            senha : '',
            nome : '',
            rg: '',
            cpf: '',
            endereco: '',
            dataNascimento: '',
            telefoneCliente: '',
            idUsuario : '',
            listaUsuario : [],
            isLoading : false
        }
    }

    novoUsuario = (event) => {

        event.preventDefault();

        this.setState({ isLoading : true });

        let dadosUsuario = {
            email : this.state.email, 
            idTipo : this.state.idTipo,
            senha : this.state.senha
        }

        axios.post('https://localhost:5001/api/Usuario', dadosUsuario, { 
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

        this.setState({
            email : '', 
            idTipo : '',
            senha : ''
        })

    }

    novoCliente = (event) => {

        event.preventDefault()

        let dadosCliente = {
            nome : this.state.nome,
            rg: this.state.rg,
            cpf: this.state.cpf,
            endereco: this.state.endereco,
            dataNascimento: new Date (this.state.dataNascimento),
            telefoneCliente: this.state.telefoneCliente,
            idUsuario : this.state.idUsuario,
        }

        axios.post('https://localhost:5001/api/Cliente', dadosCliente, { 
            headers : {
            'Authorization' : 'Bearer ' + localStorage.getItem('token-login')
        }})

        .then(resposta => {
            if (resposta.status === 201) {
                console.log('cliente cadastrtdao')
                this.setState({
                    isLoading : false ,
                    nome : '',
                    rg: '',
                    cpf: '',
                    endereco: '',
                    dataNascimento: '',
                    telefoneCliente: '',
                    idUsuario : ''
                })
            }
        })

        .catch(erro => {
            console.log(erro);
            this.setState({ isLoading : false });
        })
    }

    listarUsuario = () => {
        fetch('https://localhost:5001/api/Usuario', {
            headers : {
                'Authorization' : 'Bearer ' + localStorage.getItem('token-login') 
        }
        })

        .then(dados => dados.json())

        .then(dados => this.setState({listaUsuario : dados}))

        .catch(erro => console.log(erro))

    }

    atualizaState = (campo) =>{
        this.setState({[campo.target.name] : campo.target.value})
    }

    componentDidMount(){
        this.listarUsuario()
    }

    render(){
        return(
            <section>
                <section className="header dis ali">
                    <img src={logo} alt="logo sp medical group"/>
                    <a href="/adm"><h3>Início</h3></a>
                </section>

                <section className="content-principal-cadastroUser dis">
                    
                    <img className = "imagemCadastro" src={cadastros} alt=""/>

                    <div className = "contentCadastroPaciente dis ali spa">
                        <form onSubmit={this.novoUsuario} className="inputs-cadastro-paciente coluna ali spa">
                            
                            <h1>Novo Paciente</h1>

                            <input className="input" name="email" value={this.state.email} onChange={this.atualizaState} type="text" placeholder="E-Mail"/>
                            <input className="input" name= "senha" value={this.state.senha} onChange={this.atualizaState} type="text" placeholder="Senha"/>

                            <select className="select" name="idTipo" value={this.state.idTipo} onChange={this.atualizaState}>
                                <option value = "3">Paciente</option>
                            </select>
                            
                            <button type="submit">Adicionar usuário</button>

                        </form>
                        <form onSubmit={this.novoCliente} className="inputs-cadastro coluna ali spa">

                            <input className="input" name="nome" value={this.state.nome} onChange={this.atualizaState} type="text" placeholder="Nome"/>
                            <input className="input" name= "endereco" value={this.state.endereco} onChange={this.atualizaState} type="text" placeholder="Endereço"/>
                            <input className="input" name= "telefoneCliente" value={this.state.telefoneCliente} onChange={this.atualizaState} type="text" placeholder="Telefone"/>
                            <input className="input" name= "rg" value={this.state.rg} onChange={this.atualizaState} type="text" placeholder="RG"/>
                            <input className="input" name= "cpf" value={this.state.cpf} onChange={this.atualizaState} type="text" placeholder="CPF"/>
                            <input className="input" name= "dataNascimento" value={this.state.dataNascimento} onChange={this.atualizaState} type="date"/>

                            <div>
                                <select className="select select2" name="idUsuario" value={this.state.idUsuario} onChange={this.atualizaState}>
                                    <option>Selecione o e-mail escolhido</option>
                                {
                                    this.state.listaUsuario.map(esp => {
                                        return(
                                            <option value={esp.idUsuario}>{esp.email}</option>
                                        )
                                    })
                                }
                                </select>

                                    <img onClick={this.listarUsuario} className = "trash" src = {reload} alt = ''/>
                            </div>
                            
                            <button type="submit">Cadastrar</button>

                        </form>
                    </div>
                    
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