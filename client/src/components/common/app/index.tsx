import * as React from 'react';

interface IProps {
  children: React.ReactNode;
}

const App = (props: IProps) => {
// const App = () => {
  return (
    <div>
      {props.children}
    </div>
  );
};

export default App;
