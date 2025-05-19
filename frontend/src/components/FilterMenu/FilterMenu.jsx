import { normalizeImageName } from '../../utils/Normalize.js';

const FilterMenu = ({ item, isSelected, onSelect, onAddToCart }) => {
  return (
    <div className="filter-menu-item">
      <button
        onClick={() => {
          onSelect(item);
          onAddToCart(item);
        }}
        className={`flex flex-col items-center p-2 rounded ${isSelected ? 'bg-blue-400' : 'bg-gray-700'}`}
      >
        <img
          src={`/images/${normalizeImageName(item.name)}.jpg`}
          alt={item.name}
          className="w-16 h-16 object-cover mb-2 rounded"
          onError={(e) => (e.target.src = 'https://via.placeholder.com/100')}
        />
        <p className="text-white text-sm">{item.name}</p>
      </button>
    </div>
  );
};

export default FilterMenu;