import { useState } from "react";
import "./Addfood.css";

const API_URL = "http://localhost:8080/api/foods";

const initialForm = {
  name: "",
  description: "",
  price: "",
  category: "",
};

function Addfood() {
  const [form, setForm] = useState(initialForm);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImage(file);
    setPreview(URL.createObjectURL(file));
    setErrors((prev) => ({ ...prev, image: "" }));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Enter the food name";
    if (!form.price || Number(form.price) <= 0) newErrors.price = "Enter a valid price";
    if (!form.category) newErrors.category = "Select a category";
    if (!image) newErrors.image = "Select an image";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    setMessage({ text: "", type: "" });
    try {
      const formData = new FormData();
      // Backend expects: part "food" (JSON string) + part "file" (image)
      formData.append("food", JSON.stringify({ ...form, price: Number(form.price) }));
      // If the server answers 415 Unsupported Media Type, send the food part as JSON instead:
      // formData.append("food", new Blob([JSON.stringify({ ...form, price: Number(form.price) })], { type: "application/json" }));
      formData.append("file", image);

      // Do NOT set Content-Type manually; the browser adds the multipart boundary
      const res = await fetch(API_URL, { method: "POST", body: formData });
      if (!res.ok) throw new Error(`Server responded ${res.status}: ${await res.text()}`);

      setMessage({ text: "Food item added", type: "success" });
      setForm(initialForm);
      setImage(null);
      setPreview("");
    } catch (err) {
      console.error(err);
      setMessage({ text: err.message, type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="addfood-page">
      <form className="addfood-card" onSubmit={handleSubmit} noValidate>
        <h2 className="addfood-title">Add food item</h2>
        <p className="addfood-subtitle">Fill in the details to add a new item to the menu.</p>

        <div className="addfood-field">
          <label className="addfood-label">Food image</label>
          <label className={`addfood-dropzone ${errors.image ? "has-error" : ""}`}>
            {preview ? (
              <img src={preview} alt="Preview" className="addfood-preview" />
            ) : (
              <>
                <span>
                  <strong>Click to upload</strong> an image
                </span>
                <small>PNG or JPG, up to 10 MB</small>
              </>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleImage}
              className="addfood-file-input"
            />
          </label>
          {errors.image && <p className="addfood-error">{errors.image}</p>}
        </div>

        <div className="addfood-field">
          <label className="addfood-label" htmlFor="name">Food name</label>
          <input
            id="name"
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Paneer Butter Masala"
            className={`addfood-input ${errors.name ? "has-error" : ""}`}
          />
          {errors.name && <p className="addfood-error">{errors.name}</p>}
        </div>

        <div className="addfood-field">
          <label className="addfood-label" htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Short description of the dish"
            className="addfood-textarea"
          />
        </div>

        <div className="addfood-row">
          <div className="addfood-field">
            <label className="addfood-label" htmlFor="price">Price (₹)</label>
            <input
              id="price"
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              min="0"
              placeholder="250"
              className={`addfood-input ${errors.price ? "has-error" : ""}`}
            />
            {errors.price && <p className="addfood-error">{errors.price}</p>}
          </div>

          <div className="addfood-field">
            <label className="addfood-label" htmlFor="category">Category</label>
            <select
              id="category"
              name="category"
              value={form.category}
              onChange={handleChange}
              className={`addfood-select ${errors.category ? "has-error" : ""}`}
            >
              {/* values must match the category names in the customer app's assests.js */}
              <option value="">Select</option>
              <option value="biryani">Biryani</option>
              <option value="pizza">Pizza</option>
              <option value="burger">Burger</option>
              <option value="rasmalai">Rasmalai</option>
              <option value="salad">Salad</option>
              <option value="rolls">Rolls</option>
            </select>
            {errors.category && <p className="addfood-error">{errors.category}</p>}
          </div>
        </div>

        <button type="submit" className="addfood-button" disabled={loading}>
          {loading ? "Adding..." : "Add food"}
        </button>

        {message.text && (
          <p className={`addfood-message ${message.type}`}>{message.text}</p>
        )}
      </form>
    </div>
  );
}

export default Addfood;