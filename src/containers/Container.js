import React, { useState } from "react";
import { Icon, Div, Text, Button, Notification } from "atomize";
import { useDispatch, useSelector } from "react-redux";
// import Login from "../components/Login";
// import Signup from "../components/Signup";
// import { logout } from "../actions/UserActions";
import Conversations from "../components/Room/Conversations";
// import Footer from "./Footer";
// import RegButons from "../components/RegButons";
import BasicSideDrawer from "../components/Notifications/BasicSideDrawer";
import { Link, Outlet } from "react-router-dom";
import Conversation from "../components/Room/Conversation";
import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import ConversationForm from "../components/Room/ConversationForm";
// import { makeNotificationNumber } from "../helpers";
import './Container.css'

const Header = (cable) => {
  const dispatch = useDispatch();
//   const loggedIn = useSelector((state) => state.user.loggedIn);
  const errors = useSelector((state) => state.user.errors);
  const user = useSelector((state) => state.authentication.user.status.data);
  const conversations = useSelector((state) => state.conversation.userConversations);
  const conversationErrors = useSelector((state) => state.conversation.errors);

//   const navigate = useNavigate();

//   const { userId, conversationId} = useParams()

//   const handleClick = (userId, conversationId) => {
//     navigate.push(`/creator-homepage/messages/users/${userId}/conversations/${conversationId}`);
//   };
//   const { userId, conversationId } = useParams();

//   console.log("User ID:", userId);
//   console.log("Conversation ID:", conversationId);


//   const conversationId = conversations.map((c) => (c.id))
//   const userId = user.id

//   const [showLogin, setShowLogin] = useState(false);
//   const [showSignup, setShowSignup] = useState(false);
  const [showConversationForm, setShowConversationForm] = useState(false);
  const [showSideDrawer, setShowSideDrawer] = useState(false);
  const [error, setError] = useState(false);

  const handleShowConversationForm = () => {
    if (user) {
      setShowConversationForm(!showConversationForm);
    } else {
      setError(true);
    }
  };

  return (
    <Div w="100%">
        {/* <Outlet /> */}
      <Div d="flex" w="100%" p="10px">
        {/* <Notification
          isOpen={errors}
          m={{ r: "0.5rem" }}
          hoverBg="danger600"
          bg="danger700"
          onClose={() => dispatch({ type: "REMOVE_ERRORS" })}
        >
          {errors ? errors.map((error) => <p>{error}</p>) : ""}
        </Notification> */}
        <Text tag="h1" w="100%">
          ChatApp 
          {/* <Icon name="Email" size="20px" /> */}
        </Text>
        {/* {loggedIn ? (
          ""
        ) : (
          <RegButons
            loginClick={() => setShowLogin(true)}
            signupClick={() => setShowSignup(true)}
          />
        )} */}
          {/* <Div d="flex" pos="fixed" right="0px" p="10px"> */}
            {/* <Button
              prefix={
                <Icon
                  name="UserSolid"
                  size="16px"
                  color="white"
                  m={{ r: "0.5rem" }}
                />
              }
              bg="warning700"
              hoverBg="warning800"
              rounded="circle"
              p={{ r: "1.5rem", l: "1rem" }}
              shadow="3"
              hoverShadow="4"
              onClick={() => setShowSideDrawer(true)}
            >
              {makeNotificationNumber(user)} | Notification
              {makeNotificationNumber(user) === 1 ? "" : "s"}
            </Button> */}
            {/* <Button
              bg="brand900"
              hoverBg="brand700"
              m={"0 auto"}
              hoverShadow="4"
              rounded="circle"
            //   onClick={() => dispatch(logout())}
            >
              <Link className="logout-btn" to="/">
                Logout
              </Link>
            </Button> */}
          {/* </Div> */}
        {/* <Login isOpen={showLogin} onClose={() => setShowLogin(false)} />
        <Signup isOpen={showSignup} onClose={() => setShowSignup(false)} /> */}
      </Div>
      <Button m="0 auto" onClick={handleShowConversationForm}>
        New Conversation
      </Button>
      {showConversationForm ? <ConversationForm /> : ""}
      <br />
      {/* {error && !user ? (
        <Div textAlign="center" textColor="warning700">
          <p>You must be logged in!</p>
        </Div>
      ) : (
        ""
      )} */}
      {conversationErrors ? (
        <Div textAlign="center" textColor="warning700">
          <p>{conversationErrors}</p>
        </Div>
      ) : (
        ""
      )}
      <Div d="flex">
        {/* <Outlet /> */}
        <Conversations conversations={conversations} cable={cable} />
        <Conversation />
         {/* <Routes>
            <Route
            path="/creator-homepage/messages/users/:userId/conversations/:conversationId"
            // path="/creator-homepage/messages/users/45/conversations/4"
            // render={(routerProps) => <Conversation {...routerProps} />}
            element={<Conversation />}
            // children={(routerProps) => <Conversation {...routerProps}/>}
            />
        </Routes> */}
        {/* {conversations.map((c) => (
        <div key={c.id}>
          <Routes>
            <Route
            // path={`/creator-homepage/messages/users/${userId}/conversations/${conversationId}`}
            path={`/creator-homepage/messages/users/${user.id}/conversations/${c.id}`}
            element={<Conversation />}
            children={(routerProps) => <Conversation {...routerProps} />}
            />
        </Routes>
        </div>
        ))} */}
      </Div>
      <BasicSideDrawer
        isOpen={showSideDrawer}
        onClose={() => setShowSideDrawer(false)}
        notifications={
          user
            ? user.notifications
            : [{ id: "x", content: "No Notifications" }]
        }
      />
      {/* <Footer /> */}
    </Div>
  );
};

