import { useRef } from 'react';
import { clsx } from 'clsx';

import * as classes from './SearchPanel.module.scss';

import type { FormEvent } from 'react';

interface IProperties {
  submitHandler: (repositoryName: string) => void;
  className?: string;
}

export const SearchPanel = ({ submitHandler, className }: IProperties): JSX.Element => {
  const inputRef = useRef<HTMLInputElement>(null);

  const formSubmitHandler = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    if (!inputRef.current) {
      return;
    }

    submitHandler(inputRef.current.value);
  };

  return (
    <form className={clsx(className, classes.container)} onSubmit={formSubmitHandler}>
      <input
        className={classes.input}
        ref={inputRef}
        type="text"
        placeholder="Введите поисковый запрос"
      />
      <button className={classes.button} type="submit">
        Искать
      </button>
    </form>
  );
};
