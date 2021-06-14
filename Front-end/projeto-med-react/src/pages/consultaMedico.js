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

class consultaMedico extends Component{
    constructor(props){
        super(props);
        this.state = {
            listaConsultas : []
        }
    }

    listarConsulta = () =>{
        fetch('https://localhost:5001/api/Consulta/suas', {
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

    render(){
        return(
            <section>
                <section className="header dis ali">
                <img src={logo} alt="logo sp medical group"/>
                <a href="/"><h3>Sair</h3></a>
            </section>

            <section className="content-principal-medico dis">
                <div className="div-principal-consulta dis">
                    {
                        this.state.listaConsultas.map((dados) => {
                            return(
                                <div className="content-consulta">
                                    <a href="">+ Editar</a>
                                    <div className="linhaConsulta dis ali">
                                        <img src={calendario} alt="calendario"/>
                                        <p>{new Intl.DateTimeFormat('pt-BR').format(new Date(dados.dataConsulta))}</p>
                                    </div>
                                    <div className="linhaConsulta dis ali">
                                        <img src={perfil} alt="perfil"/>
                                        <p>ID do cliente: {dados.idCliente}</p>
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