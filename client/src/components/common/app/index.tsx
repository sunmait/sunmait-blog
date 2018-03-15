import * as React from 'react';
import Hello from "../../Hello";

interface IProps {
  children: React.ReactNode;
}

const App = (props: IProps) => {
  return (
    <div>
      <Hello />
    </div>
  );
};

export default App;
