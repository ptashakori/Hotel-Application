import React, {Component} from 'react';
import axios from 'axios';

class createAssignment extends Component
{
    constructor(props)
    {
        super(props);

        this.state = 
        {
            faculty_email: "",
            course_id: "",
            selectedFile: null,
            path: ""
        }

        this.faculty_emailHandler = this.faculty_emailHandler.bind(this);
        this.course_idHandler = this.course_idHandler.bind(this);
        this.selectedFileHandler = this.selectedFileHandler.bind(this);
        this.uploadHandler = this.uploadHandler.bind(this);
    }

    faculty_emailHandler = (e) =>
    {
        this.setState({
            faculty_email: e.target.value
        })
    }

    course_idHandler = (e) =>
    {
        this.setState({
            course_id: e.target.value
        })
    }

    selectedFileHandler = (e) =>
    {
        this.setState({
            selectedFile: e.target.files[0]
        })
    }

    uploadHandler = () =>
    {
        const fd = new FormData();
        fd.append('file', this.state.selectedFile, this.state.selectedFile.name);
        fd.append('email', this.state.faculty_email);
        fd.append('course_id', this.state.course_id);

        axios.post('http://localhost:3001/createAssignment', fd)
        .then(res => {
            this.setState({path: res.data}, function(){
                console.log(this.state.path.folderPath);
            });
        })
    }

    render()
    {
        return(
            <div className = "createAssignment">
                <h2>Upload Assignment Files</h2>
                <p>Please confirm your faculty email and the course you are uploading for first:</p>
                <input type = "text" name = "faculty_email" onChange = {this.faculty_emailHandler} placeholder = "Faculty Email" />
                
                <br></br>

                <input type = "text" name = "course_id" onChange = {this.course_idHandler} placeholder = "Course ID" />
                
                <br></br>
                <br></br>

                <input type = "file" name = "file" onChange = {this.selectedFileHandler} />
                <button onClick = {this.uploadHandler}>Upload</button>

                <br></br>
                <br></br>

                <a href = {this.state.path.folderPath}>Click to View File Folder(s)</a>
            </div>
        )
    }    
}

export default createAssignment;