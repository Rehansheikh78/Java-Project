import React, { useEffect, useState } from 'react';
import { useNavigate,useParams } from 'react-router-dom';
import EmployeeService from '../services/EmployeeService';



function UpdateEmployee() 
{
    let navigate = useNavigate();
    const {id} = useParams();

    const [name,setName] = useState("");
    const [doj,setDoj] = useState("");
    const [department,setDepartment] = useState({deptName:"",designation:""});

    const handleCancel = (e)=>{
        e.preventDefault();
        navigate("/");
    }

    useEffect(() => {

        EmployeeService.getEmployeeById(id).then(res => {

            const formatDate = (date) => {
                const [dd, mm, yyyy] = date.split("-");
                return `${yyyy}-${mm}-${dd}`;
            }

            setName(res.data.name);

            setDoj(formatDate(res.data.doj));

            setDepartment({
                deptName: res.data.dept.deptName,
                designation: res.data.dept.designation
            })
        })

    }, [])
    
    const handleUpdate = (e)=>{
        e.preventDefault();

        const updateEmployee={
            name,
            doj,
            dept:{
                deptName: department.deptName,
                designation: department.designation
            }
        }
        EmployeeService.updateEmployee(id,updateEmployee).then(res=>{
            navigate("/");
        })
    }


  return (
     <div className="mt-5">
        <div className="container pt-5">
        <div className="card w-50 p-3 offset-3">
            <h5 className="text-center py-3">Update Employee details</h5>
            <form className="form">
                <label> Name:</label>
                <input type="text" id="name" name="name" className="form-control"
                onChange={(e)=> setName(e.target.value)}
                value={name}
                />
                <br />
                
                <label> DoJ:</label>
                <input type="date" id="doj" name="doj" className="form-control"
                onChange={(e)=> setDoj(e.target.value)}
                value={doj}
                />
                <br />
                
                <label> Department:</label>
                <input type="text" id="deptName" name="deptName" className="form-control"
                onChange={(e)=> setDepartment({...department,deptName:e.target.value})}
                value={department.deptName}
                />
                <br />

                <label> Designation:</label>
                <input type="text" id="designation" name="designation" className="form-control"
                onChange={(e)=> setDepartment({...department,designation:e.target.value})}
                value={department.designation}
                />
                <br />
                
                <div className="d-flex gap-2">
                    <button className="btn btn-danger mt-3 w-50" onClick={handleCancel}>Cancel</button>
                    <button className="btn btn-warning mt-3 w-50" onClick={handleUpdate}>Update</button>
                </div>
            </form>
        </div>
        </div>
    </div>
  )
}

export default UpdateEmployee
