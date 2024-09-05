import { useState } from "react";

const Signup = () => {

  interface LoginData {
    username:string;
    password:string; /* 각 데이터의 타입 */
  } 

  const [loginData,setLoginData] = useState<LoginData>({username:'',password:''}); {/* <LoginData>는 useState의 타입 */}

  const handleForm = (e:React.ChangeEvent<HTMLInputElement>) => { /* 얘도 객체임 */
    const { name, value } = e.target; /* 구조 분해 할당 (원래 두 줄 쓸 코드를 한 줄로 씀) */

    setLoginData((prev)=>({...prev,[name]:value}))
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
      }}
    >
      <h1
        style={{
          marginBottom: "30px",fontSize: "1.7rem", fontWeight: "400" }}
      >
        회원가입
      </h1>
      <input
        type="text"
        placeholder="아이디"
        style={{ marginBottom: "20px" }}
        name='username'
      />
      <input
        type="text"
        placeholder="비밀번호"
        style={{ marginBottom: "20px" }}
      />
      <button>회원가입</button>
    </div>
  );
};

export default Signup;
