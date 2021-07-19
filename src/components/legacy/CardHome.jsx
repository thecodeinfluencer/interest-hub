import React from 'react';
import { Card, Grid, Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { ChevronRight } from '@material-ui/icons';

export default function CardHome({
  icon,
  title,
  link,
  full,
  desc,
  share,
  blank,
}) {
  const history = useHistory();

  const shareApp = () => {
    if (navigator.share) {
      navigator
        .share({
          title: 'Kanisa App',
          text: 'Get Kanisa App From PlayStore',
          url: link,
        })
        .then(() => console.log('Successful share'))
        .catch(error => console.log('Error sharing', error));
    }
  };

  return (
    <Grid
      style={{
        marginBottom: 15,
        marginTop: 15,
      }}
      item
      xs={full ? 12 : 6}
    >
      <Card
        onClick={() => {
          if (share) {
            shareApp();
          } else if (blank) {
            window.open(link, '_blank');
          } else {
            history.push(link);
          }
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            margin: 16,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {icon}
            <div style={{ marginLeft: 10 }}>
              <Typography style={{ fontWeight: 'bold' }} noWrap={false}>
                {title}
              </Typography>
              <br />
              {desc && (
                <Typography style={{ marginRight: 20 }} noWrap={false}>
                  {desc}
                </Typography>
              )}
            </div>
          </div>
          <ChevronRight />
        </div>
      </Card>
    </Grid>
  );
}
