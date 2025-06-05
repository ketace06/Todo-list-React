import { useEffect } from "react";
import { useCategoriesStore } from "../stores/categoriesStore";
import CategoryForm from "./CategoryForm";
import Loader from "./Loader";

const CategoriesPage = () => {
  const {
    categories,
    loading,
    isCategoryFormOpen,
    loadCategories,
    openCategoryForm,
    closeCategoryForm,
    createCategory,
    clearCategories,
  } = useCategoriesStore();

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="categories-page">
      {isCategoryFormOpen && (
        <CategoryForm onClose={closeCategoryForm} onCreate={createCategory} />
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
        type="button"
        className="simple-button"
        onClick={openCategoryForm}
      >
        Create a category
      </button>

      <button type="button" className="simple-button" onClick={clearCategories}>
        Clear all categories
      </button>
    </div>
  );
};

export default CategoriesPage;
