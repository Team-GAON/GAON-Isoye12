import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {

  interface LoginData { /* 개체의 타입을 지정해주는 인터페이스 */
    username:string;
    password:string; /* 각 데이터의 타입 */
  } 

  const [loginData,setLoginData] = useState<LoginData>({username:'',password:''}); {/* <LoginData>는 useState의 타입 */}

  const navigate = useNavigate(); /* a태그나 link 대신 쓴 path를 할 수 있게 해줌 */

  const handleForm = (e:React.ChangeEvent<HTMLInputElement>) => { /* 얘도 객체임 */
    const { name, value } = e.target; /* 구조 분해 할당 (원래 두 줄 쓸 코드를 한 줄로 씀) target.name, target.value */

    setLoginData((prev)=>({...prev,[name]:value})) /* 익명함수: 앞에 Signup = ()이런거 없이 쓰면 실행과 동시에 쓸 수 있음. 일회용 함수 */
    /* ({...prev,[name]:value}): return을 안 쓰고 ()를 이용하여 처리 과정 없이 리턴해줌 */
  }

  const submit = async () => { /* async(비동기) 안에서 코드를 실행시키고, await이 있는 곳의 응답이 올 때까지 기다림 */
    try{
      const res = await axios.post('https://gaon.cher1shrxd.me/auth/signup', loginData); /* res는 리스폰스인데 이름은 아무거나 해도됨 */
      alert('회원가입 성공')
      if(res){
        navigate('/login')
      }
    }catch(err:any){
      if(err.response.status.data === 409){ /* 서버에서 에러 설정해놓음 */
        alert('이미 사용 중인 아이디입니다');
        return; /* return을 해서 끝내어 뒤의 코드를 실행시키지 않게 함. 만약 뒤의 조건이 다른 경우에는 필요 X */
      }
      alert('네트워크 에러')
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
        onChange={handleForm}
        value={loginData.username} /* 값이 바뀌면 서버에 전달해줌 */
      />
      <input
        type="text"
        placeholder="비밀번호"
        style={{ marginBottom: "20px" }}
        name='password'
        onChange={handleForm}
        value={loginData.password}
      />
      <button onClick={submit}>회원가입</button>
    </div>
  );
};

export default Signup;
