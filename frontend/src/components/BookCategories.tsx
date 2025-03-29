import { useEffect, useState } from 'react';
import './BookCategories.css';

function CategoryFilter({
  selectedCategories,
  setSelectedCategories,
}: {
  selectedCategories: string[];
  setSelectedCategories: (categories: string[]) => void;
}) {
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          'https://localhost:5000/Books/GetBookCategories'
        ); //get the data and pull it into variable "response"
        const data = await response.json(); //convert "response" to json format
        setCategories(data); //call setCategories and pass it data. This sets the variable "categories" equal to "data".
        console.log('Fetched categories: ', data);
      } catch (error) {
        console.log('Error fetching categories', error);
      }
    };

    fetchCategories();
  }, []);

  function handleCheckboxChange({ target }: { target: HTMLInputElement }) {
    //this function is called when the user checks OR unchecks a category.
    //the following logic determines whether the category should be removed (unchecked) or added (checked)
    const updatedCategories = selectedCategories.includes(target.value) //is target.value (the value of the checkbox) already in selectedCategories?
      ? selectedCategories.filter((x) => x !== target.value) //if the value is already in selectedCategories, take it out
      : [...selectedCategories, target.value]; //if the value isn't already in selectedCategories, add it in
    setSelectedCategories(updatedCategories); //set selectedCategories
  }

  return (
    <div className="category-filter">
      <h5>Book Category</h5>
      <div className="category-list">
        {categories.map((c) => (
          <div key={c} className="category-item">
            <input
              type="checkbox"
              id={c}
              value={c}
              className="category-checkbox"
              onChange={handleCheckboxChange}
            />
            <label htmlFor={c}>{c}</label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryFilter;
