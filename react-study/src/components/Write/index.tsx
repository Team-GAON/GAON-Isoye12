import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface WriteData {
    title:string;
    detail:string;
    category:'FREE'
}

const Write = () => {
    const ACCESS_TOKEN = localStorage.getItem('ACCESS_TOKEN');

    const [writeData,setWriteData] = useState<WriteData>({title:'',detail:'',category:'FREE'});

    const handleForm = (e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setWriteData((prev)=>({...prev, [name]:value}));
    }

    const navigate = useNavigate();

    const submit = async () => {
        try{
            const res = await axios.post('https://gaon.cher1shrxd.me/boards',writeData, {
                headers:{Authorization:`Bearer ${ACCESS_TOKEN}`},
            });
            if(res){
                alert('글 작성 성공')
                navigate('/')
            }
        }catch(err){
            alert('글 작성 실패')
            console.log(err)
        }
    }

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: '12px',
      }}
    >
      <h1>글쓰기</h1>
      <input
        type="text"
        placeholder="제목을 입력해주세요."
        style={{
          width: "300px",
          height: "10px",
          resize: "none",
          padding: "10px",
        }}
        name='title'
        onChange={handleForm}
        value={writeData.title}
      />
      <textarea
        placeholder="내용을 입력해주세요."
        style={{
          width: "300px",
          height: "300px",
          resize: "none",
          padding: "10px",
        }}
        name='detail'
        onChange={handleForm}
        value={writeData.detail}
      ></textarea>
      <button onClick={submit}>게시하기</button>
    </div>
  );
};

export default Write;
