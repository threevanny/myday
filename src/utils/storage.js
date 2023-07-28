const DB = {
    "name": "MyDay"
};

DB.write = (data)=> {
   localStorage.setItem(DB.name, JSON.stringify(data));
}

DB.read = ()=> {
    return JSON.parse(localStorage.getItem(DB.name));
}

export default DB;