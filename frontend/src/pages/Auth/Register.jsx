import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import { useRegisterMutation } from "../../redux/api/usersApiSlice";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";

const Register = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    numCel: '', 
    email: '',
    tipoDoc: 'DNI', 
    numDoc: '',
    password: '',
    confirmPassword: ''
  });

  const {
    nombre,
    apellido,
    numCel,
    email,
    tipoDoc,
    numDoc,
    password,
    confirmPassword
  } = formData;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const validateNumDoc = () => {
    if (tipoDoc === 'DNI' && numDoc.length !== 8) {
      toast.error("El DNI debe tener 8 dígitos");
      return false;
    }
    if ((tipoDoc === 'C.E' || tipoDoc === 'RUC') && numDoc.length > 20) {
      toast.error("El número de C.E o Pasaporte no puede tener más de 20 dígitos");
      return false;
    }
    return true;
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!validateNumDoc()) return;

    if (password !== confirmPassword) {
      toast.error("Las contraseñas no coinciden");
    } else {
      try {
        const res = await register({
          nombre,
          apellido,
          numCel,
          email,
          tipoDoc,
          numDoc,
          password
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate(redirect);
        toast.success("Usuario registrado exitosamente");
      } catch (err) {
        console.error(err);
        const errorMessage = err.data?.message || err.error || 'Fallo en el registro';
        toast.error(`Error: ${errorMessage}`);
      }
    }
  };

  return (
    <section className="flex justify-center items-center min-h-screen bg-gradient-to-r from-purple-500 via-pink-500 to-red-500">
      <div className="bg-white p-10 rounded-lg shadow-lg w-3/4 lg:w-2/3 xl:w-1/2">
        <h1 className="text-2xl font-semibold mb-4 text-center">Registrar</h1>
        <form onSubmit={submitHandler} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="my-2">
            <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">Nombre</label>
            <input
              type="text"
              id="nombre"
              className="mt-1 p-2 border rounded w-full text-black"
              placeholder="Ingrese nombre"
              name="nombre"
              value={nombre}
              onChange={onChange}
              required
            />
          </div>

          <div className="my-2">
            <label htmlFor="apellido" className="block text-sm font-medium text-gray-700">Apellido</label>
            <input
              type="text"
              id="apellido"
              className="mt-1 p-2 border rounded w-full text-black"
              placeholder="Ingrese apellido"
              name="apellido"
              value={apellido}
              onChange={onChange}
              required
            />
          </div>

          <div className="my-2">
            <label htmlFor="numCel" className="block text-sm font-medium text-gray-700">Número de Celular</label>
            <input
              type="text"
              id="numCel"
              className="mt-1 p-2 border rounded w-full text-black"
              placeholder="Ingrese número de celular"
              name="numCel"
              value={numCel}
              onChange={onChange}
              required
            />
          </div>

          <div className="my-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Correo Electrónico</label>
            <input
              type="email"
              id="email"
              className="mt-1 p-2 border rounded w-full text-black"
              placeholder="Ingrese correo electrónico"
              name="email"
              value={email}
              onChange={onChange}
              required
            />
          </div>

          <div className="my-2">
            <label htmlFor="tipoDoc" className="block text-sm font-medium text-gray-700">Tipo de Documento</label>
            <select
              id="tipoDoc"
              className="mt-1 p-2 border rounded w-full text-black"
              name="tipoDoc"
              value={tipoDoc}
              onChange={onChange}
              required
            >
              <option value="DNI">DNI</option>
              <option value="C.E">C.E</option>
              <option value="RUC">RUC</option>
            </select>
          </div>

          <div className="my-2">
            <label htmlFor="numDoc" className="block text-sm font-medium text-gray-700">Número de Documento</label>
            <input
              type="text"
              id="numDoc"
              className="mt-1 p-2 border rounded w-full text-black"
              placeholder="Ingrese número de documento"
              name="numDoc"
              value={numDoc}
              onChange={onChange}
              required
            />
          </div>

          <div className="my-2">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Contraseña</label>
            <input
              type="password"
              id="password"
              className="mt-1 p-2 border rounded w-full text-black"
              placeholder="Ingrese contraseña"
              name="password"
              value={password}
              onChange={onChange}
              required
            />
          </div>

          <div className="my-2">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirmar Contraseña</label>
            <input
              type="password"
              id="confirmPassword"
              className="mt-1 p-2 border rounded w-full text-black"
              placeholder="Confirme contraseña"
              name="confirmPassword"
              value={confirmPassword}
              onChange={onChange}
              required
            />
          </div>

          <div className="col-span-2">
            <button
              disabled={isLoading}
              type="submit"
              className="bg-purple-600 text-white px-4 py-2 rounded w-full"
            >
              {isLoading ? "Registrando..." : "Registrar"}
            </button>
          </div>

          {isLoading && <Loader className="col-span-2" />}
        </form>

        <div className="mt-4 text-center">
          <p className="text-gray-700">
            ¿Ya tienes una cuenta?{" "}
            <Link
              to={redirect ? `/login?redirect=${redirect}` : "/login"}
              className="text-purple-600 hover:underline"
            >
              Iniciar sesión
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Register;
