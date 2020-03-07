import React from 'react';
import body from '../lib/body'
import stacks from '../lib/stacks'
import DraggableWindow from './DraggableWindow'

import { getAppList, getByAppID, postNewEntry, updateEntry, historyOfEntry, recentlyChanged } from '../lib/io'

// const APPCONFIG_DOMAIN = "http://localhost:8080"


class RequestForm extends React.Component {
    constructor(props) {
        super(props)
        this.stack_key = '0'
        this.APPCONFIG_DOMAIN_ARRAY = stacks()
        this.state = {
            content: body.fullMessage("New message", [{ appID: "5", key: "ff_future_enabled", value: "trueness" }])
            , appID: "1"
            , type: "get_list"
            , response: ""
            , output: ""
            , url: `${this.APPCONFIG_DOMAIN_ARRAY[this.stack_key]}/api/1/config/app`
            , entryNum: "0"
        }
        this.appID = "1"
        this.entryNum = "0"
        this.recence = "1"

        this.urls = (x) => ({
            get_list: `${this.APPCONFIG_DOMAIN_ARRAY[this.stack_key]}/api/1/config/app`,
            get_id: `${this.APPCONFIG_DOMAIN_ARRAY[this.stack_key]}/api/1/config/app/${this.appID}`,
            post_entry: `${this.APPCONFIG_DOMAIN_ARRAY[this.stack_key]}/api/1/config/add`,
            put_update: `${this.APPCONFIG_DOMAIN_ARRAY[this.stack_key]}/api/1/config/update`,
            get_history: `${this.APPCONFIG_DOMAIN_ARRAY[this.stack_key]}/api/1/config/history/${this.entryNum}`,
            get_change: `${this.APPCONFIG_DOMAIN_ARRAY[this.stack_key]}/api/1/config/changed/${this.recence}`
        }[x])
        this.input_area = React.createRef()
        this.output_area = React.createRef()
        this.id_input = React.createRef()
        this.key_input = React.createRef()
        this.value_input = React.createRef()
        this.appID_selectorRef = React.createRef()
        this.message_input = React.createRef()
        this.call_selection = React.createRef()
        this.user_name = React.createRef()
        this.user_password = React.createRef()
        this.stack_selector = React.createRef()
    }

    onChangeHandler = (event) => {
        const asJSON = JSON.parse(event.target.value)
        this.setState({
            content: asJSON
        })
        this.message_input.current.value = asJSON.message
        this.id_input.current.value = asJSON.entries[0].id
        this.key_input.current.value = asJSON.entries[0].key
        this.value_input.current.value = asJSON.entries[0].value
        if (this.appID_selectorRef) {
            this.appID_selectorRef.current.value = asJSON.entries[0].appID
        }
    }

    toInput = (newContent) => {
        this.setState({
            content: newContent
        })
        const formatted = JSON.stringify(newContent, undefined, 2)
        this.input_area.current.value = formatted
    }

    message_onChangeHandler = (event) => {
        const entryObj = this.state.content.entries
        const newContent = body.fullMessage(event.target.value, entryObj)
        this.toInput(newContent)
    }

    id_onChangeHandler = (event) => {
        const entryObj = this.state.content.entries
        if (event.target.value === '') {
            delete entryObj[this.state.entryNum].id
        } else {
            entryObj[this.state.entryNum] = body.entry({ ...entryObj[0], id: event.target.value })
        }
        const msg = this.state.content.message
        const newContent = body.fullMessage(msg, entryObj)
        this.toInput(newContent)
    }

    entryNum_onChangeHandler = (event) => {
        if (this.state.type === 'get_history') {
            this.setState({
                entryNum: event.target.value
            })
            this.entryNum = event.target.value
        } else if (this.state.type === 'get_change') {
            this.recence = event.target.value
        }
        this.setState({
            url: this.urls(this.state.type)
        })
    }

