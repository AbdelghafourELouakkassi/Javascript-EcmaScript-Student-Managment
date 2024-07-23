import { Endpoint } from "./constant.js";

export default  class Student{
    constructor(name,lastName,age,note){
        this.name=name;
        this.lastName=lastName;
        this.age=age;
        this.note=note;
    }

    static getAge=(age)=>{
        return (new Date().getFullYear() - new Date(age).getFullYear());
    }


    static AllStudents= async ()=>{
        let response= await fetch(Endpoint);
        return response.json()

    }
    static getOneStudent= async function(id){
        const response= await fetch(Endpoint+'/'+id);
        return response.json()

    }

    addNewStudent= async function(newId){
        const response= await fetch(Endpoint,{method:"POST",body:JSON.stringify({
            id:newId+1,
            name:this.name,
            lastName:this.lastName,
            age:this.age,
            note:this.note,
        })})
        return response;
    }
    static updateStudent= async function(id,updatedBody){
        const response= await fetch(Endpoint+'/'+id,{method:"PUT",body:JSON.stringify(updatedBody)})
        return response;
    }
    static deleteStudent= async function(id){
        const response= await fetch(Endpoint+'/'+id,{
            method:'DELETE',
        })
        return response;
    
    }
}