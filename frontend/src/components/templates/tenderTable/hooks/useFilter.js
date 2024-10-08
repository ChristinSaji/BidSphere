/* Author: Ashish Bhasin */
import { useState, useEffect } from 'react';

const useFilter = (data, filters, setOpen) => {
  const [filterData, setFilterData] = useState([]);
  let isFilterPresent = false;
  useEffect(() => {
    let filteredTenders = data;
    if (filters && filters.filterName) {
      isFilterPresent = true;
      filteredTenders = data.filter(tender => tender.title
        .toLowerCase()
        .includes(filters.filterName.toLowerCase()));
    }
    if (filters && filters.status) {
      isFilterPresent = true;
      filteredTenders = filteredTenders.filter(tender => tender.status === filters.status);
    }

    if (filters && filters.startDate) {
      isFilterPresent = true;
      filteredTenders = filteredTenders.filter(tender => new Date(tender.createdAt) >= filters.startDate);
    }

    if (filters && filters.endDate) {
      isFilterPresent = true;
      filteredTenders = filteredTenders.filter(tender => new Date(tender.createdAt) <= filters.endDate);
    }
    setFilterData([...filteredTenders]);
    if (filteredTenders.length === 0 && isFilterPresent) {
      setOpen(true);
    }
  }, [data, setFilterData, filters]);

  return { filterData };
};

export default useFilter;
