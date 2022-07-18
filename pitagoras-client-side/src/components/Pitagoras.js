import React from "react"

export default function Pitagoras(props){

    let {cat1, cat2, hip, styleCalc} = props

    if(cat1 > cat2){
        let aux = cat1
        cat1 = cat2
        cat2 = aux
    }

    return(
        <div 
            className="tria-container"
            style={{margin: `${50 - styleCalc * 1.5}px 0 0 -44px`}}
            >
            <div className="sides">
                <div className="cat1">
                    <p 
                        className="cat1Name"
                        style={{paddingTop: `${styleCalc*2}px`}}
                    ><b>Cateto</b></p>
                    <p className="cat1Value">{cat1}</p>
                </div>
                <p 
                    className="hip"
                    style={{paddingTop: `${(25+ styleCalc)}px`,
                            paddingLeft: `${(100-styleCalc)/2}px`}}
                ><b>Hipotenusa</b><br/>{hip}</p>
                <p className="cat2"><b>Cateto</b><br/>{cat2}</p>
            </div>
            <div 
                className="triangle"
                style={{clipPath: `polygon(0 ${styleCalc}%, 0% 100%, 100% 100%)`}}
            ></div>
        </div>
    )
}