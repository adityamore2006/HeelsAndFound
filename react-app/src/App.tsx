import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

interface Item {
  _id: string;
  name: string;
  description: string;
  type: 'found' | 'lost';
  category: string;
  status: 'active' | 'recovered';
  locationFound: string;
  locationDroppedOff: string;
  lastSeenLocation: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

type ItemForm = {
  name: string;
  description: string;
  type: 'found' | 'lost';
  category: string;
  locationFound: string;
  locationDroppedOff: string;
  lastSeenLocation: string;
  image: string;
};

const CATEGORIES = ['Keys', 'ID / Cards', 'Electronics', 'Clothing', 'Bags', 'Other'];

const emptyForm = (type: 'found' | 'lost'): ItemForm => ({
  name: '',
  description: '',
  type,
  category: '',
  locationFound: '',
  locationDroppedOff: '',
  lastSeenLocation: '',
  image: '',
});

function App() {
  const API_URL = 'http://localhost:3000/api/items';

  const [items, setItems] = useState<Item[]>([]);
  const [activeTab, setActiveTab] = useState<'found' | 'lost'>('found');
  const [formData, setFormData] = useState<ItemForm>(emptyForm('found'));
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editId, setEditId] = useState<string | null>(null);

  const fetchItems = async (type: 'found' | 'lost') => {
    try {
      const response = await axios.get<Item[]>(`${API_URL}?type=${type}`);
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  useEffect(() => {
    fetchItems(activeTab);
  }, [activeTab]);

  const switchTab = (tab: 'found' | 'lost') => {
    setActiveTab(tab);
    setFormData(emptyForm(tab));
    setIsEditing(false);
    setEditId(null);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEditing && editId) {
        await axios.put<Item>(`${API_URL}/${editId}`, formData);
        setIsEditing(false);
        setEditId(null);
      } else {
        await axios.post<Item>(API_URL, formData);
      }
      setFormData(emptyForm(activeTab));
      fetchItems(activeTab);
    } catch (error) {
      console.error('Error saving item:', error);
    }
  };

  const handleEdit = (item: Item) => {
    setFormData({
      name: item.name,
      description: item.description || '',
      type: item.type,
      category: item.category || '',
      locationFound: item.locationFound || '',
      locationDroppedOff: item.locationDroppedOff || '',
      lastSeenLocation: item.lastSeenLocation || '',
      image: item.image || '',
    });
    setIsEditing(true);
    setEditId(item._id);
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchItems(activeTab);
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setEditId(null);
    setFormData(emptyForm(activeTab));
  };

  const formTitle = isEditing
    ? 'Edit Item'
    : activeTab === 'found'
    ? 'Post a Found Item'
    : 'Report a Lost Item';

  const submitLabel = isEditing
    ? 'Update Item'
    : activeTab === 'found'
    ? 'Post Found Item'
    : 'Report Lost Item';

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Heels &amp; Found</h1>
        <p className="app-subtitle">UNC Chapel Hill Lost &amp; Found</p>
      </header>

      <nav className="tab-nav">
        <button
          className={`tab-btn ${activeTab === 'found' ? 'tab-btn--active' : ''}`}
          onClick={() => switchTab('found')}
        >
          Found Items
        </button>
        <button
          className={`tab-btn ${activeTab === 'lost' ? 'tab-btn--active' : ''}`}
          onClick={() => switchTab('lost')}
        >
          Lost Items
        </button>
      </nav>

      <main className="main-content">
        <section className="form-section">
          <h2>{formTitle}</h2>
          <form onSubmit={handleSubmit} className="item-form">
            <input
              name="name"
              placeholder="Item name *"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <textarea
              name="description"
              placeholder="Description (color, brand, distinguishing features…)"
              value={formData.description}
              onChange={handleChange}
            />
            <select name="category" value={formData.category} onChange={handleChange}>
              <option value="">Select category (optional)</option>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>

            {activeTab === 'found' ? (
              <>
                <input
                  name="locationFound"
                  placeholder="Where did you find it? *"
                  value={formData.locationFound}
                  onChange={handleChange}
                  required
                />
                <input
                  name="locationDroppedOff"
                  placeholder="Where did you drop it off? *"
                  value={formData.locationDroppedOff}
                  onChange={handleChange}
                  required
                />
              </>
            ) : (
              <input
                name="lastSeenLocation"
                placeholder="Where did you last see it? *"
                value={formData.lastSeenLocation}
                onChange={handleChange}
                required
              />
            )}

            <input
              name="image"
              placeholder="Image URL (optional)"
              value={formData.image}
              onChange={handleChange}
            />

            <div className="form-actions">
              <button type="submit" className="btn btn--primary">
                {submitLabel}
              </button>
              {isEditing && (
                <button type="button" className="btn btn--secondary" onClick={cancelEdit}>
                  Cancel
                </button>
              )}
            </div>
          </form>
        </section>

        <section className="items-grid-section">
          <h2>
            {activeTab === 'found' ? 'Found Items' : 'Lost Items'} ({items.length})
          </h2>
          <div className="items-grid">
            {items.map((item) => (
              <div key={item._id} className="item-card">
                {item.image && (
                  <img src={item.image} alt={item.name} className="item-card__image" />
                )}
                <div className="item-card__body">
                  <h3 className="item-card__title">{item.name}</h3>
                  {item.description && (
                    <p className="item-card__description">{item.description}</p>
                  )}
                  {item.category && (
                    <span className="item-card__category">{item.category}</span>
                  )}

                  {item.type === 'found' ? (
                    <>
                      {item.locationFound && (
                        <p><strong>Found at:</strong> {item.locationFound}</p>
                      )}
                      {item.locationDroppedOff && (
                        <p><strong>Dropped off at:</strong> {item.locationDroppedOff}</p>
                      )}
                    </>
                  ) : (
                    item.lastSeenLocation && (
                      <p><strong>Last seen:</strong> {item.lastSeenLocation}</p>
                    )
                  )}

                  <p className="item-card__date">
                    Posted {new Date(item.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="item-card__actions">
                  <button
                    className="btn btn--secondary btn--sm"
                    onClick={() => handleEdit(item)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn--danger btn--sm"
                    onClick={() => handleDelete(item._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
            {items.length === 0 && (
              <p className="empty-state">
                No {activeTab} items posted yet. Be the first!
              </p>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
