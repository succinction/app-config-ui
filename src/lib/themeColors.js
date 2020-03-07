const colorThemes = [
    ["#023059", "#D9B596", "#275D8C", "#F2E9D8", "#D9B596"]
    , ["#FF80FF", "#B2ff32", "#98B5AB", "#7AFFD2", "#2A6652"]
    , ["blue", "black", "skyblue", "red", "pink"]
    , ["#D90B56", "#503B59", "#A4B3BF", "#35748C", "#F28627"]
    , ["#023059", "#035E72", "#36A59A", "#F56469", "#F5A187"]
    , ["#366CB3", "BLACK", "#80B7FF", "#B38124", "#65A9FF"]
    , ["#1E2D40", "#F2E0BD", "#323232", "#A68C6D", "#403124"]
    , ["#232428", "#736140", "#ADC0D9", "#8FAFD9", "#253C59"]
]

function _getNewColors(arg, saved) {
    saved = saved ? saved : false
    let r = Math.floor(Math.random() * colorThemes.length)
    if (arg !== null) {
        return (
            {
                overall_background: (typeof arg[0] === 'string') ? arg[0] : colorThemes[r][0],
                foreground: (typeof arg[4] === 'string') ? arg[1] : colorThemes[r][1],
                background: (typeof arg[4] === 'string') ? arg[2] : colorThemes[r][2],
                middleground: (typeof arg[4] === 'string') ? arg[3] : colorThemes[r][3],
                extra: (typeof arg[4] === 'string') ? arg[4] : colorThemes[r][4],
                useSaved: saved
            }
        )
    } else {
        return (
            {
                overall_background: colorThemes[r][0],
                foreground: colorThemes[r][1],
                background: colorThemes[r][2],
                middleground: colorThemes[r][3],
                extra: colorThemes[r][4],
                useSaved: saved
            }
        )
    }

}

export const init = (arg = null, saved) => {
    let themeColors
    let stored_obj = JSON.parse(localStorage.getItem('storedColors'))
    let isSaved = !!stored_obj ? stored_obj.useSaved : false
    isSaved = saved !== undefined ? saved : isSaved
    if (!!stored_obj && isSaved === true) {
        themeColors = stored_obj
        themeColors.useSaved = isSaved
    } else {
        themeColors = _getNewColors(arg, isSaved)
    }
    localStorage.setItem('storedColors', JSON.stringify(themeColors))
    return themeColors
}

