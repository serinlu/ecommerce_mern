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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedForm, setSelectedForm] = useState(null);
  const [sacoMeasurements, setSacoMeasurements] = useState({
    pecho_s: '',
    cintura_s: '',
    cadera_s: '',
    hombro_s: '',
    manga_s: '',
    espalda_s: '',
    largo_s: ''
  });
  const [camisaMeasurements, setCamisaMeasurements] = useState({
    cuello_c: '',
    hombro_c: '',
    manga_c: '',
    espalda_c: '',
    pecho_c: '',
    cintura_c: '',
    cadera_c: '',
    puño_c: '',
    largo_c: ''
  });
  const [pantalonMeasurements, setPantalonMeasurements] = useState({
    largo_p: '',
    tiro_p: '',
    cintura_p: '',
    cadera_p: '',
    rodilla_p: '',
    boca_p: ''
  });

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

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSacoChange = (e) => {
    const { name, value } = e.target;
    setSacoMeasurements((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCamisaChange = (e) => {
    const { name, value } = e.target;
    setCamisaMeasurements((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handlePantalonChange = (e) => {
    const { name, value } = e.target;
    setPantalonMeasurements((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const updateSacoMeasurements = () => {
    // Lógica para actualizar las medidas de saco
    console.log("Medidas para saco actualizadas:", sacoMeasurements);
    toast.success("Medidas para saco actualizadas");
  };

  const updateCamisaMeasurements = () => {
    // Lógica para actualizar las medidas de saco
    console.log("Medidas para camisa actualizadas:", camisaMeasurements);
    toast.success("Medidas para camisa actualizadas");
  };

  const updatePantalonMeasurements = () => {
    // Lógica para actualizar las medidas de saco
    console.log("Medidas para pantalón actualizadas:", pantalonMeasurements);
    toast.success("Medidas para pantalon actualizadas");
  };

  const renderForm = () => {
    switch (selectedForm) {
      case 'saco':
        return (
          <form className="text-left">
            <h3 className="text-lg font-semibold mb-2">Medidas de Saco</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 mb-2">Pecho</label>
                <input
                  type="number"
                  name="pecho_s"
                  value={sacoMeasurements.pecho_s}
                  onChange={handleSacoChange}
                  className="form-input p-2 rounded-sm w-full"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Cintura</label>
                <input
                  type="number"
                  name="cintura_s"
                  value={sacoMeasurements.cintura_s}
                  onChange={handleSacoChange}
                  className="form-input p-2 rounded-sm w-full"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Cadera</label>
                <input
                  type="number"
                  name="cadera_s"
                  value={sacoMeasurements.cadera_s}
                  onChange={handleSacoChange}
                  className="form-input p-2 rounded-sm w-full"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Hombro</label>
                <input
                  type="number"
                  name="hombro_s"
                  value={sacoMeasurements.hombro_s}
                  onChange={handleSacoChange}
                  className="form-input p-2 rounded-sm w-full"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Manga</label>
                <input
                  type="number"
                  name="manga_s"
                  value={sacoMeasurements.manga_s}
                  onChange={handleSacoChange}
                  className="form-input p-2 rounded-sm w-full"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Espalda</label>
                <input
                  type="number"
                  name="espalda_s"
                  value={sacoMeasurements.espalda_s}
                  onChange={handleSacoChange}
                  className="form-input p-2 rounded-sm w-full"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-gray-700 mb-2">Largo</label>
                <input
                  type="number"
                  name="largo_s"
                  value={sacoMeasurements.largo_s}
                  onChange={handleSacoChange}
                  className="form-input p-2 rounded-sm w-full"
                />
              </div>
            </div>
            <button
              type="button"
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              onClick={updateSacoMeasurements}
            >
              Actualizar medidas
            </button>
          </form>
        );
      case 'camisa':
        return (
          <form className="text-left">
            <h3 className="text-lg font-semibold mb-2">Medidas de Camisa</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 mb-2">Cuello</label>
                <input
                  type="number"
                  name="cuello_c"
                  value={camisaMeasurements.cuello_c}
                  onChange={handleCamisaChange}
                  className="form-input p-2 rounded-sm w-full"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Cintura</label>
                <input
                  type="number"
                  name="hombro_c"
                  value={camisaMeasurements.hombro_c}
                  onChange={handleCamisaChange}
                  className="form-input p-2 rounded-sm w-full"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Manga</label>
                <input
                  type="number"
                  name="manga_c"
                  value={camisaMeasurements.manga_c}
                  onChange={handleCamisaChange}
                  className="form-input p-2 rounded-sm w-full"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Espalda</label>
                <input
                  type="number"
                  name="espalda_c"
                  value={camisaMeasurements.espalda_c}
                  onChange={handleCamisaChange}
                  className="form-input p-2 rounded-sm w-full"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Pecho</label>
                <input
                  type="number"
                  name="pecho_c"
                  value={camisaMeasurements.pecho_c}
                  onChange={handleCamisaChange}
                  className="form-input p-2 rounded-sm w-full"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Cintura</label>
                <input
                  type="number"
                  name="cintura_c"
                  value={camisaMeasurements.cintura_c}
                  onChange={handleCamisaChange}
                  className="form-input p-2 rounded-sm w-full"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Cadera</label>
                <input
                  type="number"
                  name="cadera_c"
                  value={camisaMeasurements.cadera_c}
                  onChange={handleCamisaChange}
                  className="form-input p-2 rounded-sm w-full"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Puño</label>
                <input
                  type="number"
                  name="puño_c"
                  value={camisaMeasurements.puño_c}
                  onChange={handleCamisaChange}
                  className="form-input p-2 rounded-sm w-full"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-gray-700 mb-2">Largo</label>
                <input
                  type="number"
                  name="largo_c"
                  value={camisaMeasurements.largo_c}
                  onChange={handleCamisaChange}
                  className="form-input p-2 rounded-sm w-full"
                />
              </div>
            </div>
            <button
              type="button"
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              onClick={updateCamisaMeasurements}
            >
              Actualizar medidas
            </button>
          </form>
        );
      case 'pantalon':
        return (
          <form className="text-left">
            <h3 className="text-lg font-semibold mb-2">Medidas de Pantalón (centímetros)</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 mb-2">Largo</label>
                <input
                  type="number"
                  name="largo_p"
                  value={pantalonMeasurements.largo_p}
                  onChange={handlePantalonChange}
                  className="form-input p-2 rounded-sm w-full"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Tiro</label>
                <input
                  type="number"
                  name="tiro_p"
                  value={pantalonMeasurements.tiro_p}
                  onChange={handlePantalonChange}
                  className="form-input p-2 rounded-sm w-full"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Cintura</label>
                <input
                  type="number"
                  name="cintura_p"
                  value={pantalonMeasurements.cintura_p}
                  onChange={handlePantalonChange}
                  className="form-input p-2 rounded-sm w-full"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Cadera</label>
                <input
                  type="number"
                  name="cadera_p"
                  value={pantalonMeasurements.cadera_p}
                  onChange={handlePantalonChange}
                  className="form-input p-2 rounded-sm w-full"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Rodilla</label>
                <input
                  type="number"
                  name="rodilla_p"
                  value={pantalonMeasurements.rodilla_p}
                  onChange={handlePantalonChange}
                  className="form-input p-2 rounded-sm w-full"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Boca</label>
                <input
                  type="number"
                  name="boca_p"
                  value={pantalonMeasurements.boca_p}
                  onChange={handlePantalonChange}
                  className="form-input p-2 rounded-sm w-full"
                />
              </div>
            </div>
            <button
              type="button"
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              onClick={updateSacoMeasurements}
            >
              Actualizar medidas
            </button>
          </form>
        );
      default:
        return <p>Selecciona una opción para ver el formulario</p>;
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
              onClick={handleOpenModal}
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
    <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
      <h2 className="text-xl font-semibold mb-4">Mis Medidas</h2>
      <div className="flex justify-around mb-4">
        <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600" onClick={() => setSelectedForm('saco')}>Saco</button>
        <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600" onClick={() => setSelectedForm('camisa')}>Camisa</button>
        <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600" onClick={() => setSelectedForm('pantalon')}>Pantalón</button>
      </div>
      {renderForm()}
    </Modal>
  </div>
  );
};

export default Profile;
