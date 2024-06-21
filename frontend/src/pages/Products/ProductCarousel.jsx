import { useGetTopProductsQuery } from "../../redux/api/productApiSlice";
import Message from "../../components/Message";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="mb-4 lg:block xl:block md:block bg-black p-6 rounded-lg shadow-lg">
      {isLoading ? null : error ? (
        <Message variant="danger">
          {error?.data.message || error.error}
        </Message>
      ) : (
        <Slider
          {...settings}
          className="xl:w-[70rem] lg:w-[50rem] md:w-[50rem] sm:w-[50rem] sm:block"
        >
          {products.map(({ image, _id, name }) => (
            <div key={_id} className="relative">
              <div className="relative flex justify-center items-center">
                <img
                  src={image}
                  alt={name}
                  className="w-full rounded-lg object-cover h-[35rem]"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 flex items-center justify-center rounded-lg">
                  <h2 className="text-4xl font-bold text-white text-center">
                    {name}
                  </h2>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
};

export default ProductCarousel;
