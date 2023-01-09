function checkForInput(inputText) {
    var regex = /^\s*$/ ;
    if (regex.test(inputText)) {
        return false
    }else{
        return true
    }
}

export { checkForInput }
