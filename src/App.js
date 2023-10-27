import React, { useRef, useState } from 'react'
import './App.css'

function CRUD() {
    const list = [
        {
            id: 1, 
            name: "kalai",
            email: "kalai@gmail.com",
            experience:3
        },
        {
            id: 2, 
            name: "bala",
            email: "bala@gmail.com",
            experience:10
        },
    ]
    const [lists, setList] = useState(list)
    const [updateState, setUpdateState] = useState(-1)
    return(
        <div className='crud'>
            <div>
            <AddList setList = {setList }/>
            <form onSubmit={handleSubmit}>
            <table>
                {
                    lists.map((current) => (
                        updateState === current.id ? <EditList current={current} lists={lists} setList={setList}/> :
                        <tr>
                            <td>{current.name}</td>
                            <td>{current.email}</td>
                            <td>{current.experience}</td>
                            <td>
                                <button className='edit' onClick={() => handleEdit(current.id)}>Edit</button>
                                <button className='delete' type='button' onClick={() => handleDelete(current.id)}>Delete</button>
                            </td>
                        </tr>
                    ))
                }
            </table>
            </form>
            </div>
        </div>
    )

    function handleEdit(id) {
        setUpdateState(id)
    }
    function handleDelete(id) {
        const newlist = lists.filter((li) => li.id !== id)
        setList(newlist)
    }
    function handleSubmit(event) {
        event.preventDefault()
        const name = event.target.elements.name.value
        const email = event.target.elements.email.value
        const experience = event.target.elements.experience.value
        const newlist = lists.map((li) => (
            li.id === updateState ? {...li, name:name, email: email,experience:experience} : li
        ))

        setList(newlist)
        setUpdateState(-1)
    }
}

function EditList({current, lists, setList}) {
    function handInputname(event) {
        const value = event.target.value;
        const newlist = lists.map((li) => (
            li.id === current.id ? {...li, name :value} : li
        ))

        setList(newlist)
    }
    function handInputprice(event) {
        const value = event.target.value;
        const newlist = lists.map((li) => (
            li.id === current.id ? {...li, email:value} : li
        ))

        setList(newlist)
    }
    function handInputexperience(event) {
      const value = event.target.value;
      const newlist = lists.map((li) => (
          li.id === current.id ? {...li, experience:value} : li
      ))

      setList(newlist)
    }
    return(
        <tr>
            <td><input type="text" onChange={handInputname} name='name' value={current.name}/></td>
            <td><input type="text" onChange={handInputprice} name='email' value={current.email}/></td>
            <td><input type="text" onChange={handInputexperience} name='experience' value={current.experience}/></td>
            <td><button type='submit'>Update</button></td>
        </tr>
    )
}

function AddList({setList}) {
    const nameRef = useRef()
    const emailRef = useRef()
    const experienceRef = useRef()

    function handleSubmit(event) {
        event.preventDefault();
        const name = event.target.elements.name.value;
        const email= event.target.elements.email.value;
        const experience = event.target.elements.experience.value;
        const newlist = {
            id: 3,
            name,
            email,
            experience
        }
        setList((prevList)=> {
            return prevList.concat(newlist)
        })
        nameRef.current.value = ""
        emailRef.current.value = ""
        experienceRef.current.value = ""
    }
    return(
        <form className='addForm' onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="Enter Name" ref={nameRef}/>
            <input type="text" name="email" placeholder="Enter email" ref={emailRef}/>
            <input type="text" name="experience" placeholder="Enter experience" ref={experienceRef}/>
            <button type="submit">Add</button>
        </form>
    )
}

export default CRUD;