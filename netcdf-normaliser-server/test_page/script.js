const inputElement = document.getElementById("input")
inputElement.addEventListenenr("change", handleFiles, false)
function handleFiles() {
    const fileList = this.files
    let file = fileList[0]
    
}