    appID_onChangeHandler = (event) => {
        if (this.state.type === 'post_entry') {
            const entryObj = this.state.content.entries
            entryObj[this.state.entryNum].appID = event.target.value
            const msg = this.state.content.message
            const newContent = body.fullMessage(msg, entryObj)
            this.toInput(newContent)
        } else if (this.state.type === 'get_id') {
            this.appID = event.target.value
            this.setState({
                appID: event.target.value,
                url: this.urls(this.state.type)
            })
        }
    }

    key_onChangeHandler = (event) => {
        const entryObj = this.state.content.entries
        entryObj[this.state.entryNum].key = event.target.value
        const msg = this.state.content.message
        const newContent = body.fullMessage(msg, entryObj)
        this.toInput(newContent)
    }

    value_onChangeHandler = (event) => {
        const entryObj = this.state.content.entries
        entryObj[this.state.entryNum].value = event.target.value
        const msg = this.state.content.message
        const newContent = body.fullMessage(msg, entryObj)
        this.toInput(newContent)
    }

    selectCall = (event) => {
        const isArgString = (typeof event === 'string')
        const newType = isArgString ? event : event.target.value
        if (isArgString) document.getElementById('call_selector').value = newType
        const entryObj = this.state.content.entries
        const contentValue = body.fullMessage("", entryObj)
        this.setState({
            type: newType,
            content: contentValue
            ,
            url: this.urls(newType)
        })
        const formatted = JSON.stringify(contentValue, undefined, 2)
        if (newType === "post_entry" || newType === "put_update") {
            setTimeout(
                () => {
                    this.input_area.current.value = formatted
                }
                ,
                5
            )
        }
    }
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    submitForm = (event) => {
        event.preventDefault()
        // console.log("submit form button clicked")
    }

    // resizeElement = (event) => {
    //     event.preventDefault()
    //     const ta = event.target;
    //     console.log('size change ' + ta.clientWidth + '  ' + ta.clientHeight);
    // }

    get_byAppID_action = async (event) => {
        event.preventDefault()
        let response = await getByAppID(this.appID, this.stack_key)
        this.output_area.current.value = JSON.stringify(response, undefined, 2)
    }

    get_list_action = async (event) => {
        event.preventDefault()
        let response = await getAppList(this.stack_key)
        this.output_area.current.value = JSON.stringify(response, undefined, 2)
    }

    post_entry_acion = async (event) => {
        event.preventDefault()
        const newContent = this.state.content
        for (let entry of newContent.entries) {
            delete entry.id
        }
        let response = await postNewEntry(newContent, this.stack_key)
        this.output_area.current.value = JSON.stringify(response, undefined, 2)
    }

    put_updateEntry_action = async (event) => {
        event.preventDefault()
        const newContent = this.state.content
        delete newContent.id
        let response = await updateEntry(newContent, this.stack_key)
        this.output_area.current.value = JSON.stringify(response, undefined, 2)
    }

    get_historyOfEntry_action = async (event) => {
        event.preventDefault()
        let response = await historyOfEntry(this.state.entryNum, this.stack_key)
        this.output_area.current.value = JSON.stringify(response, undefined, 2)
    }

    get_recentlyChanged_action = async (event) => {
        event.preventDefault()
        let response = await recentlyChanged(this.recence, this.stack_key)
        this.output_area.current.value = JSON.stringify(response, undefined, 2)
    }

    go_btn = (event) => {
        event.preventDefault()
        switch (this.state.type) {
            case "get_list":
                this.get_list_action(event)
                break;
            case "get_id":
                this.get_byAppID_action(event)
                break;
            case "post_entry":
                this.post_entry_acion(event)
                break;
            case "put_update":
                this.put_updateEntry_action(event)
                break;
            case "get_history":
                this.get_historyOfEntry_action(event)
                break;
            case "get_change":
                this.get_recentlyChanged_action(event)
                break;
            default:
        }
    }

