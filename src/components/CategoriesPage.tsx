const CategoriesPage = () => {
  return (
    <div className="categories-page">
      <h1>Category</h1>
      <div className="categories-grid">
        <button type="button" className="category-card">
          Home
        </button>
        <button type="button" className="category-card">
          Work
        </button>
        <button type="button" className="category-card">
          Create categories
        </button>
      </div>
    </div>
  );
};

export default CategoriesPage;
