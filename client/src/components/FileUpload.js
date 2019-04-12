import React, { useState } from "react"
import axios from "axios"

export default function FileUpload() {
    const [file, setFile] = useState("")
    const [fileName, setFileName] = useState("Choose File")
    const [uploadedFile, setUploadedFile] = useState({})

    const onChangeHandler = e => {
        console.log(e.target.files)

        setFile(e.target.files[0])
        setFileName(e.target.files[0].name)
    }

    const onSubmitHandler = async e => {
        e.preventDefault()
        const formData = new FormData()
        console.log(formData)

        formData.append("file", file)
        console.log(formData)

        try {
            const {
                data: { fileName, filePath }
            } = await axios.post("/upload", formData, {
                "Content-Type": "multipart/form-data"
            })

            setUploadedFile({ fileName, filePath })

            console.log(uploadedFile.fileName, uploadedFile.filePath)
            console.log('crap')
        } catch (err) {
            if (err.response.status === 500) {
                console.log("There was a problem with the server")
            } else {
                console.log(err.response.data.msg)
            }
        }
    }
    return (
        <>
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
        </>
    )
}
