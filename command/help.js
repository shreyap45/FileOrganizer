

function helpFn(){
    console.log(`List Of All Command:
    1. node main.js tree to See Folder Structure
    2. node main.js organise "directoryPath"
    3. node main.js help
    `);
}

module.exports ={
    helpkey:helpFn,
}