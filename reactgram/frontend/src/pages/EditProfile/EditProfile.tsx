import "./EditProfile.css"

import { uploads } from "../../utils/config";

import { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
// Redux
import {profile, resetMessage} from "../../slices/userSlice";

import Message from "../../components/Message";
import { AppDispatch } from "../../store";
import { RootState } from "../../store";

const EditProfile = () => {

  const dispatch = useDispatch<AppDispatch>();

  const { user, message, error, loading } = useSelector((state: RootState) => state.user);

  // states

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [profileImage, setImageProfile] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [previewImage, setPreviewImage] = useState<string>("");

  // load user data
  useEffect(() => {
    dispatch(profile())
  }, [dispatch]);

  useEffect(() => {
    if(user){
      setName(user.name ?? "");
      setEmail(user.email ?? "");
      setBio(user.bio ?? "");
    }

  }, [user]);

  console.log(user);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
   e.preventDefault();
  }

  const handleFile = (e) => {
    // image preview
    const image = e.target.files[0];

    setPreviewImage(image);

    setImageProfile(image);
  }

  return (
    <div id="edit-profile">
      <h2>Edite seus dados</h2>
      <p className="subtitle">Adiione uma imagem de perfil e conte mais sobre você!</p>
      {(user && (user.profileImage || previewImage)) && (
        <img 
          src={previewImage}
        />
      )}
      <form onSubmit={handleSubmit} >
        <input type="text" placeholder="Nome" onChange={(e) => setName(e.target.value)} value={name || ""} />
        <input type="email" placeholder="Email" disabled value={email || ""} />
        <label >
          <span>Imagem do Perfil:</span>
          <input type="file" onChange={handleFile} />
        </label>
        <label >
          <span>Bio: </span>
          <input type="text" placeholder="Descrição do perfil" onChange={(e) => setBio(e.target.value)} value={bio || ""} />
        </label>
        <label >
          <span>Quer alterar sua senha? </span>
          <input type="password" placeholder="Digite sua nova senha" onChange={(e) => setPassword(e.target.value)} value={password || ""} />
        </label>
        <input type="submit" value="atualizar" />
      </form>
    </div>
  )
}

export default EditProfile