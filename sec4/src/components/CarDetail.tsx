import './CarDetail.css'

type CarroDetailProps = {
    placa: string,
    modelo: string,
}


const CarDetail : React.FC<CarroDetailProps> = (props) => {

    const { placa, modelo } = props;

    return (
        <div>
            <h1 className="modelo" >Detalhe: {modelo}</h1>
            <h2 className="modelo" >Placa: {placa}</h2>
        </div>
       
    )
}

export default CarDetail