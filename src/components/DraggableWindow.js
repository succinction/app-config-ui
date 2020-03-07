import React from "react";
import styled from "styled-components";
import { TimelineMax, CSSPlugin, ScrollToPlugin, Draggable } from "gsap/all";
const gsapplugins_donotremove = [TimelineMax, CSSPlugin, ScrollToPlugin, Draggable]

class DraggableWindow extends React.Component {
  constructor(props) {
    super(props);
    this.myID = this.props.ID
    this.memory = JSON.parse(localStorage.getItem(`txt_position_${this.myID}`))
    this.handle_memory = JSON.parse(localStorage.getItem(`handle_position_${this.myID}`))
    this.colors = [this.props.colors.foreground, this.props.colors.background] || ["red", "white"]

    // console.log( "this.myID", this.myID , "this.memory.width", this.memory)
    console.log( "window.innerWidth", document.innerWidth)

    // window.clientWidth

    this.state = {
      handleStyle: {
        // position: (true) ? 'absolute' : 'relative',
        position: window.innerWidth > 640 ? 'absolute' : 'static',
        padding: '0px',
        backgroundColor: this.props.colors.extra,
        top: this.handle_memory !== null ? `${this.handle_memory.top}px` : "20px",
        left: this.handle_memory !== null ? `${this.handle_memory.left}px` : "30px",
      },
      styleObj: {
        backgroundColor: "black",
        border: "2px solid #ff0033",
        color: "#ffffff",
        width: this.memory !== null ? `${this.memory.width}px` : "200px",
        height: this.memory !== null ? `${this.memory.height}px` : "200px",
      }
    }
  }

  componentDidMount(context = this) {
    Draggable.create(`#handle_${context.myID}`, {
      trigger: `#trigger_${this.myID}`,
      onDragEnd: function () {
        context.set_position()
      }
    });
  }

  set_position = () => {
    const elem = document.getElementById(`handle_${this.myID}`)
    const rect = elem.getBoundingClientRect();
    const obj = {
      name: "text_area_handler",
      width: elem.clientWidth -12,
      height: elem.clientHeight -87,
      top: Math.round(rect.top),
      left: Math.round(rect.left)
    }
    const JOSN_string = JSON.stringify(obj)
    localStorage.setItem(`handle_position_${this.myID}`, JOSN_string)
  }

  change_color = (event) => {
    this.setState({
      styleObj: {
        backgroundColor: this.BGcolorInput.current.value,
        color: this.colorInput.current.value
      }
    })
  }

  onMouseUpHandler = () => {
    // console.log("here")
    const elem = document.getElementById(`handle_${this.myID}`)
    const rect = elem.getBoundingClientRect();
    const obj = {
      name: "text_area",
      width: elem.clientWidth -12,
      height: elem.clientHeight -87,
      top: Math.round(rect.top),
      left: Math.round(rect.left)
    }
    const JOSN_string = JSON.stringify(obj)
    localStorage.setItem(`txt_position_${this.myID}`, JOSN_string)
  }

  render() {
    return (
      <div id={`area_${this.myID}`} style={{backgroundColor: this.props.colors.extra}} >
        <Window id={`handle_${this.myID}`} style={this.state.handleStyle}   onMouseUp={this.onMouseUpHandler}    >
          <div id={`trigger_${this.myID}`} style={{ backgroundColor: this.props.colors.foreground, color: this.props.colors.background }} >{this.props.title}</div>

          {this.props.children}

        </Window>
      </div>
    );
  }
}

export default DraggableWindow;

const Window = styled.div`
    border-radius: 18px;
    box-shadow: 0px 0px 23px 0px rgba(0,0,0,0.49);
    overflow: hidden;
`