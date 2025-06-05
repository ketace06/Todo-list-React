import type { CategoryInsert } from "./Types";
import Loader from "./Loader";
import { useCategoryFormStore } from "../stores/categoriesStore";
import { useShallow } from "zustand/react/shallow";

type CategoryFormProps = {
  onClose: () => void;
  onCreate: (category: CategoryInsert) => void;
};

const CategoryForm = ({ onClose, onCreate }: CategoryFormProps) => {
  const { title, color, loading, setTitle, setColor, setLoading } =
    useCategoryFormStore(
      useShallow((state) => ({
        title: state.title,
        color: state.color,
        loading: state.loading,
        setTitle: state.setTitle,
        setColor: state.setColor,
        setLoading: state.setLoading,
      })),
    );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;
    setLoading(true);
    try {
      await onCreate({
        title,
        color,
      });
      setTitle("");
      setColor("#cccccc");
      setLoading(false);
    } catch {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <form
      className="category-form-popup"
      style={{ display: "flex", opacity: 1 }}
      onSubmit={handleSubmit}
    >
      <div className="title-formclose-btn">
        <h1>Create Category</h1>
        <button type="button" className="close-btn" onClick={onClose}>
          ❌
        </button>
      </div>
      <div className="form">
        <p className="p-form">Category Name*</p>
        <input
          className="input-text"
          type="text"
          name="title"
          placeholder="Enter category name"
          autoComplete="off"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <p className="p-form">Color*</p>
        <input
          className="input-color"
          type="color"
          name="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          required
        />
      </div>
      <button className="simple-button" type="submit">
        Create
      </button>
    </form>
  );
};

export default CategoryForm;
