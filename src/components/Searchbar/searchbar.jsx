import { Formik, Form, Field, ErrorMessage } from 'formik';
import { ImSearch } from 'react-icons/im';
import PropTypes from 'prop-types';

import * as yup from 'yup';
import css from './searchbar.module.css';

const schema = yup.object().shape({
  search: yup.string().required(),
});

const initialValues = {
  search: '',
};

export const Searchbar = ({ onSubmit }) => {
  const handelSubmit = (values, { resetForm }) => {
    onSubmit(values);
    resetForm();
  };

  return (
    <header className={css.Searchbar}>
      <Formik
        initialValues={initialValues}
        onSubmit={handelSubmit}
        validationSchema={schema}
      >
        <Form className={css.SearchForm} autoComplete="off">
          <button type="submit" className={css.SearchFormButton}>
            <span className="button-label">
              <ImSearch />
            </span>
          </button>
          <Field
            name="search"
            type="text"
            placeholder="Search images and photos"
            className={css.SearchFormInput}
          />
          <ErrorMessage name="search" />
        </Form>
      </Formik>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
