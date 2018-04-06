import * as React from 'react';
// import Typography from 'material-ui/Typography';
// import Grid from 'material-ui/Grid';

interface IProps {
  title: string;
}

const Header = (props: IProps) => {
  return (
    // <Grid item xs={12}>
    //   <Typography>
    //     {props.title}
    //   </Typography>
    // </Grid>
    <p>
      {props.title}
    </p>
  );
};

export default Header;