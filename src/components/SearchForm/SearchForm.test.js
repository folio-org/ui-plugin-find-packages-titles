import React from 'react';
import noop from 'lodash/noop';

import {
  cleanup,
  fireEvent,
  render,
} from '@testing-library/react';

import SearchForm from './SearchForm';
import {
  searchTypes,
  titleSearchFields,
} from '../../constants';

jest.mock('../SearchFieldSelect', () => jest.fn(() => <span>SearchFieldSelect</span>));

const renderSearchForm = ({
  onSubmit = noop,
  tagsExist = false,
  searchByTagsEnabled = false,
  toggleSearchByTags = noop,
  searchQuery = 'word',
  searchFilters = [],
  resetButtonDisabled = false,
  accessTypesExist = false,
  searchAccessTypesEnabled = false,
  toggleSearchByAccessTypes = noop,
  searchType = searchTypes.PACKAGE,
  titleSearchField = titleSearchFields.PACKAGE,
}) => render(
  <SearchForm
    onSubmit={onSubmit}
    tagsExist={tagsExist}
    tagsFilterOptions={[{
      value: 'tagOption1',
      label: 'tagOption1',
    }, {
      value: 'tagOption2',
      label: 'tagOption2',
    }]}
    searchByTagsEnabled={searchByTagsEnabled}
    toggleSearchByTags={toggleSearchByTags}
    searchQuery={searchQuery}
    searchFilters={searchFilters}
    onSearchQueryChange={noop}
    onSearchFiltersChange={noop}
    resetButtonDisabled={resetButtonDisabled}
    onResetAll={noop}
    accessTypesExist={accessTypesExist}
    accessTypesFilterOptions={[{
      value: 'accessTypeOption1',
      label: 'accessTypeOption1',
    }, {
      value: 'accessTypeOption2',
      label: 'accessTypeOption2',
    }]}
    searchAccessTypesEnabled={searchAccessTypesEnabled}
    toggleSearchByAccessTypes={toggleSearchByAccessTypes}
    onSearchTypeChange={noop}
    searchType={searchType}
    titleSearchField={titleSearchField}
    onTitleSearchFieldChange={noop}
  />
);

describe('Given SearchForm', () => {
  afterEach(cleanup);

  let tagsExist;
  let accessTypesExist;

  describe('when search type is title', () => {
    it('should show search field select', () => {
      const { getByText } = renderSearchForm({
        searchType: searchTypes.TITLE,
        titleSearchField: titleSearchFields.TITLE,
      });

      expect(getByText('SearchFieldSelect')).toBeDefined();
    });
  });

  describe('when search type is package', () => {
    describe('when tags are exist', () => {
      tagsExist = true;

      it('should show tags filter', () => {
        const { getByTestId } = renderSearchForm({ tagsExist });

        expect(getByTestId('tags-filter')).toBeDefined();
      });

      describe('when click on search by tags checkbox', () => {
        it('should handle toggleSearchByTags', () => {
          const toggleSearchByTags = jest.fn();
          const { getByTestId } = renderSearchForm({
            tagsExist,
            toggleSearchByTags,
          });

          fireEvent.click(getByTestId('toggle-search-by-tags'));

          expect(toggleSearchByTags).toHaveBeenCalled();
        });
      });
    });

    describe('when access types are exist', () => {
      accessTypesExist = true;

      it('should show access type filter', () => {
        const { getByTestId } = renderSearchForm({ accessTypesExist });

        expect(getByTestId('access-type-filter')).toBeDefined();
      });

      describe('when click on search by access types checkbox', () => {
        it('should fire toggleSearchByAccessTypes', () => {
          const toggleSearchByAccessTypes = jest.fn();
          const { getByTestId } = renderSearchForm({
            toggleSearchByAccessTypes,
            accessTypesExist,
          });

          fireEvent.click(getByTestId('toggle-search-by-access-types'));

          expect(toggleSearchByAccessTypes).toHaveBeenCalled();
        });
      });
    });

    /*
    descrobe('when click on submit button', () => {
      it('should handle onSubmit', () => {
        cosnt onSubmit = jest.fn();
        const { getByTestId } = renderSearchForm({ onSubmit });

        fireEvent.click(getByTestId('find-package-title-search-button'));

        expect(onSubmit).toHaveBeenCalled();
      });
    });
    */
  });
});
