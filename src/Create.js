import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Create = () => {
    const[title,setTitle] = useState('')
    const[body,setBody] = useState('')
    const[author,setAuthor] = useState('Mario')
    const [isPending,setIsPending] = useState(false)
    const navigate = useNavigate()
    const handleSubmit = (e)=>{
        e.preventDefault()
        const blog = {title,body,author}
        setIsPending(true)
        fetch('http://localhost:8000/blogs',{
        method: 'Post',
        headers: {"Content-Type": "Application/json"},
        body: JSON.stringify(blog)
        }).then(()=>{
            console.log('New blog added')
            setIsPending(false)
            navigate('/')
        }
        )
    }

    return ( 
        <div className="create">
            <h2>Add a New Blog</h2>
            <form onSubmit={handleSubmit}>
                <lable >Blog title:</lable>
                <input type="text" required value={title} onChange={(e)=>setTitle(e.target.value)}></input>
                <lable>Blog body:</lable>
                <textarea required value={body} onChange={(e)=>setBody(e.target.value)}></textarea>
                <lable>Blog author:</lable>
                <select value={author} onChange={(e)=>setAuthor(e.target.value)}>
                    <option value="Mario">Mario</option>
                    <option value="Yoshi">Yoshi</option>
                </select>
                {!isPending && <button>Add Blog</button>}
                {isPending && <button disabled>Adding blog...</button>}

            </form>
        </div>
     );
}
 
export default Create;