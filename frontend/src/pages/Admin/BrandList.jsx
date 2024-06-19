import { useState } from "react";
import {
  useCreateBrandMutation,
  useUpdateBrandMutation,
  useDeleteBrandMutation,
  useFetchBrandsQuery,
} from "../../redux/api/brandApiSlice";
import { toast } from "react-toastify";
import BrandForm from "../../components/CategoryForm"; // Correct import path
import Modal from "../../components/Modal";
import AdminMenu from "./AdminMenu";

const BrandList = () => {
  const { data: brands } = useFetchBrandsQuery();
  const [name, setName] = useState("");
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [updatingName, setUpdatingName] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const [createBrand] = useCreateBrandMutation();
  const [updateBrand] = useUpdateBrandMutation();
  const [deleteBrand] = useDeleteBrandMutation();

  const handleCreateBrand = async (e) => {
    e.preventDefault();

    if (!name) {
      toast.error("El nombre de la marca es obligatorio");
      return;
    }

    try {
      const result = await createBrand({ name }).unwrap();
      if (result.error) {
        toast.error(result.error);
      } else {
        setName("");
        toast.success(`${result.name} ha sido creada.`);
      }
    } catch (error) {
      console.error(error);
      toast.error("La creación de la marca falló, intenta de nuevo.");
    }
  };

  const handleUpdateBrand = async (e) => {
    e.preventDefault();

    if (!updatingName) {
      toast.error("El nombre de la marca es obligatorio");
      return;
    }

    try {
      const result = await updateBrand({
        brandId: selectedBrand._id,
        updatedBrand: {
          name: updatingName,
        },
      }).unwrap();

      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(`${result.name} ha sido actualizada`);
        setSelectedBrand(null);
        setUpdatingName("");
        setModalVisible(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteBrand = async () => {
    try {
      const result = await deleteBrand(selectedBrand._id).unwrap();

      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(`${result.name} ha sido eliminada.`);
        setSelectedBrand(null);
        setModalVisible(false);
      }
    } catch (error) {
      console.error(error);
      toast.error("La eliminación de la marca falló. Intenta de nuevo.");
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200">
      <AdminMenu />
      <div className="md:w-3/4 p-6 bg-white shadow-lg rounded-lg m-4 ml-[2cm]">
        <div className="text-3xl font-bold mb-6 text-gray-800">Administrar Marcas</div>
        <BrandForm
          value={name}
          setValue={setName}
          handleSubmit={handleCreateBrand}
        />
        <hr className="my-6 border-gray-300" />

        <div className="flex flex-wrap">
          {brands?.map((brand) => (
            <div key={brand._id} className="p-3 w-1/2 lg:w-1/3">
              <button
                className="bg-white border border-pink-500 text-pink-500 py-2 px-4 rounded-lg w-full hover:bg-pink-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50"
                onClick={() => {
                  setModalVisible(true);
                  setSelectedBrand(brand);
                  setUpdatingName(brand.name);
                }}
              >
                {brand.name}
              </button>
            </div>
          ))}
        </div>

        <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
          <BrandForm
            value={updatingName}
            setValue={(value) => setUpdatingName(value)}
            handleSubmit={handleUpdateBrand}
            buttonText="Actualizar"
            handleDelete={handleDeleteBrand}
          />
        </Modal>
      </div>
    </div>
  );
};

export default BrandList;
