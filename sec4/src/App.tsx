
import './App.css'
import CarDetail from './components/CarDetail';

function App() {

  type Carro = {
    id: number,
    placa: string,
    modelo: string,
  }

  const carros: Array<Carro> = [
    {id: 1, placa: 'OMA-3626', modelo: 'La Ferrari'},
    {id: 2, placa: 'OPA-2020', modelo: 'ford ka'},
    {id: 3, placa: 'SGA-3040', modelo: 'Uno com escada'}
  ]

  return (
    <>
      <h1 className='titulo' >Carros</h1>
      <div>

        {carros.map((carro) => (
          <CarDetail
            key={carro.id}
            placa={carro.placa}
            modelo={carro.modelo}
          />
        ))}
        
      </div>
    
    </>
    
  );
}

export default App
