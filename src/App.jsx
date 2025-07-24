import { useEffect, useState } from 'react'
import { Data } from './ProductData'
import './App.css'

function App() {
  const [data, setData] = useState([]);
  const [id, setId] = useState(0); // set id to 0 due to integer value
  const [p_name, setProductName] = useState('');
  const [p_price, setProductPrice] = useState('');
  const [p_image, setProductImage] = useState('');

  useEffect(() => {
    setData(Data)
  }, []);

  const handleEdit = (editId) => {
    const itemToEdit = data.find(item => item.id === editId);
    if (itemToEdit) {
      setId(itemToEdit.id);
      setProductName(itemToEdit.name);
      setProductPrice(String(itemToEdit.price));
      setProductImage(itemToEdit.image);
    }
  };


  const handleDelete = (deleteId) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      const updatedData = data.filter(item => item.id !== deleteId);
      setData(updatedData);
      handleClear();
    }
  };

  const handleSave = () => {
    if (!p_name || !p_price || !p_image) {
      alert('Please fill all fields!');
      return;
    }

    const newProduct = {
      id: id === 0 ? Date.now() : id, // use Date.now() for new id
      name: p_name,
      price: parseFloat(p_price),
      image: p_image
    };

    if (id === 0) {
      // Add new
      setData([...data, newProduct]);
    } else {
      // Update existing
      const updated = data.map(item => (item.id === id ? newProduct : item));
      setData(updated);
    }

    handleClear();
  };

  const handleClear = () => {
    setId(0);
    setProductName('');
    setProductPrice('');
    setProductImage('');
  };

  return (
    <div className="container mt-4">
      <h1>Add / Edit Product</h1>

      <div className="d-flex justify-content-center gap-3 my-4 flex-wrap">
        <div>
          <label>Product Name:&nbsp;
            <input
              type="text"
              placeholder="Enter Product Name"
              value={p_name}
              onChange={(e) => setProductName(e.target.value)}
              className="form-control"
            />
          </label>
        </div>

        <div>
          <label>Product Price:&nbsp;
            <input
              type="number"
              placeholder="Enter Product Price"
              value={p_price}
              onChange={(e) => setProductPrice(e.target.value)}
              className="form-control"
            />
          </label>
        </div>

        <div>
          <label>Product Image URL:&nbsp;
            <input
              type="text"
              placeholder="Enter Image URL"
              value={p_image}
              onChange={(e) => setProductImage(e.target.value)}
              className="form-control"
            />
          </label>
        </div>

        <div className="d-flex align-items-end">
          <button className="btn btn-primary me-2" onClick={handleSave}>
            {id === 0 ? 'Save' : 'Update'}
          </button>
          <button className="btn btn-secondary" onClick={handleClear}>Clear</button>
        </div>
      </div>

      <table className="table table-bordered text-center">
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Product Id</th>
            <th>Product Name</th>
            <th>Product Price</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>Rs {item.price}</td>
                <td>
                  <img src={item.image} alt={item.name} style={{ width: '80px', height: '80px', objectFit: 'cover' }} />
                </td>
                <td>
                  <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(item.id)}>Edit</button>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDelete(item.id)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr><td colSpan="6">No products found.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
export default App
