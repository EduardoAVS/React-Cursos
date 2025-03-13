import UserDetail from "./components/UserDetail";

function App() {
  type Aluno = {
    id: number,
    nome: string;
    idade: number;
    profissao: string;
  };

  const alunos: Array<Aluno> = [
    { id: 1, nome: "Eduardo", idade: 19, profissao: "Estagiário de Desenvolvimento" },
    { id: 2, nome: "João", idade: 30, profissao: "Advogado" },
    { id: 3, nome: "Andre", idade: 15, profissao: "Estudante" }
  ];

  return (
    <div>
      <h1>TESTE</h1>
      {alunos.map((aluno) => (
        <UserDetail
          key={aluno.id} 
          nome={aluno.nome}
          idade={aluno.idade}
          profissao={aluno.profissao}
        />
      ))}
    </div>
  );
}

export default App;

