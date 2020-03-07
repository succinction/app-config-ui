import React from 'react';

class ColorThemer extends React.Component {
    constructor(props) {
        super(props)
        this.color_input1 = React.createRef()
        this.color_input2 = React.createRef()
        this.color_input3 = React.createRef()
        this.color_input4 = React.createRef()
        this.color_input5 = React.createRef()
        this.use_saved = React.createRef()
        this.use_position_relative = React.createRef()
        this.changeColors = this.changeColors.bind(this)
    }

    componentDidMount() {
        let themeColors = JSON.parse(localStorage.getItem('storedColors'))
        if (themeColors.useSaved === true) {
            this.use_saved.current.checked = true
        } else {
            this.use_saved.current.checked = false
        }
        
        // if (themeColors.useRelative === true) {
        //     this.use_saved.current.checked = true
        // } else {
        //     this.use_saved.current.checked = false
        // }

    }

    bypass() {
        const newColors = [
            this.color_input1.current.value,
            this.color_input2.current.value,
            this.color_input3.current.value,
            this.color_input4.current.value,
            this.color_input5.current.value
        ]
        const save_checked = this.use_saved.current.checked
        // const relative_checked = this.use_position_relative.current.checked
        this.props.changeColorFn(newColors, save_checked)
    }

    lockColors = (event) => {
        let themeColors = JSON.parse(localStorage.getItem('storedColors'))
        themeColors.useSaved = event.target.checked
        localStorage.setItem('storedColors', JSON.stringify(themeColors))
    }

    // positioningHandler = (event) => {
    //     let themeColors = JSON.parse(localStorage.getItem('storedColors'))
    //     themeColors.useRelative = event.target.checked
    //     localStorage.setItem('storedColors', JSON.stringify(themeColors))
    // }

    changeColors(event) {
        event.preventDefault()
        this.bypass()
    }

    render() {
        let themeColors = JSON.parse(localStorage.getItem('storedColors'))
        return (
            <div>
                <form name="colorform" style={{  padding: "18px", fontSize: "1rem" }}>
                    Overall <br /><input ref={this.color_input1} type="text" defaultValue={themeColors.overall_background} ></input><br />
                    Foreground <br /><input ref={this.color_input2} type="text" defaultValue={themeColors.foreground} ></input><br />
                    Background <br /><input ref={this.color_input3} type="text" defaultValue={themeColors.background} ></input><br />
                    Middleground <br /><input ref={this.color_input4} type="text" defaultValue={themeColors.middleground} ></input><br />
                    Secondary <br /><input ref={this.color_input5} type="text" defaultValue={themeColors.extra} ></input><br />
                    <button onClick={this.changeColors} >Change Colors</button><br />
                    Lock colors? <input ref={this.use_saved} type="checkbox" value="should_save" onChange={this.lockColors}></input>
                    {/* position: relative? <input ref={this.use_position_relative} type="checkbox" value="use_relative" onChange={this.positioningHandler}></input> */}
                </form>
            </div>
        );
    }
}

export default ColorThemer;