import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setSearchText } from "../../Redux/globalSlice";

const useDebounce = (searchText: string) => {
  const dispatch = useDispatch();
  const debounceOnChange = useCallback(() => {
    dispatch(setSearchText(searchText));
  }, [searchText]);

  useEffect(() => {
    const updateSearchText = setTimeout(() => {
      debounceOnChange();
    }, 1000);
    return () => clearTimeout(updateSearchText);
  }, [debounceOnChange]);
};
export default useDebounce;
