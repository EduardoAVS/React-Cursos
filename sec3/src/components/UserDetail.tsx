type UserDetailProps = {
  nome: string;
  idade: number;
  profissao: string;
};

const UserDetail: React.FC<UserDetailProps> = (props : UserDetailProps) => {
    
  const { nome, idade, profissao } = props;

  return (
    <div>
      <h1>{nome}</h1>
      <h2>{idade}</h2>
      <h3>{profissao}</h3>
      {idade >= 18 ?  (<h3>Pode dirigir</h3>) : (<h3>Não pode dirigir</h3>) }
    </div>
  );
};

export default UserDetail;
