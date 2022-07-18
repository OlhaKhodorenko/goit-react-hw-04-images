import { ThreeDots } from 'react-loader-spinner';
import css from './loader.module.css';

const Loader = color => {
  return (
    <div className={css.Loader}>
      <ThreeDots color="#3f51b5" />
    </div>
  );
};
export default Loader;
