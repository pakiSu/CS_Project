import { makeStyles } from '@material-ui/core';

export const style = theme  => ({
  root: {
    padding: theme.spacing(2), //8*2
    [theme.breakpoints.down('sm')]: {
      backgroundColor: theme.palette.secondary.main,
    },
    [theme.breakpoints.up('md')]: {
      backgroundColor: theme.palette.primary.main,
    },
    [theme.breakpoints.up('lg')]: {
      backgroundColor: theme.palette.secondary.lightBlue,
    },
  },
});


export const useStyles = makeStyles(style);



