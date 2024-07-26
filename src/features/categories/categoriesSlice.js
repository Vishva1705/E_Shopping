import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
 
export const fetchCategories = createAsyncThunk('categories/fetchCategories', async () => {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
  const data = await response.json();
  return data.categories;
});
 
const categoriesSlice = createSlice({
  name: 'categories',
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});
 
export default categoriesSlice.reducer;