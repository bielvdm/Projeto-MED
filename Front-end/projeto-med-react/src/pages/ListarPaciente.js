import axios from "axios";
import React,{ Component } from "react";
import logo from "../assets/img/Logo (1).png";
import trash from "../assets/img/trash-alt-solid (1).svg"
import "./style.css";

class ListarPaciente extends Component{
    constructor(props){
        super(props);
        this.state = {
            listaCliente : [],
            idClienteSelecionado : 0 
        }
    }

    listarUsuario = () => {
        fetch('https://localhost:5001/api/Cliente', {
            headers : {
                'Authorization' : 'Bearer ' + localStorage.getItem('token-login') 
        }})

        .then(dados => dados.json())

        .then(dados => this.setState({listaCliente : dados}))

        .catch(erro => console.log(erro))

    }

    excluir = async () => {

        await axios.delete('https://localhost:5001/api/Cliente/'+ this.state.idClienteSelecionado, {
            headers : {
                'Authorization' : 'Bearer ' + localStorage.getItem('token-login') 
        }
        })

        .catch(erro => console.log(erro))

        this.listarUsuario();
    }

    buscarClienteId = async (user) => {
        await this.setState({idClienteSelecionado : user.idCliente})
        this.excluir()
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

                <section className="dis ali cen">
                    <div className="ListaPrincipal">
                        <table>
                            <thead>
                                <td>Nome do Paciente</td>
                                {/* <td>E-Mail</td> */}
                                <td>Endereço</td>
                                <td>RG</td>
                                <td>CPF</td>
                                <td>Telefone</td>
                                <td>Data de nasc.</td>
                                <td>Excluir</td>
                            </thead>
                            
                            <tbody>
                                {
                                    this.state.listaCliente.map((user)=>{
                                        return(
                                        <tr key={user.idCliente}>
                                            <td className="its">{user.nomeCliente}</td>
                                            {/* <td className="its">{user.idUsuarioNavigation.Usuario.email}</td> */}
                                            <td className="its">{user.endereco}</td>
                                            <td className="its">{user.rg}</td>
                                            <td className="its">{user.cpf}</td>
                                            <td className="its">{user.telefoneCliente}</td>
                                            <td className="its">{new Intl.DateTimeFormat('pt-BR').format(new Date(user.dataNascimento))}</td>
                                            <td className="its"><button className = "buttonLista" onClick = {() => this.buscarClienteId(user)}>Excluir <img src={trash} className="trash" alt='lixo'/></button></td>
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

export default ListarPaciente;