    insert_entry = (e) => {
        e.preventDefault()
        const newContent = this.state.content
        const newEntry = body.entry({ appID: "3", key: "ff__enabled", value: "new" })
        newContent.entries.push(newEntry)
        this.toInput(newContent)
    }

    multiplyEntriesWidget = () => {
        const test = (e) => {
            e.preventDefault()
            this.setState({
                entryNum: e.target.value
            })
        }
        return (
            <div>
                {this.state.entryNum}
                {"  "}
                <a id={`form_entry_test`} onClick={test} >Entries</a>
                {"  "}
                {this.state.content.entries.map((entry, i) => {
                    return <button key={i} id={`form_entry_${i}`} onClick={test} value={i} >{i}</button>
                })}
                <button id={`form_entry_add`} onClick={this.insert_entry} >+</button>
            </div>
        )
    }

    clear_action = () => {

        this.output_area.current.value = ""
    }

    // userName_onChange = (e) => {
    //     const user = e.target.value
    //     localStorage.setItem('A', user)
    // }

    // password_onChange = (e) => {
    //     const pass = e.target.value
    //     localStorage.setItem('B', pass)
    // }

    stackSelector_onChange = e => {
        this.stack_key = e.target.value
        this.setState({
            url: this.urls(this.state.type)
        })
    }


