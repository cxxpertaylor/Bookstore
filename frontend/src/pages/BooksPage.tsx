import { useState } from 'react';
import CategoryFilter from '../components/BookCategories';
import BookList from '../components/BookList';
import WelcomeBanner from '../components/WelcomeBanner';
import CartSummary from '../components/CartSummary';
import BackToTop from '../components/BackToTop';

function BooksPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]); //declare here so that they can be passed to CategoryFilter and BookList components

  return (
    <div className="container mt-4">
      <CartSummary />
      <WelcomeBanner />
      <div className="row">
        <div className="col-md-3">
          <CategoryFilter
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
          />
        </div>
        <div className="col-md-9">
          <BookList selectedCategories={selectedCategories} />
          <BackToTop />
        </div>
      </div>
    </div>
  );
}

export default BooksPage;
