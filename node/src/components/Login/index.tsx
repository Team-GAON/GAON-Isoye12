import { useState } from 'react';
import * as S from './style'; // S라는 이름으로 ./style의 모든 것을 가져옴
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsername = (e:React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value)
  }

  const handlePassword = (e:React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  const Submit = () => {
    axios.post('http://dgsw-local.mcv.kr:8080/auth/signup', {
      email: username,
      password: password
    }).then((res)=>{
      console.log(res);
    }).catch((err)=>{
      console.log(err);
    })
  }

  return (
    <S.Container>
      <S.Label>로그인</S.Label>
      <S.Input onChange={handleUsername}/>
      <S.Label>비밀번호</S.Label>
      <S.Input onChange={handlePassword}/>
      <S.Submit onClick={Submit}>로그인</S.Submit>
    </S.Container> // S의 Container를 가져옴
  )
}

export default Login