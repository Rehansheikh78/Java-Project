import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EmployeeService from '../services/EmployeeService';

function CreateEmployee() 
{
    const navigate = useNavigate();

    const [employees,setEmployees] = useState({
        name:"",
        doj:"",
        dept:{
            deptName:"",
            designation:""
    }	
    })

    const [errors,setErrors] = useState({
        name:"",
        doj:"",
        deptName:"",
        designation:""
    })

    const handleCancel = (e)=>{
        e.preventDefault();
        navigate("/");
    }

    const dateFormat=(date)=>{
        const d = new Date(date);
        const day = String(d.getDate()).padStart(2,"0");
        const month = String(d.getMonth()+1).padStart(2,"0");
        const year = d.getFullYear();
        return `${day}-${month}-${year}`;
    }

    const handleSave = (e)=>{
        e.preventDefault();

        if(validate())
        {
            const formattedDate = dateFormat(employees.doj);
            const employeeData=
            {
                ...employees,doj:formattedDate
            }
            EmployeeService.addEmployee(employeeData).then(res=>{
                navigate("/");
            })
        }
    }

    const validate=(e) =>{
        const formErrors = {};
        let isValid=true;

        if(!employees.name)
        {
            formErrors.name="Name is mandatory";
            isValid=false;
        }
        if(!employees.doj)
        {
            formErrors.doj="Date is mandatory";
            isValid=false;
        }
        if(!employees.dept.deptName)
        {
            formErrors.deptName="Department is mandatory";
            isValid=false;
        }
        if(!employees.dept.designation)
        {
            formErrors.designation="Designation is mandatory";
            isValid=false;
        }
        setErrors(formErrors);
        return isValid;
    }

    const handleChange = (e)=>{
        e.preventDefault();

        const {name,value} = e.target;
        if(name=="name" || name=="doj")
        {
            setEmployees({...employees,[name]:value});
        }
        else
        {
            setEmployees({...employees,dept:{...employees.dept,[name]:value}});
        }
        setErrors({...errors,[name]:""});
    }


  return (
    
    <div className="mt-5">
        <div className="container pt-5">
        <div className="card w-50 p-3 offset-3">
            <h5 className="text-center py-3">Add Employees</h5>
            <form className="form">
                <label> Name:</label>
                <input type="text" id="name" name="name" className="form-control"
                autoComplete='off'
                onChange={handleChange}
                value={employees.name}
                />
                {errors.name && <small className='text-danger'>{errors.name}</small>}
                <br />
                
                <label> DoJ:</label>
                <input type="date" id="doj" name="doj" className="form-control"
                autoComplete='off'
                onChange={handleChange}
                value={employees.doj}
                />
                {errors.doj && <small className='text-danger'>{errors.doj}</small>}
                <br />
                
                <label> Department:</label>
                <input type="text" id="deptName" name="deptName" className="form-control"
                autoComplete='off'
                onChange={handleChange}
                value={employees.dept.deptName}
                />
                {errors.deptName && <small className='text-danger'>{errors.deptName}</small>}
                <br />

                <label> Designation:</label>
                <input type="text" id="designation" name="designation" className="form-control"
                autoComplete='off'
                onChange={handleChange}
                value={employees.dept.designation}
                />
                {errors.designation && <small className='text-danger'>{errors.designation}</small>}
                <br />
                
                <div class="d-flex gap-2">
                    <button className="btn btn-danger mt-3 w-50" onClick={handleCancel}>Cancel</button>
                    <button className="btn btn-success mt-3 w-50" onClick={handleSave}>Save</button>
                </div>
            </form>
        </div>
        </div>
    </div>

  )
}

export default CreateEmployee;




