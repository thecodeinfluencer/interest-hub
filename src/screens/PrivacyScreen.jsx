import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Screen from '../components/fragments/Screen';
import '../styles/list.css';

const useStyles = makeStyles(theme => ({
  container: {
    padding: 16,
  },
  root: {
    ...theme.typography.body1,
    textAlign: 'justify',
  },
  list: {
    ...theme.typography.body1,
    textAlign: 'left',
  },
}));

export default function PrivacyScreen() {
  const classes = useStyles();

  return (
    <Screen title='Privacy Policy' authPass>
      <Grid item xs={12} class={classes.container}>
        <Typography variant='body1' class={classes.root}>
          <p>
            Morfie Ltd aspires to build its services with a set of strong
            privacy principles in mind. Kanisa administrator’s website provides
            a church institution with a data management platform and the Kanisa
            application provides a channel for communication between the church
            administrator and the church Christians. Christians can be able to
            register themselves to their church, book appointments and seats in
            a service, view church events, get church notifications, message the
            church directly and stream-access and view church services online.
          </p>
        </Typography>
        <br />
        <br />
        <Typography variant='h5'>Information We Collect</Typography>
        <br />
        <Typography align='center' variant='body1' class={classes.root}>
          <p>
            Morfie Ltd receives or collects information when we operate and
            provide our services, including when you register, install, access,
            or use our Services. When the Church administrator registers to use
            the Kanisa Website, you provide the following information:
          </p>
        </Typography>
        <Typography align='center' variant='body1' class={classes.list}>
          <ul>
            <li>
              Your church information: You provide the church name (as per
              registration), the location, the contacts (i.e. the telephone
              number and the email address of the church) and the range of the
              registered number of Christians as per the time of registration.
            </li>
            <li>
              Primary administrator details: You provide your full name, home
              location, contacts (i.e. the phone number and the email address)
              and signature.
            </li>
            <li>
              Secondary administrators’ details: You provide your name, home
              location, contacts (i.e. the phone number and the email address)
              and signature.
            </li>
            <li>
              Customer Support: You may provide us with information related to
              your use of Our Service, including how we may contact you so we
              can provide you customer support. For example: You may send us an
              email with information relating to our app performance or other
              issues.
            </li>
          </ul>
        </Typography>
        <Typography align='center' variant='body1' class={classes.root}>
          <p>
            When the Christian installs the application they provide information
            that is to be shared with the church administrators. The information
            provided by the Christian is stored in our servers but maybe deleted
            at any point by the Church administrator.
          </p>
        </Typography>
        <Typography variant='h5'>
          Automatically Collected Information
        </Typography>
        <Typography align='center' variant='body1' class={classes.list}>
          <ul>
            <li>
              Usage and Log information: We collect service-related, diagnostic
              and performance information. This includes information about your
              activity (such as how you use our Service, how you interact with
              data in the system and the like), log files, and diagnostic,
              crash, website and performance logs and reports. The activity-log
              in the Kanisa website is displayed in the activity log section to
              enable end-user monitoring of who accesses the Service.
            </li>
            <li>
              Transactional Information: If you pay for our Services, we may
              receive information and confirmations, such as payment receipts.
            </li>
            <li>
              Cookies: We use cookies to operate and provide our Services,
              including to provide our Service, including to provide our service
              that are web-based, improve your experiences, understand how our
              Services are being used, and customize our Services. We may also
              use cookies to understand which of our FAQs are most popular and
              to show you relevant content related to our Services.
            </li>
            <li>
              Status Information: We collect information about your online
              changes on our Services, such as when you are online and when you
              last used our Service.
            </li>
          </ul>
        </Typography>
        <br />
        <br />
        <Typography variant='h5'>Third Party Information</Typography>
        <br />
        <Typography align='center' variant='body1' class={classes.list}>
          <ul>
            <li>
              Third-Part Providers: We work with third party providers to help
              us operate, provide, improve, understand, customize, support and
              market our Services. For example, we work with companies that
              distribute apps, provide our infrastructure, delivery and other
              systems, process payments, help us understand how people use our
              Services, and market our Services. These providers may provide us
              information about you in a certain circumstances; for example, app
              stores may provide us reports to help us diagnose and fix service
              issues.
            </li>
            <li>
              Third-Party Services: We allow you to use our Service in
              connection to third party services. For example, if you use the
              Bulk SMS feature we may provide information such as your contacts
              in order to help provide the Service.
            </li>
          </ul>
        </Typography>
        <br />
        <br />
        <Typography variant='h5'>How we use Information</Typography>
        <br />
        <Typography align='center' variant='body1' class={classes.root}>
          <p>
            We use all information we have to help us operate, improve,
            understand, customize, support and market our Services.
          </p>
          <br />
          <ul>
            <li>
              Our Services: We operate and provide our Service, including
              providing customer support, and improve fixing and customizing our
              Services. We understand how people use our Services, and analyze
              and use the information we have to evaluate and improve our
              Services, research, develop and test new services and features,
              and conduct troubleshooting activities. We also use your
              information to respond to you when you contact us. We use cookies
              to operate, provide, improve, understand and customize our
              Services.
            </li>
            <li>
              Safety and Security: We verify accounts and activities, and
              promote safety and security on and off our Services, such as by
              investigating suspicious activity or violations of our Terms, and
              to ensure our Services are being used legally.
            </li>
            <li>
              Communications about Our Services: We communicate with you about
              our Services and features and let you know about our terms and
              policies and other important updates. We provide you marketing for
              our Services.
            </li>
            <li>
              No Third-Party Banner Ads: We do not allow third-party banners ads
              on Kanisa Software. We have no intention to introduce them, but if
              we ever do, we will update this policy.
            </li>
            <li>
              Communication: We allow communication link between the church and
              its Christians to enable better provision of our Services. This
              communication includes direct messaging from the Christian to the
              Church, bi-directional notification and access to bookings,
              services and appointments.
            </li>
          </ul>
        </Typography>
        <br />
        <br />
        <Typography variant='h5'>Managing your Information</Typography>
        <br />
        <Typography align='center' variant='body1' class={classes.root}>
          <p>
            If you would like to manage, change, limit or delete your
            information, we allow you to do that through the following ways and
            tools:
          </p>
          <br />
          <ul>
            <li>
              Church Administrator’s Delete Tool: The church administrator may
              delete Church data and delete any Church Christian from accessing
              church data at any point. Morfie Ltd shall not be held under any
              obligation of any data deleted or loss.
            </li>
          </ul>
        </Typography>
        <br />
        <br />
        <Typography variant='h5'>Law and Protection</Typography>
        <br />
        <Typography align='center' variant='body1' class={classes.root}>
          <p>
            We may collect, use, preserve and share your information if we have
            a good-faith belief that it is reasonably necessary to: (a) respond
            pursuant to applicable law or regulations, to legal process, or to
            government requests; (b) enforce our Terms and any other applicable
            Terms and policies, including for investigations of potential
            violations; (c) detect, investigate, prevent, and address fraud and
            other illegal activity, security, or technical issues; or (d)
            protect the rights, property, and safety of our users, Morfie Ltd
            and others.
          </p>
        </Typography>
        <br />
        <br />
        <Typography variant='h5'>Update to this privacy policy</Typography>
        <br />

        <Typography align='center' variant='body1' class={classes.root}>
          <p>
            We may amend or update our Privacy Policy. We will provide you
            notice of amendments to this Privacy Policy. Your continued use of
            our Services confirms your acceptance of our Privacy Policy, as
            amended. If you do not agree to our Privacy Policy, as amended you
            must stop using our Services. Please review our Privacy Policy from
            time to time.
          </p>
        </Typography>
        <Typography align='center' variant='body1' class={classes.root}>
          <p>
            If you have questions about our Privacy Policy, Please contact us
            through
            <a href='mailto:support@morfie.co.ke'> support@morfie.co.ke</a>.
          </p>
        </Typography>
      </Grid>
    </Screen>
  );
}
