
let helpObj =require("./command/help");
let organiseObj =require("./command/organise");
let treeObj =require("./command/tree");


let input = process.argv.slice(2);
let  command = input[0];
let path = input[1];
// console.log(input);
switch(command){
    case "tree":
        treeObj.treeKey(path); 
        break;
    case "organise":
        organiseObj.organisekey(path);
        break;
    case "help":
        helpObj.helpkey();
        break;
    default:
        console.log("Enter Correct Command");
        break;
}

