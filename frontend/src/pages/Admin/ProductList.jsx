import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useCreateProductMutation,
  useUploadProductImageMutation,
} from "../../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";
import { toast } from "react-toastify";

const ProductList = () => {
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [brand, setBrand] = useState("");
  const [stock, setStock] = useState(0);
  const [measurementType, setMeasurementType] = useState("METRO");
  const [productType, setProductType] = useState("Tela");
  const [imageUrl, setImageUrl] = useState(null);
  const navigate = useNavigate();

  const [uploadProductImage] = useUploadProductImageMutation();
  const [createProduct] = useCreateProductMutation();
  const { data: categories } = useFetchCategoriesQuery();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const productData = new FormData();
      productData.append("image", image);
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("category", category);
      productData.append("quantity", quantity);
      productData.append("brand", brand);
      productData.append("countInStock", stock);
      productData.append("measurementType", measurementType);
      productData.append("productType", productType);

      const { data } = await createProduct(productData);

    
      if (data.error) {
        toast.error(`Product creation failed: ${data.error}`);
      } else {
        toast.success(`${data.name} is created`);
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      toast.error(`Product creation failed: ${error.message || error}`);
    }
  };

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);

    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success(res.message);
      setImage(res.image);
      setImageUrl(res.image);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <div className="container mx-auto p-6 min-h-screen bg-gradient-to-r from-gray-100 via-white to-gray-100">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-3/4 p-6 bg-white shadow-lg rounded-lg">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">Crear Producto</h1>

          {imageUrl && (
            <div className="text-center mb-6">
              <img
                src={imageUrl}
                alt="product"
                className="block mx-auto max-h-56 object-cover rounded-lg"
              />
            </div>
          )}

          <div className="mb-6">
            <label className="block text-gray-700 font-bold mb-2 cursor-pointer">
              {image ? image.name : "Sube tu imagen"}
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={uploadFileHandler}
                className="hidden"
              />
            </label>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Nombre del producto</label>
              <input
                type="text"
                className="p-4 w-full border rounded-lg bg-white text-gray-700"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Precio en Soles</label>
              <input
                type="number"
                className="p-4 w-full border rounded-lg bg-white text-gray-700"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Cantidad</label>
              <input
                type="number"
                className="p-4 w-full border rounded-lg bg-white text-gray-700"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Marca</label>
              <input
                type="text"
                className="p-4 w-full border rounded-lg bg-white text-gray-700"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Tipo de producto</label>
              <select
                className="p-4 w-full border rounded-lg bg-white text-gray-700"
                value={productType}
                onChange={(e) => setProductType(e.target.value)}
              >
                <option value="Tela">Tela</option>
                <option value="Confeccionado">Confeccionado</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Tipo de medida</label>
              <select
                className="p-4 w-full border rounded-lg bg-white text-gray-700"
                value={measurementType}
                onChange={(e) => setMeasurementType(e.target.value)}
              >
                <option value="METRO">METRO</option>
                <option value="UNIDAD">UNIDAD</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Descripcion</label>
              <textarea
                className="p-4 w-full border rounded-lg bg-white text-gray-700"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Cantidad de stock</label>
              <input
                type="text"
                className="p-4 w-full border rounded-lg bg-white text-gray-700"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Categoria</label>
              <select
                className="p-4 w-full border rounded-lg bg-white text-gray-700"
                onChange={(e) => setCategory(e.target.value)}
              >
                {categories?.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              className="py-4 px-10 mt-5 rounded-lg text-lg font-bold bg-blue-600 text-white hover:bg-blue-700 transition duration-300"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
