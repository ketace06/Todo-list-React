import { useEffect, useState } from "react";
import {
  useCategoriesStore,
  useCategoryFormStore,
} from "../stores/categoriesStore";
import CategoryForm from "./CategoryForm";
import Loader from "./Loader";
import { useShallow } from "zustand/react/shallow";
import { deleteCategory } from "./assets/api/Api";
import { notifySuccess } from "./UserNotifications";

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
  } = useCategoriesStore(
    useShallow((state) => ({
      categories: state.categories,
      loading: state.loading,
      isCategoryFormOpen: state.isCategoryFormOpen,
      loadCategories: state.loadCategories,
      openCategoryForm: state.openCategoryForm,
      closeCategoryForm: state.closeCategoryForm,
      createCategory: state.createCategory,
      clearCategories: state.clearCategories,
    })),
  );

  const { setLoading } = useCategoryFormStore(
    useShallow((state) => ({
      setLoading: state.setLoading,
    })),
  );

  const [categoryToDelete, setCategoryToDelete] = useState<{
    id: string;
    title: string;
  } | null>(null);

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  const handleCategoryClick = (categoryId: string, categoryTitle: string) => {
    setCategoryToDelete({ id: categoryId, title: categoryTitle });
  };

  const confirmDelete = async () => {
    if (!categoryToDelete) return;
    setLoading(true);
    try {
      await deleteCategory(categoryToDelete.id);
      await loadCategories();
      notifySuccess("The category has been deleted");
    } finally {
      setLoading(false);
      setCategoryToDelete(null);
    }
  };

  const cancelDelete = () => setCategoryToDelete(null);

  if (loading) return <Loader />;

  return (
    <div className="categories-page">
      {isCategoryFormOpen && (
        <CategoryForm onClose={closeCategoryForm} onCreate={createCategory} />
      )}
      {categoryToDelete && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 4,
          }}
        >
          <div
            style={{
              background: "#fff",
              padding: 24,
              borderRadius: 8,
              minWidth: 300,
              textAlign: "center",
            }}
          >
            <p>
              Do you really want to delete the category&nbsp;
              <b>{categoryToDelete.title}</b>
            </p>
            <div
              style={{
                display: "flex",
                gap: 12,
                justifyContent: "center",
                marginTop: 16,
              }}
            >
              <button className="simple-button" onClick={cancelDelete}>
                Cancel
              </button>
              <button className="simple-button" onClick={confirmDelete}>
                Yes, delete
              </button>
            </div>
          </div>
        </div>
      )}

      <h1>Categories</h1>

      <div className="categories-grid">
        {categories.length === 0 ? (
          <span>There are no categories</span>
        ) : (
          categories.map((category) => (
            <div key={category.id} className="category-item">
              <button
                type="button"
                className="category-card"
                style={{ backgroundColor: category.color }}
                onClick={() => handleCategoryClick(category.id, category.title)}
              >
                {category.title}
              </button>
            </div>
          ))
        )}
      </div>

      <div className="categories-button">
        <button
          type="button"
          className="simple-button"
          onClick={openCategoryForm}
        >
          Create a category
        </button>

        <button
          type="button"
          className="simple-button"
          onClick={clearCategories}
        >
          Clear all categories
        </button>
      </div>
    </div>
  );
};

export default CategoriesPage;
