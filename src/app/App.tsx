import { useState } from 'react';

import './styles';
import { container } from '@/share/styles/components/container.module.scss';

export const App = (): JSX.Element => {
  const [count, setCount] = useState<number>(0);

  return (
    <div className={container}>
      <button onClick={(): void => setCount((count): number => count - 1)}>-</button>
      <span>{count}</span>
      <button onClick={(): void => setCount((count): number => count + 1)}>+</button>
    </div>
  );
};
