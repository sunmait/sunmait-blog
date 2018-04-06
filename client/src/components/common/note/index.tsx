import * as React from 'react';
import Header from 'components/common/header';
import { Link } from 'react-router-dom';

interface IProps {
  title: string;
}

const Note = (props: IProps) => {
  return (
    <div className="article-container">
      <div className="article">
        <div className="article-title">
          <Link to="/login"> {props.title} </Link>
        </div>
        <div className="article-header">
          <Header title="Our marks" />
        </div>
        <section className="blog-post">
          <div>
            <div className="paragraph">
              <p>
                The Zoom transition can be used to achieve this. 
                Note that since both the exiting and entering animations are triggered at the same time,
                we use enterDelay to allow the outgoing Floating Action Button's animation to finish before
                the new one enters.
              </p>
            </div>
            <div className="paragraph">
              <p>
                You might also have noticed that some native HTML input properties are missing from the
                TextField component. This is on purpose. The component takes care of the most used properties,
                then it's up to the user to use the underlying component shown in the following demo.
              </p>
            </div>
            <div className="paragraph">
              <p>
                We demonstrate how you could be using third-party libraries to format your input.
                In the following demo, we are using react-text-mask and react-number-format libraries.
                You have to provide a custom implementation of the  element with the inputComponent
                property.
              </p>
            </div>
          </div>
          <Link to="/login"> Read more...(to login)</Link>
        </section>
      </div>
    </div>
  );
};

export default Note;