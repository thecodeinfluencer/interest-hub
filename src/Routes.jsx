import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ListEmpty from './components/fragments/ListEmpty';
import SelectInterests from './components/fragments/SelectInterests';
import CreateEventScreen from './screens/CreateEventScreen';
import CreateGroupScreen from './screens/CreateGroupScreen';
import EditProfileScreen from './screens/EditProfileScreen';
import EventPeopleScreen from './screens/EventPeopleScreen';
import EventRouteScreen from './screens/EventRouteScreen';
import GroupChatReplyScreen from './screens/GroupChatReplyScreen';
import GroupChatScreen from './screens/GroupChatScreen';
import GroupMembersScreen from './screens/GroupMembersScreen';
import GroupRouteScreen from './screens/GroupRouteScreen';
import LoginScreen from './screens/LoginScreen';
import MessageRouteScreen from './screens/MessageRouteScreen';
import OnboarderScreen from './screens/OnboarderScreen';
import ProfileScreen from './screens/ProfileScreen';
import RegisterScreen from './screens/RegisterScreen';
// import ResetPasswordScreen from './screens/ResetPasswordScreen';
import UserAccountScreen from './screens/UserAccountScreen';
import WelcomeScreen from './screens/WelcomeScreen';
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
        <Route path='/messages' exact component={MessageTab} />

        {/* Screens */}
        <Route path='/slctintr' exact component={SelectInterests} />
        <Route path='/profile' exact component={ProfileScreen} />
        <Route path='/profile/edit' exact component={EditProfileScreen} />
        <Route path='/create/group' exact component={CreateGroupScreen} />
        <Route path='/create/event' exact component={CreateEventScreen} />

        {/* Sub Routes */}
        <Route path='/people/:id' exact component={UserAccountScreen} />
        <Route path='/messages/:id' exact component={MessageRouteScreen} />
        <Route path='/groups/:id' exact component={GroupRouteScreen} />
        {/*  */}
        <Route path='/groups/:id/chats' exact component={GroupChatScreen} />
        <Route
          path='/groups/:id/members'
          exact
          component={GroupMembersScreen}
        />
        {/*  */}
        <Route
          path='/groups/:id/chats/:id'
          exact
          component={GroupChatReplyScreen}
        />
        <Route
          path='/groups/:id/events/:id'
          exact
          component={EventRouteScreen}
        />
        {/*  */}
        <Route
          path='/groups/:id/events/:id/people'
          exact
          component={EventPeopleScreen}
        />

        {/* App Flow and Auth */}
        <Route path='/login' exact component={LoginScreen} />
        <Route path='/register' exact component={RegisterScreen} />
        <Route path='/onboarder' exact component={OnboarderScreen} />
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
