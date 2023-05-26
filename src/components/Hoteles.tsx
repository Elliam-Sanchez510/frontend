import axios, { AxiosResponse } from "axios";
import { useState, useEffect } from "react";

function Hoteles() {
  interface Hotel {
    id: number;
    name: string;
    address: string;
    phone: string;
  }

  const [hoteles, setHoteles] = useState<Hotel[]>([]);
  const [nuevoHotel, setNuevoHotel] = useState<{ name: string; address: string; phone: string }>({
    name: "",
    address: "",
    phone: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response: AxiosResponse<Hotel[]> = await axios.get("http://localhost:3000/hotel");
      setHoteles(response.data);
    } catch (error) {
      console.error("Error al obtener los hoteles:", error);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNuevoHotel({ ...nuevoHotel, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response: AxiosResponse<Hotel> = await axios.post("http://localhost:3000/hotel", nuevoHotel);
      console.log(response.data);
      // Si la inserción fue exitosa, puedes actualizar la lista de hoteles
      setHoteles([...hoteles, response.data]);
      setNuevoHotel({ name: "", address: "", phone: "" });
    } catch (error) {
      console.error("Error al enviar el nuevo hotel:", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3000/hotel/${id}`);
      setHoteles(hoteles.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error al eliminar el hotel:", error);
    }
  };

  return (
    <div>
      <h1 className="text-lg font-bold text-violet-600">Listado de Hoteles</h1>
      <div>
        <form className="flex flex-col space-y-4 w-80" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={nuevoHotel.name}
            onChange={handleInputChange}
            placeholder="Nombre del hotel"
            className="p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="address"
            value={nuevoHotel.address}
            onChange={handleInputChange}
            placeholder="Dirección"
            className="p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="phone"
            value={nuevoHotel.phone}
            onChange={handleInputChange}
            placeholder="Teléfono"
            className="p-2 border border-gray-300 rounded"
          />
          <button
            type="submit"
            className="p-2 bg-blue-500 border-2 border-inherit rounded-lg text-white font-bold"
          >
            Agregar hotel
          </button>
        </form>

        <div className="border border-gray-300 p-4 rounded-md w-80">
          {hoteles.map((item) => (
            <div key={item.id} className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold">Hotel</h3>
                <h3>Precio: {item.name}</h3>
              </div>
              <button
                onClick={() => handleDelete(item.id)}
                className="p-2 bg-red-500 text-white rounded-lg"
              >
                Eliminar
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default Hoteles
