#! /usr/bin/env node
import inquirer from "inquirer";
class Student{
    static counter = 1000;
    Name:string;
    ID:number;
    Balance:number;
    Course:string[];
    constructor(name:string){
        this.Name=name;
        this.ID=Student.counter++;
        this.Balance=1000;
        this.Course=[];
    };
    Enroll(course:string){
        this.Course.push(course);
    };
    stdBalance(){
        console.log(`Balance for ${this.Name}: ${this.Balance}`)
    };
    Pay_fee(Amount:number){
        this.Balance-=Amount;
        console.log(`${Amount} is successfully paid for ${this.Name}`)
    };
    Show_status(){
        console.log(`Name: ${this.Name}`);
        console.log(`ID: ${this.ID}`);
        console.log(`Balance: ${this.Balance}`)
        console.log(`Course: ${this.Course}`)
    }
};

class Student_manager{
    students:Student[];
    constructor(){
        this.students=[];
    };
    add_student(name : string){
        let std= new Student(name);
        this.students.push(std);
        console.log(`${std.Name} is successfully added. Student ID: ${std.ID}`)
    };
    enroll_course(studentid:number, courses:string){
        let stud= this.students.find(stdd=> stdd.ID==studentid);
        if(stud){stud.Enroll(courses)
            console.log(`${stud.Name} has baan successfully enrolled in ${stud.Course}`)
        }else{
            console.log("Student not found. Please enter the correct ID.")
        };
    };
    view_Balance(studentid:number){
        let stud = this.students.find(std=> std.ID ==studentid)
        if(stud){stud.stdBalance()}
        else{
            console.log("Student not found. Please enter the correct ID.")
        }
    };
    std_fee(studentid:number,amount:number){
        let stud = this.students.find(std=> std.ID == studentid)
        if(stud){
            stud.Pay_fee(amount);
        } else{
            console.log("Student not found. Please enter the correct ID.")
        }
    };   
    show_std_status(studentid:number){
        let stud=this.students.find(std=>std.ID==studentid)
        if(stud){
            stud.Show_status()
        }else{
            console.log("Student not found. Please enter the correct ID.")
        }
    }
}
async function main(){
    console.log("WELCOME TO STUDENT MANAGEMENT SYSTEM!");
    console.log("-".repeat(50))
    let student_managerrr= new Student_manager;
    while(true){
        let options = await inquirer.prompt([{
                name:"choice",
                type:"list",
                message:"Select an option",
                choices:[
                    "Add Student",
                    "Enroll Student",
                    "View Student balance",
                    "Pay Fees",
                    "Show Status",
                    "Exit",
                ]
        }]);
       switch(options.choice){
        case "Add Student":
        let name_input= await inquirer.prompt([{
            name:"name",
            type:"input",
            message:"Enter the name of the student",
        }]);
         student_managerrr.add_student(name_input.name)
         break;
        case "Enroll Student":
            let enroll_input = await inquirer.prompt([
                {name : "std_id",
                type : "input",
                message:"Enter the Student ID.",
            },{
                name:"course",
                type:"input",
                message:"Enter the course name."
            }]);
            student_managerrr.enroll_course(enroll_input.std_id,enroll_input.course);
            break;
        case "View Student balance":
            let balance=await inquirer.prompt([{
                name : "std_id",
                type : "input",
                message:"Enter the Student ID.",
            }]);
            student_managerrr.view_Balance(balance.std_id);
            break;
        case "Pay Fees":
            let std_feee= await inquirer.prompt([{
                name : "std_id",
                type : "input",
                message:"Enter the Student ID.", 
            },{
                name : "amountt",
                type : "input",
                message:"Enter the amount to pay.",
            }])
            student_managerrr.std_fee(std_feee.std_id,std_feee.amountt)
            break;
        case "Show Status":
            let status = await inquirer.prompt([
                {name : "std_id",
                type : "input",
                message:"Enter the Student ID.",
                }
            ]);
            student_managerrr.show_std_status(status.std_id);
            break;
            case "Exit":
            console.log("Exiting...");
            process.exit();
            break;
       }
    }
};
main();