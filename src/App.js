// HPC3-1851

import React from 'react';
import logo from './logo.svg';
import './App.css';
import RequestForm from './components/RequestForm'
import ColorThemer from './components/ColorThemer'
import KnockoutText from './components/KnockoutText'
import DraggableWindow from './components/DraggableWindow'
import { init } from './lib/themeColors'
import styled from 'styled-components'
import { Draggable } from "gsap/all";


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      themeColors: init()
    }
    this.changeColor = this.changeColor.bind(this)
  }

  componentDidMount() {
    Draggable.create(`#logo_container`);
  }



  changeColor(colors, saved) {
    this.setState({
      themeColors: init(colors, saved)
    })
  }

  userName_onChange = (e) => {
    const user = e.target.value
    localStorage.setItem('A', user)
  }

  password_onChange = (e) => {
    const pass = e.target.value
    localStorage.setItem('B', pass)
  }


  render() {
    const gifs = [
      ["https://i.giphy.com/media/NsBknNwmmWE8WU1q2U/giphy.webp", "-99%"],
      ["https://i.pinimg.com/originals/46/e6/26/46e6266a0b7b6ffe1c7f9039405e9bb2.gif", "89%"],
      ["https://www.thisiscolossal.com/wp-content/uploads/2014/03/120430.gif", "75%"],
      ["https://media.tenor.com/images/8b01f4495ab2a550c70b40c98e1faad1/tenor.gif", "-900%"]
    ]
    const rand = Math.floor(Math.random() * gifs.length)
    return (
      <div className="App" style={{ background: `${this.state.themeColors.overall_background}` }}>
        <header className="App-header" style={{ background: `linear-gradient(to top, ${this.state.themeColors.foreground} 0%, ${this.state.themeColors.overall_background} 100%)` }}>

          <Nav id="nav" >

            <span style={{ width: '26rem' }} >

              {/* <KnockoutText txt="AppConfig" src="https://i.giphy.com/media/NsBknNwmmWE8WU1q2U/giphy.webp" offset_y="-99%" /> */}
              <KnockoutText txt="AppConfig" src={`${gifs[rand][0]}`} offset_y={`${gifs[rand][1]}`} />
            </span>

            <Auth style={{ fontSize: "1rem", textAlign: "right" }} >
              <AuthRow>
                <label >UserName: </label>
                <input id="user_name" ref={this.user_name} type="text" onChange={this.userName_onChange}  ></input><br />
              </AuthRow>
              <AuthRow>
                <label >Password: </label>
                <input id="user_password" ref={this.user_password} type="password" onChange={this.password_onChange} ></input><br />
              </AuthRow>
            </Auth>
          </Nav>
          <RequestForm colorTheme={this.state.themeColors} />

          <a
            className="App-link"
            href="http://www.unsoundart.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            unsoundart.com
        </a>


          <DraggableWindow ID="color_pallet" title="Colors" colors={this.state.themeColors} >
            <ColorThemer changeColorFn={this.changeColor} />
          </DraggableWindow>

          {/* <div id="logo_container" >
            <img src={logo} className="App-logo" alt="logo" />
          </div> */}


        </header>
      </div>
    );
  }
}

export default App;


const Nav = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const Auth = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const AuthRow = styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;
border: dotted 1px;
align-items: right;
`

