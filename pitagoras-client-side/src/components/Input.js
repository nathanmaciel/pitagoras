import React from "react";
import Pitagoras from "./Pitagoras";

export default function Input(){

    const [formData, setFormData] = React.useState({
        cat1: "",
        cat2: "",
        hip: ""
    })

    const[send, setSend] = React.useState({
        cat1: "",
        cat2:"",
        hip: "",
        styleCalc: 0
    })

    function handleChange(event){
        let {name, value} = event.target
        setFormData((prevFormData) => {
            return {
            ...prevFormData,
            [name]: Number(value)
        }})
    }

    function preventZero(event){
        console.log(event.target)
        let {name, value} = event.target
        if(value == 0){
            setFormData((prevFormData) => {
                return {
                ...prevFormData,
                [name]: ""
            }})
        }
    }

    function handleCalcClick(){

                    //Primeiro, é necessário conferir se as entradas são válidas

        // Caso inválido: 1 ou 3 lados preenchidos
        console.log("calcular!")
        let filled = {
            cat1: formData.cat1 !== "",
            cat2: formData.cat2 !== "",
            hip: formData.hip !== "",
            qtt: 0
        }
        filled.qtt = (filled.cat1? 1 : 0) + (filled.cat2? 1 : 0) + (filled.hip? 1 : 0)
        if(filled.qtt !== 2){
            return alert("Você precisa preencher dois lados e deixar apenas um em branco.")
        }
        // Caso inválido: hipotenusa menor que o cateto inserido
        if(filled.hip){
            let cateto = filled.cat1? formData.cat1 : formData.cat2
            if(Number(formData.hip) <= Number(cateto)){
               return alert("Hipotenusa precisa ser maior que os catetos")
            }
        }

                // Quando tem-se entradas válidas, prossegue-se para a requisição do cálculo dos lados do triângulo        
        fetch("https://pitag-server.herokuapp.com/calc/pitagoras", {
                        method: 'POST',
                        headers: {
                        'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(formData),
                            })
                        .then(res => res.json())
                        .then(data => {
                            console.log("c1")
                            let apiResp = {...data}
                             //Cálculo da proporção dos lados do triângulo a ser desenhado na tela
                            let bool = apiResp.cat1 >= apiResp.cat2
                            let bigger = bool ? apiResp.cat1 : apiResp.cat2
                            let smaller = !bool ? apiResp.cat1 : apiResp.cat2

                            setFormData({
                                cat1: Number(apiResp.cat1),
                                cat2: Number(apiResp.cat2),
                                hip: Number(apiResp.hip)
                            })

                            //Envio dos dados para o componente do desenho
                            setSend({
                                cat1: Number(apiResp.cat1),
                                cat2: Number(apiResp.cat2),
                                hip: Number(apiResp.hip),
                                styleCalc: (100 - (smaller/bigger)*100)
                            })
                        })
        console.log("fim")
    }

    function handleClean(name){
        console.log("limpar")
        setFormData((prevFormData) => {
            return {
                ...prevFormData,
                [name]: ""
            }
        })
    }

    console.log(formData)

    return(
        <div className="whole-page">
            <div className="inputs">

                <label htmlFor="cat1">Cateto</label>
                <div className="eachInput">
                    <input 
                        type="number"
                        id="cat1"
                        name="cat1"
                        value={formData.cat1}
                        onChange={handleChange}
                        onBlur={preventZero}
                        min={0}
                    />
                    <button onClick={() => handleClean("cat1")}>Limpar</button>
                </div>
                
                <label htmlFor="cat2">Cateto</label>
                <div className="eachInput">
                    <input 
                        type="number"
                        id="cat2"
                        name="cat2"
                        value={formData.cat2}
                        onChange={handleChange}
                        onBlur={preventZero}
                        min={0}
                    />
                    <button onClick={() => handleClean("cat2")}>Limpar</button>
                </div>
                
                <label htmlFor="hip">Hipotenusa</label>
                <div className="eachInput">
                    <input 
                        type="number"
                        id="hip"
                        name="hip"
                        value={formData.hip}
                        onChange={handleChange}
                        onBlur={preventZero}
                        min={0}
                    />
                    <button onClick={() => handleClean("hip")}>Limpar</button>
                </div>
                    <button
                        type="button"
                        style={{marginLeft: "56px"}}
                        onClick={() => {
                            console.log("cliquei")
                            handleCalcClick()
                        }}
                    >Calcular</button>
            </div>
            <Pitagoras
            cat1={send.cat1}
            cat2={send.cat2}
            hip={send.hip}
            styleCalc={send.styleCalc}
            />
        </div>
    )
}