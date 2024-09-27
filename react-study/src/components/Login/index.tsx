import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {

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

  const submit = async () => { /* async(비동기): 코드를 실행하다가 값을 요청해놓고 다음 코드애서 값을 주면 다시 진행(동시진행) */
    try{
      const res = await axios.post('https://gaon.cher1shrxd.me/auth/login',loginData); /* res는 리스폰스인데 이름은 아무거나 해도됨 */
      console.log(res);
      if(res){
        /* 네트워크 콘솔에서 형식 볼 수 있음 */
        localStorage.setItem('ACCESS_TOKEN',res.data.accessToken); /* 토큰을 빼앗기면 안되니까 만료 기간을 나두어 토큰을 일정 기간만 사용할 수 있게 함 */
        localStorage.setItem('REFRASH_TOKEN',res.data.refrashToken); /* 사용자의 토큰 만료를 연장 시켜줌 */ 
        alert('로그인 성공')
        navigate('/')
      }
    }catch(err:any){
      if(err.response.data.statusCode === 401){
        alert('비밀번호가 올바르지 않습니다.');
        return;
      }
      if(err.response.data.statusCode === 404){
        alert('유저를 찾을 수 없습니다.');
        return;
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
          marginBottom: "30px",
          fontSize: "1.7rem", 
          fontWeight: "400" }}
      >
        로그인
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
      <button onClick={submit}>로그인</button>
    </div>
  );
};

export default Login