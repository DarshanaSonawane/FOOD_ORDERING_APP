import { useEffect, useState } from "react";
import "./Listfood.css";

const API_URL = "http://localhost:8080/api/foods";

function Listfood() {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  const fetchFoods = async () => {
    setLoading(true);
    setError(""); 
    try {    

      const res = await fetch(API_URL);
      if (!res.ok) throw new Error(`Server responded ${res.status}`);
      setFoods(await res.json());
      
    } catch (err) {
      console.error(err);
      setError("Could not load food items.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFoods();
  }, []);

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete "${name}"?`)) return;

    setDeletingId(id);
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error(`Server responded ${res.status}`);
      setFoods((prev) => prev.filter((food) => food.id !== id));
    } catch (err) {
      console.error(err);
      alert("Could not delete the item. Try again.");
    } finally {
      setDeletingId(null);
    }
  };

  const filtered = foods.filter((food) =>
    `${food.name} ${food.category}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="listfood-page">
      <div className="listfood-card">
        <div className="listfood-header">
          <div>
            <h2 className="listfood-title">Food list</h2>
            <span className="listfood-count">{foods.length} items</span>
          </div>
          <input
            type="text"
            placeholder="Search by name or category"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="listfood-search"
          />
        </div>

        {loading && <p className="listfood-state">Loading...</p>}

        {!loading && error && (
          <p className="listfood-state error">
            {error}
            <button className="listfood-retry" onClick={fetchFoods}>
              Retry
            </button>
          </p>
        )}

        {!loading && !error && filtered.length === 0 && (
          <p className="listfood-state">
            {foods.length === 0 ? "No food items yet." : "No items match your search."}
          </p>
        )}

        {!loading && !error && filtered.length > 0 && (
          <div className="listfood-table-wrap">
            <table className="listfood-table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((food) => (
                  <tr key={food.id}>
                    <td>
                      {/* Change imageUrl if your FoodResponse uses a different field name */}
                      <img
                        src={food.imageUrl}
                        alt={food.name}
                        className="listfood-img"
                      />
                    </td>
                    <td>
                      <div className="listfood-name">{food.name}</div>
                      <div className="listfood-desc">{food.description}</div>
                    </td>
                    <td>
                      <span className="listfood-badge">{food.category}</span>
                    </td>
                    <td>₹{food.price}</td>
                    <td>
                      <button
                        className="listfood-delete"
                        disabled={deletingId === food.id}
                        onClick={() => handleDelete(food.id, food.name)}
                      >
                        {deletingId === food.id ? "Deleting..." : "Delete"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Listfood;