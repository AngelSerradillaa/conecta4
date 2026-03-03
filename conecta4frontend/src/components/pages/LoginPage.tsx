import { useNavigate } from "react-router-dom";

export const LoginPage = () => {

  const navigate = useNavigate();
  
  return (
    <>
    <div><p>Hola soy el login</p></div>

    <button onClick={() => navigate("/game")}>
      Jugar
    </button>
    </>
  )
}
