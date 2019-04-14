import React, { useState } from "react"
import axios from "axios"

import Message from "../components/Message"

export default function FileUpload() {
    const [file, setFile] = useState("")
    const [fileName, setFileName] = useState("Choose File")
    const [uploadedFile, setUploadedFile] = useState({})
    const [message, setMessage] = useState("")

    const onChangeHandler = e => {
        console.log(e.target.files)

        setFile(e.target.files[0])
        setFileName(e.target.files[0].name)
    }

    const onSubmitHandler = async e => {
        e.preventDefault()
        const formData = new FormData()

        formData.append("file", file)

        try {
            const { data } = await axios.post("/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })

            const { fileName, filePath } = data

            setUploadedFile({ fileName, filePath })

            setMessage("File uploaded")
        } catch (err) {
            if (err.response.status === 500) {
                setMessage("There was a problem with the server")
            } else {
                setMessage(err.response.data.msg)
            }
        }
    }
    return (
        <>
            {message && <Message msg={message} />}
            <form onSubmit={onSubmitHandler}>
                <div className="custom-file mb-4">
                    <input
                        type="file"
                        className="custom-file-input"
                        onChange={onChangeHandler}
                        id="customFile"
                    />
                    <label className="custom-file-label" htmlFor="customFile">
                        {fileName}
                    </label>
                </div>
                <input
                    type="submit"
                    value="upload"
                    className="btn btn-primary btn-block mt-4"
                />
            </form>
            {uploadedFile ? (
                <div className="row mt-5">
                    <div className="col-md-6 m-auto">
                        <h3 className="text-center">
                            {" "}
                            {uploadedFile.fileName}
                        </h3>
                        <img
                            style={{ width: "100%" }}
                            src={uploadedFile.filePath}
                            alt=""
                        />
                    </div>
                </div>
            ) : null}
        </>
    )
}
