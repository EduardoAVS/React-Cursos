

const Challenge = () => {

    let a = 10;
    let b = 5;

    const handleSoma = () => {
        console.log(a + b);
    };

    return(
        <div>
            <h1>{a}</h1>
            <h1>{b} </h1>
            <div>
                <button onClick={handleSoma} >Somar</button>
            </div>
            
        </div>
    );
}

export default Challenge