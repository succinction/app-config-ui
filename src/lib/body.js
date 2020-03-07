

// import axios from 'axios'


const entry = ({ id = '', appID = '', key = '', value = '' }) => JSON.parse(`{
    ${id !== '' ? ` "id": "${id}"` : ''}
    ${id !== '' && (appID !== '' || key !== '' || value !== '') ? ` ,` : ''}
    ${appID !== '' ? ` "appID": "${appID}"` : ''}
    ${(id !== '' || appID !== '') && (key !== '' || value !== '') ? ` ,` : ''}
    ${key !== '' ? ` "key": "${key}"` : ''}
    ${(id !== '' || appID !== '' || key !== '') && (value !== '') ? ` ,` : ''}
    ${value !== '' ? ` "value": "${value}"` : ''}
}`)


const simpleBody = (msg = '', entry = "") => JSON.parse(`{
	"message": "${msg}",
	"entries": [
		${entry}        
	]
}`)


const fullMessage = (msg = '', entrys = '') => {
    let parsed = JSON.parse(`{
        ${msg !== '' ? `"message": "${msg}",` : ''}
        "entries": [
            ${ (typeof entrys === 'string') ? entrys : entrys.map((entry, i) => {
                return i > 0 ? '' + JSON.stringify(entry) : JSON.stringify(entry)
            })}        
        ]
    }`)
    return parsed
}

module.exports = {
    simpleBody,
    entry,
    fullMessage
}




//  `{
// 	"message": "${msg}",
// 	"entries": [
		// {
		// 	"id": 218,
		// 	"appID": 3,
		// 	"key": "1",
		// 	"value": "UPDATEDONE"
        // }
        // ,
		// {
		// 	"id": 219,
		// 	"appID": 3,
		// 	"key": "2",
		// 	"value": "UPDATEDTWO"
        // }
        // ,
		// {
		// 	"id": 220,
		// 	"appID": 3,
		// 	"key": "3",
		// 	"value": "UPDATEDONETHREE"
		// }
// 	]
// }`