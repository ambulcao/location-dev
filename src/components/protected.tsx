import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Protected(props) {
    const naviget = useNavigate();
    useEffect(() => {
        const login = localStorage.getItem("login");
        if (!login) {
            // Se o usuário não estiver logado, redirecione para a página de login.
            naviget("/", { replace: true });
        }
    }, []);

    return (
        <div>
            {/* Conteúdo protegido aqui */}
            {props.children}
        </div>
    );
}