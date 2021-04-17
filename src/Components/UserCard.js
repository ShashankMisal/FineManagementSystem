import React from 'react';
import cx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import { useFadedShadowStyles } from '@mui-treasury/styles/shadow/faded';
import { useGutterBorderedGridStyles } from '@mui-treasury/styles/grid/gutterBordered';


const useStyles = makeStyles(({ palette }) => ({
  card: {
    borderRadius: 12,
    minWidth: 246,
    textAlign: 'center',
    margin: 15
  },
  avatar: {
    width: 95,
    height: 95,
    margin: 'auto',
    border:'2px solid #ffffff'
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: '0.5px',
    marginTop: 8,
    marginBottom: 0,
  },
  subheader: {
    fontSize: 14,
    color: palette.grey[500],
    marginBottom: '0.875em',
  },
  statLabel: {
    fontSize: 12,
    color: palette.grey[500],
    fontWeight: 500,
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    margin: 0,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
    letterSpacing: '1px',
  },
}));

export const UserCard = React.memo(function ProfileCard(props) {
  const styles = useStyles();
  const shadowStyles = useFadedShadowStyles();
  const {name,url,designation} = props
  const borderedGridStyles = useGutterBorderedGridStyles({
    borderColor: 'rgba(0, 0, 0, 0.08)',
    height: '60%',
  });


  


  return (
    <Card className={cx(styles.card, shadowStyles.root)}>
      <CardContent>
        <Avatar className={styles.avatar} src={url} />
        <h3 className={styles.heading}>{name}</h3>
        <span className={styles.subheader}>{designation}</span>
      </CardContent>
      <Divider light />
      <Box display={'flex'}>
        <Box p={2} flex={'auto'} className={borderedGridStyles.item}>
          <p className={styles.statLabel}>Total Fine Paid</p>
          <p className={styles.statValue}>₹{props.totalFinePaid}</p>
        </Box> 
       
        <Box p={2} flex={'auto'} className={borderedGridStyles.item}>
          <p className={styles.statLabel}>Fine Due</p>
          <p className={styles.statValue}>₹{props.fineDue}</p>
        </Box>
      </Box>
    </Card>
  );
});

export default UserCard