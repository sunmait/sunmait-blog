import * as React from 'react';
import '../../../assets/styles/MainPage.less';
import Header from 'components/common/header';
import Note from 'components/common/note';

interface IProps {
}

interface IState {
}

class MainPage extends React.Component<IProps, IState> {
  public readonly state: IState = {};

  constructor(props: IProps) {
    super(props);
    this.state = {};
  }

  public render() {
    return (
      <div>
        <div className='main-header'>
          <Header title="Our articles!" />
        </div>
        <Note title="The first article" />
        <Note title="The second article" />
        <Note title="The third article" />
        <Note title="The fourth article" />
      </div>
    );
  }
}

export default MainPage;