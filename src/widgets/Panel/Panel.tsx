import { useRef } from 'react';

import type { FormEvent } from 'react';

interface IProperties {
  submitHandler: (repositoryName: string) => void;
  className?: string;
}

export const Panel = ({ submitHandler, className }: IProperties): JSX.Element => {
  const inputRef = useRef<HTMLInputElement>(null);

  const formSubmitHandler = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    if (!inputRef.current) {
      return;
    }

    submitHandler(inputRef.current.value);
  };

  return (
    <div className={className}>
      <form onSubmit={formSubmitHandler}>
        <input ref={inputRef} type="text" placeholder="Введите поисковый запрос" />
        <button type="submit">Искать</button>
      </form>
    </div>
  );
};
