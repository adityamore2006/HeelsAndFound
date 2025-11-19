import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

// 1. Define the Shape of your Data
interface Product {
  _id: string; // MongoDB generates this automatically
  name: string;
  location: string;
  image?: string; // Optional
}

// Type for the form data (doesn't need _id yet)
type ProductForm = Omit<Product, '_id'>;

function App() {
  const API_URL = "http://localhost:3000/api/products";

  // 2. Strictly Typed State
  const [products, setProducts] = useState<Product[]>([]);
  const [formData, setFormData] = useState<ProductForm>({ 
    name: '', 
    location: '',  
    image: '' 
  });
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editId, setEditId] = useState<string | null>(null);

  // READ
  const fetchProducts = async () => {
    try {
      const response = await axios.get<Product[]>(API_URL);
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Handle Input Changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // CREATE & UPDATE
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEditing && editId) {
        await axios.put<Product>(`${API_URL}/${editId}`, formData);
        setIsEditing(false);
        setEditId(null);
      } else {
        await axios.post<Product>(API_URL, formData);
      }
      setFormData({ name: '', location: '', image: '' });
      fetchProducts();
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  // DELETE
  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  // LOAD EDIT FORM
  const handleEdit = (product: Product) => {
    setFormData({
      name: product.name,
      location: product.location,
      image: product.image || ''
    });
    setIsEditing(true);
    setEditId(product._id);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Heels & Found</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <input 
          name="name" 
          placeholder="Name" 
          value={formData.name} 
          onChange={handleChange} 
          required 
        />
        <input 
          name="location" 
          type="string" 
          placeholder="Location Found" 
          value={formData.location} 
          onChange={handleChange} 
        />
        <input 
          name="image" 
          placeholder="Image URL" 
          value={formData.image} 
          onChange={handleChange} 
        />
        <button type="submit">{isEditing ? "Update" : "Add"}</button>
      </form>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
        {products.map((product) => (
          <div key={product._id} style={{ border: '3px solid #ccc', padding: '10px', borderRadius: '10px', overflow: 'hidden'}}>
            {product.image && <img src={product.image} alt={product.name} style={{ width: '100px' }} />}
            <h3>{product.name}</h3>
            <p>Location: {product.location}</p>
            
            
            <div style={{ display: 'flex', gap: '5px' }}>
              <button onClick={() => handleEdit(product)}>Edit</button>
              <button onClick={() => handleDelete(product._id)} style={{ backgroundColor: '#ff4444', color: 'white' }}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;