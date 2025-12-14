import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchHistory = () => {
  const [history, setHistory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("searchHistory") || "[]");
    setHistory(saved);
  }, []);

  const handleSelect = (term) => {
    // Lưu lại search vào localStorage
    const newHistory = [term, ...history.filter(h => h!==term)].slice(0,10);
    setHistory(newHistory);
    localStorage.setItem("searchHistory", JSON.stringify(newHistory));

    navigate(`/san-pham?search=${encodeURIComponent(term)}`);
  };

  const handleDelete = (term) => {
    const newHistory = history.filter(h => h!==term);
    setHistory(newHistory);
    localStorage.setItem("searchHistory", JSON.stringify(newHistory));
  };

  if(history.length===0) return null;

  return (
    <div className="p-4 bg-gray-50 border rounded mt-4">
      <h4 className="font-semibold mb-2 text-gray-700">🔎 Lịch sử tìm kiếm:</h4>
      <ul className="space-y-2">
        {history.map((term, idx)=>(
          <li key={idx} className="flex justify-between items-center bg-white px-3 py-1 rounded shadow">
            <span className="cursor-pointer text-blue-600 hover:underline" onClick={()=>handleSelect(term)}>
              {term}
            </span>
            <button className="text-red-500 text-sm hover:underline" onClick={()=>handleDelete(term)}>Xóa</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchHistory;
