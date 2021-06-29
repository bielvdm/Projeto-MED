import { Component } from "react";
import logo from "../assets/img/Logo (1).png"
import lupa from "../assets/img/Vector.png"
import "./style.css"

class consulta extends Component{

    constructor(props){
        super(props);
        this.state = {
            listaConsultas : []
        }
    }

    listarConsulta = () =>{
        fetch('https://localhost:5001/api/Consulta',{ headers : {
            'Authorization' : 'Bearer ' + localStorage.getItem('token-login') 
        }})

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
                <section className="header dis ali spa">
                    <div className="dis ali">
                        <img src= {logo} alt="logo sp medical group"/>
                        <a href="/adm"><h3>Início</h3></a>
                    </div>

                    <div className="pesquisaListar dis ali">
                        <input type="text" placeholder="Pesquisar consulta"/>
                        <img src={lupa} alt="Lupa de pesquisar"/>
                    </div>
                </section>

                <section className="dis ali cen">
                    <div className="ListaPrincipal">
                        <table>
                            <thead>
                                <td>ID</td>
                                <td>Nome Paciente</td>
                                <td>Data</td>
                                <td>Clínica</td>
                                <td>Médico</td>
                                <td>Situação</td>
                            </thead>
                            
                            <tbody>
                                {
                                    this.state.listaConsultas.map((consulta)=>{
                                        return(
                                        <tr key={consulta.idConsulta}>
                                            <td className="its">{consulta.idConsulta}</td>
                                            <td className="its">{consulta.idClienteNavigation.nomeCliente}</td>
                                            <td className="its">{new Intl.DateTimeFormat('pt-BR').format(new Date(consulta.dataConsulta))}</td>
                                            <td className="its">Hospital do coração</td>
                                            <td className="its">{consulta.idMedicoNavigation.nomeMedico}</td>
                                            <td className="its">{consulta.idSituacaoNavigation.idSituacao}</td>
                                        </tr>
                                        )
                                    })
                                }
                                
                            
                            </tbody>
                        </table>
                    </div>
                    
                </section>

            </section>   
        )
    }

}

export default consulta;