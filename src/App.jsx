import { useState } from 'react'
import './App.css'

const initialProducts = [
  {
    id: 1,
    name: 'Bluetooth Speaker',
    category: 'Electronic',
    quantity: 5,
    price: 30,
  },
  {
    id: 2,
    name: 'Edifier M43560',
    category: 'Electronic',
    quantity: 0,
    price: 0,
  },
  {
    id: 3,
    name: 'Sony 4K Ultra 55" TV',
    category: 'Electronic',
    quantity: 17,
    price: 70,
  },
  {
    id: 4,
    name: 'Samsung 55" TV',
    category: 'Electronic',
    quantity: 50,
    price: 12,
  },
  {
    id: 5,
    name: 'Samsung S24 Ultra',
    category: 'Electronic',
    quantity: 0,
    price: 0,
  },
]

function App() {
  const [products, setProducts] = useState(initialProducts)
  const [editingProduct, setEditingProduct] = useState(null)
  const [deletingProduct, setDeletingProduct] = useState(null)
  const [editPrice, setEditPrice] = useState('')
  const [editQuantity, setEditQuantity] = useState('')

  const totalProducts = products.length
  const totalStoreValue = products.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0,
  )
  const outOfStock = products.filter(product => product.quantity === 0).length
  const numberOfCategories = new Set(products.map(product => product.category)).size

  const openEditModal = product => {
    setEditingProduct(product)
    setEditPrice(product.price.toString())
    setEditQuantity(product.quantity.toString())
  }

  const closeEditModal = () => {
    setEditingProduct(null)
    setEditPrice('')
    setEditQuantity('')
  }

  const saveEdit = () => {
    const price = parseFloat(editPrice)
    const quantity = parseInt(editQuantity, 10)

    if (Number.isNaN(price) || price < 0 || Number.isNaN(quantity) || quantity < 0) {
      return
    }

    setProducts(products.map(product => {
      if (product.id !== editingProduct.id) return product
      return {
        ...product,
        price,
        quantity,
      }
    }))
    closeEditModal()
  }

  const openDeleteModal = product => {
    setDeletingProduct(product)
  }

  const closeDeleteModal = () => {
    setDeletingProduct(null)
  }

  const confirmDelete = () => {
    setProducts(products.filter(product => product.id !== deletingProduct.id))
    closeDeleteModal()
  }

  return (
    <div className="app-shell">
      <header className="page-header">
        <h1>Inventory Dashboard</h1>
        <p>Live product inventory</p>
      </header>

      <section className="summary-grid">
        <article className="widget-card">
          <span className="widget-label">Total Products</span>
          <strong>{totalProducts}</strong>
        </article>
        <article className="widget-card">
          <span className="widget-label">Total Store Value</span>
          <strong>${totalStoreValue.toFixed(2)}</strong>
        </article>
        <article className="widget-card">
          <span className="widget-label">Out of Stock</span>
          <strong>{outOfStock}</strong>
        </article>
        <article className="widget-card">
          <span className="widget-label">Number of Categories</span>
          <strong>{numberOfCategories}</strong>
        </article>
      </section>

      <section className="table-panel">
        <div className="table-header">
          <h2>Product List</h2>
        </div>

        <div className="table-wrapper">
          <table className="product-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>{product.category}</td>
                  <td>${product.price.toFixed(2)}</td>
                  <td>{product.quantity}</td>
                  <td className="actions-cell">
                    <button
                      className="action-button edit"
                      type="button"
                      onClick={() => openEditModal(product)}
                    >
                      Edit
                    </button>
                    <button
                      className="action-button delete"
                      type="button"
                      onClick={() => openDeleteModal(product)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {products.length === 0 && (
            <div className="empty-state">No products available.</div>
          )}
        </div>
      </section>

      {editingProduct && (
        <div className="modal-backdrop" role="dialog" aria-modal="true">
          <div className="modal-card">
            <div className="modal-header">
              <h3>Edit Product</h3>
              <button className="close-button" type="button" onClick={closeEditModal}>
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="modal-field">
                <label>Name</label>
                <span>{editingProduct.name}</span>
              </div>
              <div className="modal-field">
                <label>Price</label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={editPrice}
                  onChange={e => setEditPrice(e.target.value)}
                />
              </div>
              <div className="modal-field">
                <label>Quantity</label>
                <input
                  type="number"
                  min="0"
                  step="1"
                  value={editQuantity}
                  onChange={e => setEditQuantity(e.target.value)}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button className="secondary-button" type="button" onClick={closeEditModal}>
                Cancel
              </button>
              <button className="primary-button" type="button" onClick={saveEdit}>
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

export default App
