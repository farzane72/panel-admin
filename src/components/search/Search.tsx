import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import _debounce from "lodash/debounce";
import { usePanel } from "@/contexts/PanelContext";
import { useTranslation } from "react-i18next";
interface SearchProps {
  type: string;
}

const Search = () => {
 
  const{t}=useTranslation()
  const { dispatch, searchResults,language } = usePanel();

  

  //type DebounceFn<T> = (value: any) => any;

  // const debouncedFn: DebounceFn<any> = _debounce<any>((value: any) => {
   
  //   if (value === "") {
  //     dispatch({ type: "search", payload: [] });
  //   } else {
    
  //       privateAxios.get(`/api/course-list?q=${value.trim()}&page=${page}&limit=2`).then((res) => {
  //         console.log(res.data.results);
  //         dispatch({ type: "search", payload: res.data.results });
  //       });  
  //   }
  
  // }, 300);

  
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    
    dispatch({type:"searchValue",payload:{value:event.target.value,type:"search"}})
   // debouncedFn(event.target.value);
  };
  return (
    <Box sx={{textAlign:`${language==="fa"?"right":"left"}`}}>
      <Autocomplete
        
        freeSolo
        id="free-solo-2-demo"
        disableClearable
        options={searchResults.map((option) => option.title)}
        renderInput={(params) => (
          <TextField
            {...params}
            label={t("search")}
            InputProps={{
              ...params.InputProps,
              type: "search",
            }}
            onChange={handleChange}
            
            sx={{
              label: {
               
                textAlign:`${language==="fa"?"right":"left"}`,
                right:`${language==="fa"&&"25px"}`,
                "&.MuiFormLabel-root": {
                 
                  transformOrigin:`${language==="fa"?"top right":"top  left"}`,
                  textAlign:`${language==="fa"?"right":"left"}`,
                },
              },
                "& .MuiOutlinedInput-root fieldset": {
                  textAlign:`${language==="fa"?"right":"left"}`,
                },
            }}
          
          />
        )}
      />
    </Box>
  );
};

export default Search;
