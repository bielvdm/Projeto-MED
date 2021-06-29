import React, {Component} from 'react';
import "./style.css";
import logo from "../assets/img/Logo (1).png";
import calendario from "../assets/img/Vector (2).png"
import perfil from "../assets/img/user-regular 1 (1).png"
import relogio from "../assets/img/clock-regular 1 (1).png"
import descricao from "../assets/img/align-left-solid 1 (1).png"
import telefone from "../assets/img/image 1.png"
import instagram from "../assets/img/image 2.png"
import cadastros from "../assets/img/Área de cadastros (3) (1).png"
import axios from 'axios';

class consultaMedico extends Component{
    constructor(props){
        super(props);
        this.state = {
            listaConsultas : [],
            idConsultaAlterada : 0,
            descricao : ''
        }
    }

    listarConsulta = () =>{

        fetch('https://localhost:5001/api/Consulta/medicos', {
            headers : {
                'Authorization' : 'Bearer ' + localStorage.getItem('token-login')
            }
        })

        .then(resposta => resposta.json())

        .then(dados => this.setState({listaConsultas : dados}))

        .catch(erro => console.log(erro))
    }

    componentDidMount(){
        this.listarConsulta();
    }

    buscarIdConsulta = (consulta) => {
        this.setState({idConsultaAlterada : consulta.idConsulta}, () => {console.log(this.state.idConsultaAlterada)})
    }

    atualizarDesc = async (event) => {
        
        event.preventDefault();

        await axios.put('https://localhost:5001/api/Consulta/'+ this.state.idConsultaAlterada, 
        {
            sobreConsulta : this.state.descricao

        }, { headers : {
            'Authorization' : 'Bearer ' + localStorage.getItem('token-login') 
        }})

        .then(resposta => {
            if(resposta.status === 200){
                console.log('Descrição atualizada')
                this.setState({idConsultaAlterada : 0})
            }
        })

        .catch(erro => console.log(erro))

        this.listarConsulta()
    }

    atualizarState = (campo) => {
        this.setState({[campo.target.name] : campo.target.value})
    }

    
    logout = () => {
        localStorage.removeItem('token-login')
    }


    render(){
        
        return(
            
            <section>
                <section className="header dis ali spa">
                    <div className = "dis ali ">
                        <img src={logo} alt="logo sp medical group"/>
                        <a onClick={this.logout} href="/"><h3>Sair</h3></a>
                    </div>

                    <form onSubmit = {this.atualizarDesc}>
                    <div className = {this.state.idConsultaAlterada === 0? 'inputblock': 'inputnone'}>
                        <div className = "dis ali">

                            <input 
                            placeholder='Digite a nova descrição' 
                            type= 'text' value={this.state.descricao} 
                            name="descricao" 
                            onChange = {this.atualizarState}
                            className="inputDescricao"/>

                            <button type="submit" className= "bntDesc">Ok</button>
                        </div>
                    </div>
                </form>
                </section>
                

            <section className="content-principal-medico dis">
                <div className="div-principal-consulta dis">
                    {
                        this.state.listaConsultas.map((dados) => {
                            return(
                                <div className="content-consulta">
                                    <button onClick={() => this.buscarIdConsulta(dados)} className="buttonEditar">+ Editar</button>
                                    <div className="linhaConsulta dis ali">
                                        <img src={calendario} alt="calendario"/>
                                        <p>{new Intl.DateTimeFormat('pt-BR').format(new Date(dados.dataConsulta))}</p>
                                    </div>
                                    <div className="linhaConsulta dis ali">
                                        <img src={perfil} alt="perfil"/>
                                        <p>{dados.idClienteNavigation.nomeCliente}</p>
                                    </div>
                                    <div className="linhaConsulta dis ali">
                                        <img src={relogio} alt="relogio"/>
                                        <p>{dados.idSituacaoNavigation.nomeSituacao}</p>
                                    </div>
                                    <div className="linhaDescricao dis">
                                        <img src={descricao} alt="descricao"/>
                                        <p>{dados.sobreConsulta}</p>       
                                    </div>
                                    
                                </div>
                            )
                        })

                    }
                </div>
                <img className="fotoMedico" src={cadastros} alt="Foto de suas consultas"/>
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

export default consultaMedico;