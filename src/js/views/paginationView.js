import View from './View.js';
import icons from '../../img/icons.svg'; // Parcel 2

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');
  _generateMarkupBtn(btn, curPage) {
    return `
    <button class="btn--inline pagination__btn--${btn}">
      ${btn === 'next' ? `<span>Page ${curPage + 1}</span>` : ''}
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-${btn === 'next' ? 'right' : 'left'}"></use>
      </svg>
      ${btn === 'prev' ?`<span>Page ${curPage - 1}</span>` : ''}
    </button>
    `
  }


  _generateMarkup() {
    const currentPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    console.log(numPages);


    // Page 1 and there are other pages
    if (currentPage === 1 && numPages > 1) {
      return this._generateMarkupBtn('next', currentPage);
    }
    
    // Last page
    if (currentPage === numPages && numPages > 1) {
      return this._generateMarkupBtn('prev', currentPage);
    }
    // Other page
    if (currentPage < numPages) {
      return `${this._generateMarkupBtn('prev', currentPage)}, ${this._generateMarkupBtn('next', currentPage)}`;
      // `
      // <button class="btn--inline pagination__btn--next">
      //   <span>Page ${currentPage + 1}</span>
      //   <svg class="search__icon">
      //     <use href="${icons}#icon-arrow-right"></use>
      //   </svg>
      // </button>
      // <button class="btn--inline pagination__btn--prev">
      //   <svg class="search__icon">
      //     <use href="${icons}#icon-arrow-left"></use>
      //   </svg>
      //   <span>Page ${currentPage - 1}</span>
      // </button>
      // `;
    }

    // Page 1 and no other pages
    return '';
  }
}

export default new PaginationView();