    render() {
        const { foreground, background, middleground, extra } = this.props.colorTheme
        this.memory_output = JSON.parse(localStorage.getItem("txt_position_main_output_area"))
        this.memory_input = JSON.parse(localStorage.getItem("txt_position_main_input_area"))
        const output_styleObj = {
            fontSize: '1rem',
            color: foreground,
            backgroundColor: background,
            border: `4px solid ${middleground}`,
            width: this.memory_output !== null ? `${this.memory_output.width}px` : "200px",
            height: this.memory_output !== null ? `${this.memory_output.height}px` : "200px",
        }
        const styleObj = {
            fontSize: '1rem',
            color: foreground,
            backgroundColor: background,
            border: `4px solid ${middleground}`,
            width: this.memory_input !== null ? `${this.memory_input.width}px` : "200px",
            height: this.memory_input !== null ? `${this.memory_input.height}px` : "200px",
        }
        const formStyle = {
            display: "flex",
            flexDirection: "column",
            alignItems: "left",
            justifyContent: "left",
            backgroundColor: extra,
            // padding: "20px"
        }
        const appID_selector = (
            <select ref={this.appID_selectorRef} onChange={this.appID_onChangeHandler}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
            </select>
        )

        const dom_selector = (
            <div style={{ fontSize: "1rem" }}>
                <select id="stack_selector" ref={this.stack_selector} onChange={this.stackSelector_onChange}   >
                    {this.APPCONFIG_DOMAIN_ARRAY.map((stack, i) => <option key={i} value={i} >{stack}</option>)}
                </select>
            </div>
        )

        const api_selector = (
            <div style={{ fontSize: "1rem" }}>

                <select id="call_selector" ref={this.call_selection} onChange={this.selectCall}   >
                    <option value="get_list">GET app list</option>
                    <option value="get_id">GET appconfig by app id</option>
                    <option value="post_entry">POST new appconfig entry</option>
                    <option value="put_update">PUT update appconfig entry</option>
                    <option value="get_history">GET history of entry</option>
                    <option value="get_change">GET recently changed entries</option>
                </select>
                {"   "} {this.state.type === "get_id" && appID_selector}
                {(this.state.type === "get_history" || this.state.type === "get_change") &&
                    <input id="entryNum_input" ref={this.entryNum_input} type="number" min="0" max="99990" placeholder="" onChange={this.entryNum_onChangeHandler}  ></input>
                }
            </div>
        )

        return (
            <div>
                <br />
                <DraggableWindow ID="api_buttons" title={this.state.url} colors={this.props.colorTheme} >
                    <div style={{...formStyle, ...{display: 'flex' , flexDirection: 'row'}}}>
                        <button onClick={() => this.selectCall("get_list")} >GET app list</button>
                        <button onClick={() => this.selectCall("get_id")} >GET appconfig by app id</button>
                        <button onClick={() => this.selectCall("post_entry")} >POST new appconfig entry</button>
                        <button onClick={() => this.selectCall("put_update")} >PUT update appconfig entry</button>
                        <button onClick={() => this.selectCall("get_history")} >GET history of entry</button>
                        <button onClick={() => this.selectCall("get_change")} >GET recently changed entries</button>
                    </div>
                </DraggableWindow>
                <br />
                Choose Domain: {" "} {dom_selector}
                Choose Endpoint: {" "} {api_selector}
                <label >{this.state.url}</label>
                {"  "}
                <button style={{ fontSize: '2rem' }} onClick={this.go_btn}>GO</button>
                <br />
                <br />
                {/* {(this.state.type === "post_entry" || this.state.type === "put_update") && */}
                <DraggableWindow ID="main_input_area" title="Post Body JSON" colors={this.props.colorTheme} >
                    <div style={formStyle}>
                        <span style={{ display: 'flex', fontSize: '1rem' }} >
                            {dom_selector}
                            {api_selector}
                        </span>
                        <span style={{ display: 'flex', fontSize: '1rem' }} >
                            {this.state.url}  {" >> "} <button onClick={this.go_btn}>GO</button>
                        </span>
                        <textarea ref={this.input_area} id="input_area_0" spellCheck="false" style={styleObj} rows={22} cols={56} onChange={this.onChangeHandler} ></textarea>
                    </div>
                </DraggableWindow>
                {/* } */}
                <DraggableWindow ID="main_output_area" title={this.state.url.substr(this.APPCONFIG_DOMAIN_ARRAY[this.stack_key].length)} colors={this.props.colorTheme} >
                    {/* <DraggableWindow ID="main_output_area" title={this.state.url} colors={this.props.colorTheme} > */}
                    <div style={formStyle}>
                        <span style={{ display: 'flex' }} >
                            <button onClick={this.get_list_action} >Get List</button>
                            <button onClick={this.clear_action} >CLEAR</button>
                        </span>
                        {/* <span id="textarea_container" style={{ backgroundColor: extra, padding: '0' }} > */}
                        <textarea ref={this.output_area} id="output_area_1" style={output_styleObj} rows={22} cols={56} ></textarea>
                        {/* </span> */}
                    </div>
                </DraggableWindow>
                <br />
                {this.state.type === "get_id" &&
                    <div style={formStyle}>
                        <label>appID</label> {"  "}
                        {appID_selector}
                    </div>
                }
                {/* {(this.state.type === "post_entry" || this.state.type === "put_update") && */}
                <DraggableWindow ID="form" title="Post Body" colors={this.props.colorTheme} >
                    <div style={{...formStyle, padding: '1rem'}}>
                        <label>message</label> {"  "}
                        <input id="message_input1" ref={this.message_input} type="text" placeholder="message" onChange={this.message_onChangeHandler}  ></input>
                        {this.multiplyEntriesWidget()}
                        {/* <br /> */}
                        <label>id</label> {"  "}
                        <input id="id_input1" ref={this.id_input} type="number" placeholder="id" onChange={this.id_onChangeHandler}  ></input>
                        <label>appID</label> {"  "}
                        {appID_selector}
                        <label>key</label> {"  "}
                        <input id="key_input" ref={this.key_input} type="text" placeholder="key" onChange={this.key_onChangeHandler}  ></input>
                        <label>value</label> {"  "}
                        <input id="value_input" ref={this.value_input} type="text" placeholder="value" onChange={this.value_onChangeHandler}  ></input>
                    </div>
                </DraggableWindow>
                {/* } */}
                <br />
                <hr />
                <br />
                {/* <button onClick={this.submitForm}>submit</button> */}
            </div>
        );
    }
}

export default RequestForm;


