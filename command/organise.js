
let fs = require("fs");
let path = require("path");
let types = {
    media: ["mp4", "mkv"],
    archives: ['zip', '7z', 'rar', 'tar', 'gz', 'ar', 'iso', "xz"],
    documents: ['docx', 'doc', 'pdf', 'xlsx', 'xls', 'odt', 'ods', 'odp', 'odg', 'odf', 'txt', 'ps', 'tex'],
    app: ['exe', 'dmg', 'pkg', "deb"]
}


function organiseFn(src){
    // work to do:
    //1. Input -> directory path given  -> create organised_files name Directory.
    //2. check all files category present in the given directory path
    //3. copy files to that organised directory in their respective folder
    let finalPath;
    if(src==undefined){
        console.log("Enter Valid Path");
        return;
    }else{
        let ifExist = fs.existsSync(src);
        if(ifExist){
         // directory creation will be done. 
         finalPath = path.join(src,"organised_files");
        //later on check lga skte hai ki ye folder already exist krta hai ki nhi
         fs.mkdirSync(finalPath);
        }else{
            console.log("Enter Valid Path");
            return;
        }
    }

    organiseFiles(src,finalPath);

}

function organiseFiles(src,dest){
    // category pta krenge ki kis kis type ki files hai
    let fileType = fs.readdirSync(src);
    for(let i=0;i<fileType.length;i++){
        // file ka path nikal rhe 
      let filepath =  path.join(src,fileType[i]);
      // file ka status check 
       let status = fs.lstatSync(filepath);
       //check krenge ki kaun se type ka hai file hai ya folder
       if(status.isFile()){
         let type = getType(fileType[i]);
        // console.log(fileType[i]+" belong to  "+type);
         // Files ko unke respective folders me daal denge 
         copyFiles(filepath,dest,type);
       }

    }
}

function copyFiles(src, dest, type){
    
    let typePath = path.join(dest,type);
// check kr lenge ye folder already hai ki nhi agr exist hua to create nhi krenge
    if(fs.existsSync(typePath)==false){
          //path pta knre ke baad yha jo bhi type hoga uska folder bnayenge.
         fs.mkdirSync(typePath);
    }
    
    // basename pta krenge taaki use uske respective folder me bhej ske
    let basename = path.basename(src);
    // final destination path nikalenge jha copy krna hai
    let destPath = path.join(typePath,basename);
    // copy kr denge
    fs.copyFileSync(src,destPath);

}

function getType(filename){
    let ext = path.extname(filename);
    //dot htane ke liye
    ext = ext.slice(1);
   // console.log(ext);
    for(let type in types){
        let folderType =  types[type];
        for(let i=0;i<folderType.length;i++){
            if(ext == folderType[i]){
                return type;
            }
        }
    }
    return "others";
}

module.exports ={
    organisekey:organiseFn
}