export default Header;






// import React from "react";
// import { Icon, Div, Text, Button, Notification } from "atomize";
// import { connect } from "react-redux";
// import Login from "../components/Login";
// import Signup from "../components/Signup";
// import { logout } from "../actions/UserActions";
// import Conversations from "../components/Conversation/Conversations";
// import Footer from "./Footer";
// import RegButons from "../components/RegButons";
// import BasicSideDrawer from "../components/Notifications/BasicSideDrawer";
// import { Link } from "react-router-dom";

// import Conversation from "../components/Conversation/Conversation";
// import { Route } from "react-router-dom";
// import ConversationForm from "../components/Conversation/ConversationForm";
// import { makeNotificationNumber } from "../helpers";

// class Header extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       showLogin: false,
//       showSignup: false,
//       showConversationForm: false,
//       showSideDrawer: false,
//       error: false,
//     };
//   }
//   handleShowConversationForm = () => {
//     if (this.props.user) {
//       this.setState({ showConversationForm: !this.state.showConversationForm });
//     } else {
//       this.setState({ error: true });
//     }
//   };

//   render() {
//     return (
//       <Div w="100%">
//         <Div d="flex" w="100%" p="10px">
//           <Notification
//             isOpen={this.props.errors}
//             m={{ r: "0.5rem" }}
//             hoverBg="danger600"
//             bg="danger700"
//             onClose={this.props.removeErrors}
//           >
//             {this.props.errors
//               ? this.props.errors.map((error) => <p>{error}</p>)
//               : ""}
//           </Notification>
//           <Text tag="h1" w="100%">
//             ChatApp <Icon name="Email" size="20px" />
//           </Text>
//           {this.props.loggedIn ? (
//             ""
//           ) : (
//             <RegButons
//               loginClick={() => this.setState({ showLogin: true })}
//               signupClick={() => this.setState({ showSignup: true })}
//             />
//           )}
//           {!this.props.loggedIn ? (
//             ""
//           ) : (
//             <Div d="flex" pos="fixed" right="0px" p="10px">
//               <Button
//                 prefix={
//                   <Icon
//                     name="UserSolid"
//                     size="16px"
//                     color="white"
//                     m={{ r: "0.5rem" }}
//                   />
//                 }
//                 bg="warning700"
//                 hoverBg="warning800"
//                 rounded="circle"
//                 p={{ r: "1.5rem", l: "1rem" }}
//                 shadow="3"
//                 hoverShadow="4"
//                 onClick={() => this.setState({ showSideDrawer: true })}
//               >
//                 {makeNotificationNumber(this.props.user)} | Notification
//                 {makeNotificationNumber(this.props.user) === 1 ? "" : "s"}
//               </Button>
//               <Button
//                 bg="brand900"
//                 hoverBg="brand700"
//                 m={"0 auto"}
//                 hoverShadow="4"
//                 rounded="circle"
//                 onClick={() => this.props.logout()}
//               >
//                 <Link className="logout-btn" to="/">
//                   Logout
//                 </Link>
//               </Button>
//             </Div>
//           )}
//           <Login
//             isOpen={this.state.showLogin}
//             onClose={() => this.setState({ showLogin: false })}
//           />
//           <Signup
//             isOpen={this.state.showSignup}
//             onClose={() => this.setState({ showSignup: false })}
//           />
//         </Div>
//         <Button m="0 auto" onClick={this.handleShowConversationForm}>
//           New Conversation
//         </Button>
//         {this.state.showConversationForm ? <ConversationForm /> : ""}
//         <br />
//         {this.state.error && !this.props.user ? (
//           <Div textAlign="center" textColor="warning700">
//             <p>You must be logged in!</p>
//           </Div>
//         ) : (
//           ""
//         )}
//         {this.props.conversationErrors ? (
//           <Div textAlign="center" textColor="warning700">
//             <p>{this.props.conversationErrors}</p>
//           </Div>
//         ) : (
//           ""
//         )}
//         <Div d="flex">
//           <Conversations conversations={this.props.conversations} />
//           <Route
//             path="/users/:userId/conversations/:id"
//             render={(routerProps) => <Conversation {...routerProps} />}
//           />
//         </Div>
//         <BasicSideDrawer
//           isOpen={this.state.showSideDrawer}
//           onClose={() => this.setState({ showSideDrawer: false })}
//           notifications={
//             this.props.user
//               ? this.props.user.notifications
//               : [{ id: "x", content: "No Notifications" }]
//           }
//         />
//         <Footer />
//       </Div>
//     );
//   }
// }
// const mapDispatchToProps = (dispatch) => ({
//   logout: () => dispatch(logout()),
//   removeErrors: () => dispatch({ type: "REMOVE_ERRORS" }),
// });
// const mapStateToProps = (state) => ({
//   loggedIn: state.user.loggedIn,
//   errors: state.user.errors,
//   user: state.user.currentUser,
//   conversations: state.conversations.userConversations,
//   conversationErrors: state.conversations.errors,
// });
// export default connect(mapStateToProps, mapDispatchToProps)(Header);