import React, { Fragment, useState } from "react";

const EditTodo = ({todo}) => {
    const [description , setDescription] = useState(todo.description);

    //update description function defined

    const updateDescription = async (e) => {
        e.preventDefault();
        try {
            const body = {description};

            //proxy

            const response = await fetch(`/todos/${todo.todo_id}`, {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });

            window.location = "/";
        } catch (error) {
            console.error(error.message);
        };
    };

    return (
    <Fragment>
        <button type="button" className="btn btn-primary" data-toggle="modal" data-target={`#id${todo.todo_id}`}>
            Edit
        </button>


        <div className="modal" id={`id${todo.todo_id}`}>
            <div className="modal-dialog">
                <div className="modal-content">

      
                    <div className="modal-header">
                        <h4 className="modal-title">Edit Todo</h4>
                        <button type="button" className="close" data-dismiss="modal" onClick={() => setDescription(todo.description)}>&times;</button>
                    </div>

      
                    <div className="modal-body">
                        <input type="text" className="form-control" value={description} onChange={e => setDescription(e.target.value)} />
                    </div>

      
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={e => updateDescription(e)} >Edit</button>
                    </div>

                </div>
            </div>
        </div>
    </Fragment>
    )
};

export default EditTodo;