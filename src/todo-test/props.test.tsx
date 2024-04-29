// ko khai báo kiểu type => typeScript bắt lỗi 
//interface là 1 class mà 1 class cũng chính là nguồn của 1 obj 

import { useState } from "react";

//có thể export interface IProps de dùng chổ khác

interface IProps {
    variant : {
        name: string;
        age : number;
        strength: {
            learning: number;
            fighting: number;
        }
        culture? : string
    }; 
    khanhFunc:(value:string) => void; // ko có dau vao param và trả ra void 
    listToDo : string [];
    setListToDo: (v: string []) => void; // ko return giá trị
}


const ToDoAp = (props : IProps) => {
    
   const {strength, culture} = props.variant
   const {khanhFunc,listToDo, setListToDo } = props //Destructuring cùng tên khanhFunc là dc - goi ra để dùng 

   const[job, setJob] = useState("")
   const handleClick = () => {
    khanhFunc('khanh') // mới khai báo dòng 23 rồi - dùng trưc tiep lun ko phải quan prop.khanhFunc
    //LOP CHA TRUYỀN STATE + HÀM -- LOP CON XỬ LÝ RỒI TRẢ LẠI LIST CHO LOP CHA
    setListToDo([...listToDo, job])
    setJob("")
   }


   return(
    <>
    <div style={{ border: "2px solid blue"}}>
        Lop con dc nhận từ lop cha. INfo nang luc hoc: {props.variant.strength.learning}
        Hoac dùng cách đơn giản trích xuất : {strength.learning}
        <button
            onClick={() => handleClick()}
        >Click Nè</button><br/>
        <input type="text" 
            value={job}
            onChange={(event) => {setJob(event.target.value)}}/>
    </div>
    </>
   )
}

export default ToDoAp