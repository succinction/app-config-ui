
import React from "react";
import styled from "styled-components";

class KnockoutText extends React.Component {
  render() {
    // console.log("this.props.src", this.props.src)
    const myID = this.props.ID || "randomID_" + (Math.random() * 3000).toFixed()
    const gradient = this.props.useGradient === undefined ? true : this.props.useGradient
    // console.log("this.props.useGradient", this.props.useGradient)
    // console.log("gradient", gradient)
    const offest_x = this.props.offset_x || "-50%"
    const offest_y = this.props.offset_y || "-50%"
    return (
      <TextWrap ID={myID} >
        <svg viewBox="0 0 700 180">
          <pattern
            id={`p-img_${myID}`}
            viewBox="0 0 400 50"
           patternUnits="userSpaceOnUse"
            width="200%"
            height="200%"
            x={offest_x}
            y={offest_y}
          >
            <image
              href={this.props.src}
              width="400"
              height="200"
            />
          </pattern>
          <text
            textAnchor="middle"
            x="50%"
            y="50%"
            dy=".35em"
            className="img-layer"
          >
            {this.props.txt}
          </text>
          {gradient && <linearGradient id="gr-overlay" x1="0" y1="0" x2="100%" y2="100%">
            <stop stopColor="hsla(50, 100%, 70%, 0.5)" offset="10%" />
            <stop stopColor="hsla(200, 100%, 60%, 0.5)" offset="50%" />
            <stop stopColor="hsla(320, 100%, 50%, 0.5)" offset="90%" />
          </linearGradient>}
          <text
            textAnchor="middle"
            x="50%"
            y="50%"
            dy=".35em"
            className="gradient-layer"
          >
            {this.props.txt}
          </text>
        </svg>
      </TextWrap>
    );
  }
}

export default KnockoutText;

const TextWrap = styled.span`
margin: 0;
position: relative;
width: 100%;

svg {
  width: 100%;
  height: auto;
  font: bold 100px sans-serif;
/*   text-transform: uppercase; */
  
  .img-layer {
    fill: url(#p-img_${props => props.ID});
  }
  
  .gradient-layer {
    fill: url(#gr-overlay);
  }
}

`

// USAGE
//
// {/* <KnockoutText txt="hp" src="https://i.giphy.com/media/NsBknNwmmWE8WU1q2U/giphy.webp" offset_y="-99%" /> */}
// {/* <KnockoutText txt="hp" src="https://i.pinimg.com/originals/46/e6/26/46e6266a0b7b6ffe1c7f9039405e9bb2.gif" offset_y="-99%" /> */}
// {/* <KnockoutText txt="hp" useGradient={false} src="https://www.thisiscolossal.com/wp-content/uploads/2014/03/120430.gif" offset_y="-105%" /> */}
// {/* <KnockoutText txt="joe" src="https://media.tenor.com/images/8b01f4495ab2a550c70b40c98e1faad1/tenor.gif" offset_y="-99%" /> */}



