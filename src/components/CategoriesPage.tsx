import { useEffect, useState } from "react";
import { addCategory, fetchCategories } from "../api/Api";
import type { Category, CategoryInsert } from "./Types";
import CategoryForm from "./CategoryForm";
import Loader from "./Loader";

const CategoriesPage = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isCategoryFormOpen, setIsCategoryFormOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  const handleCreateCategory = async (newCategory: CategoryInsert) => {
    try {
      await addCategory(newCategory);
      const updatedCategories = await fetchCategories();
      setCategories(updatedCategories);
      setIsCategoryFormOpen(false);
    } catch (error) {
      console.error("Failed to add category:", error);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="categories-page">
      {isCategoryFormOpen && (
        <CategoryForm
          onClose={() => setIsCategoryFormOpen(false)}
          onCreate={handleCreateCategory}
        />
      )}
      <h1>Categories</h1>
      <div className="categories-grid">
        {categories.length === 0 ? (
          <span>There is no categories</span>
        ) : (
          categories.map((category) => (
            <div key={category.id} className="category-item">
              <button
                type="button"
                className="category-card"
                style={{ backgroundColor: category.color }}
              >
                {category.title}
              </button>
            </div>
          ))
        )}
      </div>
      <button
        className="simple-button"
        type="button"
        onClick={() => setIsCategoryFormOpen(true)}
      >
        Create a category
      </button>
    </div>
  );
};

export default CategoriesPage;
