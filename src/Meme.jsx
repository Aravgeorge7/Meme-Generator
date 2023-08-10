import React from "react";

import memesData from "./memesData.jsx";


export default function Meme(){

    let url;

    

    const [meme, setMeme] = React.useState({
        topText:"",
        bottomText:"",
        img:"http://i.imgflip.com/1bij.jpg"
    })

    const [allMemeImages, setAllMemeImages] = React.useState([])

    React.useEffect(function(){
        fetch("https://api.imgflip.com/get_memes")
        .then(res => res.json())
        .then(d => setAllMemeImages(d.data.memes))
    },[])


    //setting up onChange
    function toggle(event){

        const {name, value, type, checked } = event.target

        setMeme(prev => {
            return {
                ...prev,
                [name]: value
            }
        })
    }
    function clicked(){
        const length = allMemeImages.length
        const random_number = Math.floor(Math.random()* length)
        console.log(random_number)
        url = allMemeImages[random_number].url

        setMeme(m=>{
            return{
                ...m,
                img:url
            }
        })
    }
    return (
        <div className="main">
            
            <div className="form1">
                <input className="input-1" type="text" placeholder="Top Text"
                name ="topText" onChange={toggle} value = {meme.topText} />
                <input className="input-2" type="text" placeholder="Bottom Text"
                name ="bottomText" onChange={toggle} value = {meme.bottomText} />
                <button
                     className="button"
                     onClick={clicked}>
                    Get a new meme image 🖼
                </button>
            </div>
            <div className = "meme">
                <img src= {meme.img} className="meme-img"/>
                <h2 className="Meme--text top">{meme.topText}</h2>
                <h2 className="Meme--text bottom">{meme.bottomText}</h2>

            </div>
            
        </div>
    )
}

