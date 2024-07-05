import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import Loader from "../../components/Loader";
import { useProfileMutation } from "../../redux/api/usersApiSlice";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { Link } from "react-router-dom";
import Modal from "../../components/Modal";

const Profile = () => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [numCel, setNumCel] = useState("");
  const [email, setEmail] = useState("");
  const [tipoDoc, setTipoDoc] = useState("");
  const [numDoc, setNumDoc] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { userInfo } = useSelector((state) => state.auth);

  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useProfileMutation();

  useEffect(() => {
    setNombre(userInfo.nombre);
    setApellido(userInfo.apellido);
    setNumCel(userInfo.numCel);
    setEmail(userInfo.email);
    setTipoDoc(userInfo.tipoDoc);
    setNumDoc(userInfo.numDoc);
  }, [userInfo.nombre, userInfo.apellido, userInfo.numCel, userInfo.email, userInfo.tipoDoc, userInfo.numDoc]);

  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          nombre,
          apellido,
          numCel,
          email,
          tipoDoc,
          numDoc,
          password,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        toast.success("Profile updated successfully");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <div className="container mx-auto px-4 mt-40">
    <div className="flex justify-center items-center md:flex md:space-x-4">
      {/* Contenedor del formulario ajustado a más ancho */}
      <div className="w-full max-w-4xl">
        <h2 className="text-2xl font-semibold mb-4 text-center">Actualizar Perfil</h2>
        <form onSubmit={submitHandler} className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/2 p-2">
            <label className="block text-gray-700 mb-2">Nombre</label>
            <input
              type="text"
              placeholder="Ingresa tu nombre"
              className="form-input p-4 rounded-sm w-full"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>
          <div className="w-full md:w-1/2 p-2">
            <label className="block text-gray-700 mb-2">Apellidos</label>
            <input
              type="text"
              placeholder="Ingresa tus apellidos"
              className="form-input p-4 rounded-sm w-full"
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}
            />
          </div>
          <div className="w-full md:w-1/2 p-2">
            <label className="block text-gray-700 mb-2">Teléfono</label>
            <input
              type="number"
              placeholder="Ingresa tu teléfono"
              className="form-input p-4 rounded-sm w-full"
              value={numCel}
              onChange={(e) => setNumCel(e.target.value)}
            />
          </div>
          <div className="w-full md:w-1/2 p-2">
            <label className="block text-gray-700 mb-2">Correo electrónico</label>
            <input
              type="email"
              placeholder="Ingresa tu correo electrónico"
              className="form-input p-4 rounded-sm w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="w-full md:w-1/2 p-2">
            <label className="block text-gray-700 mb-2">Tipo de Documento</label>
            <input
              type="text"
              placeholder="Selecciona el tipo de documento"
              className="form-input p-4 rounded-sm w-full"
              value={tipoDoc}
              onChange={(e) => setTipoDoc(e.target.value)}
            />
          </div>
          <div className="w-full md:w-1/2 p-2">
            <label className="block text-gray-700 mb-2">Número de Documento</label>
            <input
              type="number"
              placeholder="Ingresa tu número de documento"
              className="form-input p-4 rounded-sm w-full"
              value={numDoc}
              onChange={(e) => setNumDoc(e.target.value)}
            />
          </div>
          <div className="w-full md:w-1/2 p-2">
            <label className="block text-gray-700 mb-2">Contraseña</label>
            <input
              type="password"
              placeholder="Ingresa tu contraseña"
              className="form-input p-4 rounded-sm w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="w-full md:w-1/2 p-2">
            <label className="block text-gray-700 mb-2">Confirmar contraseña</label>
            <input
              type="password"
              placeholder="Vuelve a ingresar tu contraseña"
              className="form-input p-4 rounded-sm w-full"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        </form>
        <div className="flex justify-between p-2">
          <button
            type="submit"
            className="bg-pink-500 text-white py-2 px-4 rounded hover:bg-pink-600"
          >
            Actualizar
          </button>
          <button
            className="bg-pink-500 text-white py-2 px-4 rounded hover:bg-pink-600"
          >
            Mis medidas
          </button>

          <Link
            to="/user-orders"
            className="bg-pink-600 text-white py-2 px-4 rounded hover:bg-pink-700"
          >
            Mis Pedidos
          </Link>
        </div>
        {loadingUpdateProfile && <Loader />}
      </div>
    </div>
  </div>
  );
};

export default Profile;
