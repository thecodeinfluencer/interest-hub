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

export default function Terms() {
  const classes = useStyles();

  return (
    <Screen title='Terms' authPass>
      <Grid item xs={12} class={classes.container}>
        <Typography variant='h5'>
          KANISA WEB-APP USER TERMS OF SERVICE
        </Typography>
        <br />
        <Typography variant='h6'>1. YOUR RELATION WITH US </Typography>
        <Typography variant='body1' class={classes.root}>
          <p>
            Welcome to Kanisa Web-app (“Kanisa”, “Morfie Ltd”, “We”, or “us”),
            an online multi-tool church convenience, efficiency and
            communication platform (the “Platform”) These User Terms of Service
            (these “Terms”) form an agreement between you and us and set forth
            the terms and conditions by which you may access and use the
            platform, including as a downloadable program or app available via
            our website (“Morfie Ltd site”), or via app store on your device
            (e.g., Google Play for Android, Apple App Store for iOS). The
            platform and its related websites, Services, products,
            sub-applications within the platform and stand-alone applications
            associated with the platform, software programs and content are
            collectively referred to as the Service (“Service”). “You” refers to
            the individual who is using or accessing the Services including the
            administrator and the Authorized User defined in Section 3. These
            Terms form a legally binding agreement between you and us. Please
            take the time to read them carefully.
          </p>
        </Typography>
        <br />
        <br />
        <Typography variant='h6'>2. ACCEPTING THE TERMS</Typography>
        <Typography variant='body1' class={classes.root}>
          <p>
            By accessing or using our Services, you confirm that you conform to
            a binding contract with Morfie Ltd, that you accept these Terms and
            that you agree to comply with our Acceptable Use Policy (as amended
            from time to time), which is hereby incorporated into these terms
            which are made available to you from time to time. The terms and
            conditions of any additional agreement can be found directly on our
            platform, on our website, or by request, and are incorporated herein
            by reference.
          </p>
          <p>
            If you access or use the Services from within a jurisdiction for
            which there are separate supplemental terms, you also hereby agree
            to the supplemental terms applicable to users in each jurisdiction
            as outlined in the relevant “Supplemental Terms – App-Store or
            Jurisdiction-Specific” section below, and in the event of a conflict
            between the provisions of the “Supplemental Terms-App Store or
            Jurisdiction-Specific will supersede and control with respect to
            your use of the Service from that jurisdiction. Access to the
            Service from jurisdictions where the content or practices of the
            Services are illegal, unauthorized or penalized is strictly
            prohibited. If you do not agree to this Terms, you must not access
            or use our Services.
          </p>
          <p>
            You accept the Terms by accessing or using our Services. You
            understand and agree that we will treat your access to or use of the
            Service as acceptance of the Terms from that point onwards. These
            Terms are effective from the date you first access or use the
            Service unless earlier terminated in accordance to these Terms.
          </p>
        </Typography>
        <br />
        <br />
        <Typography variant='h6'>
          3. ADMINISTRATOR AND THE AUTHORISED USER
        </Typography>
        <Typography variant='body1' class={classes.root}>
          <p>
            The Authorized User is the Christian who belongs to a specific and
            known church registered by Morfie Ltd to use the Kanisa Management
            Platform. The user becomes authorized if the church administrator
            (Administrator) approves you as a member of the church once you
            register through the web-app. You can only use our Service, if you
            belong and are registered to a church registered with Morfie Ltd.
          </p>
          <p>
            The Authorized User by logging in may upload, review or delete
            personal data as permitted by law and these Terms. The administrator
            may also delete the authorized user data as the Service is meant to
            connect the Administrator and the Authorized User, the Administrator
            having super privileges.
          </p>
        </Typography>
        <br />
        <br />
        <Typography variant='h6'>4. YOUR ACCOUNT WITH US</Typography>
        <Typography variant='body1' class={classes.root}>
          <p>
            It is important that you keep your account password confidential and
            that you do not disclose it to third party. If you know or suspect
            that any third party knows your password or has access to your
            account, you must promptly notify us.
          </p>
          <p>
            You are solely responsible (to others and us) for all activities
            that occur under your account. Your Church administrator and we
            reserve the right to disable your user account at any time if in our
            reasonable opinion you have failed to comply with our Terms, Privacy
            Policy or your church terms. If you no longer want to use our
            Services, and would like to delete your account, we can take care of
            this for you or you could contact your church directly and ask them
            to delete you. Once you have chosen to delete your account, you will
            not be able to reactivate your account or retrieve any of the
            content or information you had added.
          </p>
        </Typography>
        <br />
        <br />
        <Typography variant='h6'>5. FEEDBACK</Typography>
        <Typography variant='body1' class={classes.root}>
          <p>
            If you elect to provide any feedback or comments to Kanisa related
            to the Services (“Feedback”), all such Feedback shall be the sole
            and exclusive property of Morfie Ltd, and you hereby assign any
            right, title or Interest you may have in such Feedback to Kanisa.
            Morfie Ltd shall have the right to use and disclose such Feedback in
            any manner and for any purpose in Morfie Ltd discretion without
            remuneration, compensation or attribution to you, provided that
            Morfie Ltd is under no obligation to review, consider, or implement
            such Feedback.
          </p>
          <p>
            Notwithstanding anything herein to the contrary, Morfie Ltd may use
            and publish your testimonials and Feedback regarding the Services in
            publications, presentations and marketing assets by Morfie Ltd.
          </p>
        </Typography>
        <br />
        <br />
        <Typography variant='h6'>6. USER CONTENT</Typography>
        <Typography variant='body1' class={classes.root}>
          <p>
            Without prejudice to Section 3, users may be permitted to upload,
            post, submit, create or send digital information or materials (“User
            Content”) to or through the Services. We accept no liability in
            respect of any content submitted by users of the Services. Note also
            that while we may allow you to store certain User Content on the
            Services, we have the right to remove any User Content without prior
            notice if, in our opinion, your User Content does not comply with
            the Terms.
          </p>
          <p>
            If you wish to complain about information and materials uploaded by
            other users, please contact
            <a href='mailto:support@morfie.co.ke.'> support@morfie.co.ke.</a>
          </p>
        </Typography>
        <br />
        <br />
        <Typography variant='h6'>7. INTELLECTUAL PROPERTY RIGHTS</Typography>
        <Typography variant='body1' class={classes.root}>
          <p>
            We respect intellectual property rights and ask you to do the same.
            As a condition of your access to and use of the Service, you agree
            not to use the Service to infringe any intellectual property rights.
            We reserve the right, with or without notice, at any time and in
            sole discretion to block access to and/or terminate the accounts of
            any users who infringes or is alleged to infringe any copyrights or
            other intellectual property rights.
          </p>
        </Typography>
        <br />
        <br />
        <Typography variant='h6'>8. EXCLUSION OF WARRANTIES</Typography>
        <Typography variant='body1' class={classes.root}>
          <p>
            NOTHING IN THESE TERMS SHALL AFFECT ANY STATUTORY RIGHTS THAT YOU
            CANNOT CONTRACTUALLY AGREE TO ALTER OR WAIVE AND ARE LEGALLY ALWAYS
            ENTITLED TO A CONSUMER.
          </p>
          <p>
            THE SERVICES ARE PROVIDED “AS IS” AND WE AND KANISA LICENSORS MAKE
            NO WARRANTY OR REPRESENTATION TO YOU WITH RESPECT TO THEM. IN
            PARTICULAR WE DO NOT REPRESENT OR WARRANT TO YOU THAT: YOUR USE OF
            THE SERVICES WILL MEET YOUR REQUIREMENTS; YOUR USE OF THE SERVICE
            WILL BE UNINTERRUPTED, TIMELY, SECURE OR FREE FROM ERROR; AND
            DEFECTS IN THE OPERATION OR FUNCTIONALITY OF ANY SOFTWARE PROVIDED
            TO YOU AS PART OF THE SERVICES WILL BE CORRECTED. TO THE
            EXTENTPERMITTED BY LAW, NO CONDITIONS, GUARANTEES, WARANTEES OR
            OTHER TERMS (INCLUDING ANY IMPLIED TERMS AS TO SATISFACTORY QUALITY
            OR FITNESS OF PURPOSE) APPLY TO THE SERVICES EXCEPT TO THE EXTENT
            THAT THEY ARE EXPRESSLY SET OUT IN THE TERMS. WE MAY CHANGE,
            SUSPEND, WITHDRAW OR RESTRICT THE AVAILABILITY OF ALL OR ANY PART OF
            OUR SERVICES FOR BUSINESS AND OPERATIONAL REASONS AT ANY TIME
            WITHOUT NOTICE.
          </p>
        </Typography>
        <br />
        <br />
        <Typography variant='h6'>9. LIMITATION OF LIABILITY</Typography>
        <Typography variant='body1' class={classes.root}>
          <p>
            NOTHING IN THIS TERMS SHALL EXCLUDE OR LIMIT OUR LIABILITY FOR
            LOSSES WHICH MAY NOT BE LAWFULLY EXCLUDED OR LIMITED BY APPLICABLE
            LAW. NOTWITHSTANDING THE FOREGOING, WE AND KANISA LICENSOR’S SHALL
            NOT BE LIABLE TO YOU FOR: I) ANY LOSS OF MONEY (WHETHER INCURRED
            DIRECTLY OR INDIRERECTLY); II) ANY LOSS OF GOODWILL; III) ANY LOSS
            OF OPPRORTUNITY; IV) ANY LOSS OF DATA SUFFERED BY YOU; OR V) ANY
            INDIRECT OR CONSEQUENTIAL LOSSES WHICH MAY BE INCURRED BY YOU.
          </p>
        </Typography>
        <br />
        <br />
        <Typography variant='h6'>10. DATA USAGE</Typography>
        <Typography variant='body1' class={classes.root}>
          <p>
            Using the Services on mobile applications may use some of your data
            allowance available on the data plan to which you have subscribed
            with your mobile network operator.
          </p>
        </Typography>
        <br />
        <br />
        <Typography variant='h6'>11. OTHER TERMS</Typography>
        <Typography variant='body1' class={classes.root}>
          <p>A. CHANGES TO THE TERMS</p>
          <p>
            We may amend these Terms from time to time, including, for instance
            when we update the functionality of our Services or when there are
            regular changes. We will apply reasonable commercial efforts to
            provide reasonable notice of our change in terms and conditions and
            privacy policy. However, you should regularly check for such
            changes. Your continued use of our Services after the dates of the
            new Terms constitutes your acceptance of our new Terms. If you do
            not agree to the new Terms, you must stop accessing or using our
            Services.
          </p>
          <p>B. SECURITY</p>
          <p>
            We do not guarantee that our Services will be secure or free from
            bugs or viruses. You are responsible of configuring your information
            technology, computer programs and platform to access our Services.
            You should use your own virus protection software.
          </p>
          <p>
            Thank you for taking your time to read through the Terms and
            Conditions. Kanisa Web App, ensuring you connect to your church.
          </p>
        </Typography>
        <br />
        <br />
      </Grid>
    </Screen>
  );
}
