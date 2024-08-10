import { useRef } from 'react';
import { clsx } from 'clsx';

import type { FormEvent } from 'react';

import RightArrow from '@/share/assets/svg/rightArrow.svg';
import LeftArrow from '@/share/assets/svg/leftArrow.svg';
import * as classes from './PaginationControls.module.scss';

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
    <div className={clsx(className, classes.container)}>
      <form className={classes.elementsCountContainer} onSubmit={formSubmitHandler}>
        <p className={classes.elementsCountText}>Rows per page:</p>{' '}
        <input
          className={classes.elementsCountInput}
          ref={inputRef}
          defaultValue={countAtPage}
          type="number"
          min={1}
          max={100}
        />
      </form>
      <p>
        {currentPage} of {totalPagesCount}
      </p>
      <div className={classes.buttons}>
        <button
          className={classes.button}
          type="button"
          disabled={currentPage <= 1}
          onClick={clickPreviousHandler}
        >
          <LeftArrow />
        </button>
        <button
          className={classes.button}
          type="button"
          disabled={currentPage >= totalPagesCount}
          onClick={clickNextHandler}
        >
          <RightArrow />
        </button>
      </div>
    </div>
  );
};
