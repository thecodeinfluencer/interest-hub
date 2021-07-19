import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ListEmpty from './components/fragments/ListEmpty';
import SelectInterests from './components/fragments/SelectInterests';
import AboutKanisa from './screens/AboutKanisa';
import ForumReplyScreen from './screens/ForumReplyScreen';
import ForumRouteScreen from './screens/ForumRouteScreen';
import GroupRouteScreen from './screens/GroupRouteScreen';
import LoginScreen from './screens/LoginScreen';
import MessageRouteScreen from './screens/MessageRouteScreen';
import OnboarderScreen from './screens/OnboarderScreen';
import PrivacyScreen from './screens/PrivacyScreen';
import ProfileScreen from './screens/ProfileScreen';
import Promise from './screens/Promise';
import RegisterScreen from './screens/RegisterScreen';
import ResetPasswordScreen from './screens/ResetPasswordScreen';
import Terms from './screens/Terms';
import UserAccountScreen from './screens/UserAccountScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import ForumsTab from './tabs/ForumTab';
import GroupsTab from './tabs/GroupsTab';
import HomeTab from './tabs/HomeTab';
import MessageTab from './tabs/MessageTab';

export default function Routes() {
  return (
    <Router>
      <Switch>
        {/* Tabs */}
        <Route path='/' exact component={HomeTab} />
        <Route path='/groups' exact component={GroupsTab} />
        <Route path='/forums' exact component={ForumsTab} />
        <Route path='/messages' exact component={MessageTab} />

        {/* Screens */}
        <Route path='/slctintr' exact component={SelectInterests} />
        <Route path='/profile' exact component={ProfileScreen} />
        {/* <Route path='/change-password' exact component={ChangePasswordScreen} /> */}
        {/* <Route path='/update-profile' exact component={UpdateProfileScreen} /> */}
        {/* <Route path='/change-avatar' exact component={ChangeAvatarScreen} /> */}
        {/* <Route path='/livestream' exact component={LiveStreamScreen} /> */}

        {/* <Route path='/about' exact component={AboutKanisa} />
        <Route path='/privacy' exact component={PrivacyScreen} />
        <Route path='/terms' exact component={Terms} />
        <Route path='/promise' exact component={Promise} /> */}

        {/* Sub Routes */}
        <Route path='/people/:id' exact component={UserAccountScreen} />
        <Route path='/messages/:id' exact component={MessageRouteScreen} />
        <Route path='/forums/:id' exact component={ForumRouteScreen} />
        <Route path='/forums/:id/:message' exact component={ForumReplyScreen} />
        <Route path='/groups/:id' exact component={GroupRouteScreen} />

        {/* App Flow and Auth */}
        <Route path='/login' exact component={LoginScreen} />
        <Route path='/register' exact component={RegisterScreen} />
        <Route path='/onboarder' exact component={OnboarderScreen} />
        <Route path='/reset-password' exact component={ResetPasswordScreen} />
        <Route path='/welcome' exact component={WelcomeScreen} />

        {/* Not Found */}
        <Route
          path='/*'
          exact
          component={() => <ListEmpty title='404 | Not Found' />}
        />
      </Switch>
    </Router>
  );
}
