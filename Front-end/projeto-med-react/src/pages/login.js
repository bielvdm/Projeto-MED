import {Component} from 'react';
import telefone from "../assets/img/image 1.png";
import instagram from "../assets/img/image 2.png";
import logo from "../assets/img/Logo (1).png";
// import logo2 from "../assets/img/Logo (2).png"
import fotoLogin from "../assets/img/foto login.png"
import banner from "../assets/img/Foto Banner.png"
import "./style.css";
// import TextoSlide from '../components/carrossel';
import axios from 'axios'
import { parseJwt } from '../services/auth'

class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
            email : '',
            senha : '',
            erroMensagem : '',
            isLoading : false
        }

    }

    funcaoLogin =(event)=>{

        event.preventDefault();

        this.setState({erroMensagem : '', isLoading : true})

        axios.post('https://localhost:5001/api/Login', {
            email : this.state.email,
            senha : this.state.senha
        })

        .then(resposta => {
            if(resposta.status === 200){
                localStorage.setItem('token-login', resposta.data.token)
                this.setState({isLoading : false})
                
                if (parseJwt().role === '1') {

                    this.props.history.push('/adm');

                } else if (parseJwt().role === '2'){

                    this.props.history.push('/consultaMedico');

                }
                else {
                    this.props.history.push('/consultaCliente')
                }

            }
        })

        .catch(()=> this.setState({erroMensagem: 'E-Mail ou Senha incorreto(s)', isLoading: false}))

    }

    funcaoMudaState =(campo)=>{
        this.setState({[campo.target.name] : campo.target.value})
    }


    render(){
        return(
            <section>
                <section className="banner dis spa">
                    <div className="content-banner coluna spa">
                        <img src={logo} alt="Logo sp medical group"/>
                        <h4>A melhor rede de clínicas médicas de SP reunidas em um único grupo</h4>
                        <h4>Venha fazer parte da nossa rede</h4>
                        <a href="#footer"><button>Nos contate</button></a>
                    </div>
                    <div className="fotobanner">
                        <img src={banner} alt="Desenho de um médico"/>
                    </div>
                </section>
            

            <section className="login dis ali spa">

                <img src={fotoLogin} alt=""/>

                <form onSubmit={this.funcaoLogin} className="inputs coluna spa ali">
                    <h2>Faça seu login</h2>
                    <input name="email" type="email" onChange={this.funcaoMudaState} placeholder="E-Mail"/>
                    <input name= "senha" type="password" onChange={this.funcaoMudaState} placeholder="Senha"/>
                    
                    <p>{this.state.erroMensagem}</p>

                    {
                        this.state.isLoading === true && <button type="submit" disabled>Carregando...</button>
                    }

                    {
                        this.state.isLoading === false && <button type="submit" 
                        disabled={this.state.email === '' || this.state.senha === ''? 'none' : ''}>Login</button>
                    }
                    
                    <p>Esqueci minha senha</p>
                </form>

            </section>

            {/* <section className="especialidades coluna ali">

                <img src={logo2} alt="Logo da seção especialidades"/>

                <div className="content-especialidades dis spa ">
                    <TextoSlide/>
                </div>
            </section> */}

            <footer id="footer" className="dis ali spaa">

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

export default Login;