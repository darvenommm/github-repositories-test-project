import { useRef } from 'react';

import type { FormEvent } from 'react';

interface IProperties {
  currentPage: number;
  totalCount: number;
  clickNextHandler: () => void;
  clickPreviousHandler: () => void;
  countAtPage: number;
  changeCountAtPageHandler: (newCount: number) => void;
  className?: string;
}

export const PaginationControls = ({
  currentPage,
  totalCount,
  clickNextHandler,
  clickPreviousHandler,
  countAtPage,
  changeCountAtPageHandler,
  className,
}: IProperties): JSX.Element => {
  const inputRef = useRef<HTMLInputElement>(null);

  const totalPagesCount = Math.ceil(totalCount / countAtPage);

  const formSubmitHandler = (event: FormEvent): void => {
    event.preventDefault();

    if (!inputRef.current?.value) {
      return;
    }

    changeCountAtPageHandler(Number(inputRef.current.value));
  };

  return (
    <div className={className}>
      <form onSubmit={formSubmitHandler}>
        Rows per page: <input ref={inputRef} defaultValue={countAtPage} type="number" min="1" />
      </form>
      <p>
        {currentPage} of {totalPagesCount}
      </p>
      <div>
        <button type="button" disabled={currentPage <= 1} onClick={clickPreviousHandler}>
          Previous
        </button>
        <button type="button" disabled={currentPage >= totalPagesCount} onClick={clickNextHandler}>
          Next
        </button>
      </div>
    </div>
  );
};
