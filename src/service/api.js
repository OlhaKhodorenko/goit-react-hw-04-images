import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const KEY = '27545789-efa6a9552ac2720fa0dadb520';

export const getImage = async (values, page) => {
  const response = await axios.get(
    `?q=${values}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
  return response.data;
};
