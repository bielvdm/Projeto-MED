import React, { Component} from 'react';
import logo from "../assets/img/Logo (1).png";
import telefone from "../assets/img/image 1.png";
import instagram from "../assets/img/image 2.png";
import adm from "../assets/img/Foto escolha adm.png";
import "./style.css";

class telaADM extends Component{
    logout = () => {
        localStorage.removeItem('token-login')
    }

    render(){
        return (
            <section>
                <section className="header dis ali">
                <img src={logo} alt="logo sp medical group"/>
                <a onClick = {this.logout} href="/"><h3>Sair</h3></a>
            </section>

            <section class="content-principal-adm dis ali">
                
                <img src={adm} alt=""/>

                <div class="opcoes coluna ali spa">
                    <h1>Opções do administrador</h1>
                    <div>
                        <a href="/cadastroMedico"><button>Novo médico</button></a>
                        <a href="/cadastroClinica"><button>Nova clínica</button></a>
                    </div>

                    <div>
                        <a href="/cadastroUsuario"><button>Novo paciente</button></a>
                        <a href="/cadastroConsulta"><button>Nova consulta</button></a>
                    </div>

                    <div>
                        <a href="/ListarPaciente"><button>Listar paciente</button></a>
                        <a href="/consulta"><button>Listar consultas</button></a>
                    </div>
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

export default telaADM;