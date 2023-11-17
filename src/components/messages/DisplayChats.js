import React, { useEffect } from "react";
// import { Container } from "atomize";
// import { Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { checkLoggedInStatus } from "./actions/UserActions";
// import MainContainer from "./containers/Container";
import { loadConversations } from "../../redux/conversations/conversationSlice";
// import Conversations from "../Room/Conversations";
import Header from "../../containers/Container";
import Conversations from "../Room/Conversations";
import { Outlet } from "react-router-dom";


const DisplayChats = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authentication.user.status.data);
  const conversations = useSelector((state) => state.conversation.userConversations.data);


//   useEffect(() => {
//     dispatch(checkLoggedInStatus());
//   }, [dispatch]);

  useEffect(() => {
      dispatch(loadConversations(user.id));
  }, [dispatch, user.id]);
// useEffect(() => {
//     // console.log(conversations)
//     dispatch(loadConversations());
//   });

  return (
    <div>
        <Header />
        {/* <Conversations conversations={conversations} /> */}
        <Outlet />

        {/* <p>testing the container</p> */}
    </div>
    
    // <Conversations />
    // <Container d="flex" justify="center">
    //   <Switch>
    //     <Route path="/" component={MainContainer} />
    //   </Switch>
    // </Container>
  );
};

export default DisplayChats;





// import React, { Component } from "react";
// import { Container } from "atomize";
// import { Route, Switch } from "react-router-dom";
// import { connect } from "react-redux";
// import { checkLoggedInStatus } from "./actions/UserActions";
// import MainContainer from "./containers/Container";
// import { loadConversations } from "./actions/ConversationActions";

// class DisplayChats extends Component {
//   componentDidMount() {
//     let user = this.props.user
//     this.props.checkLoggedInStatus()
//     user ? this.props.loadConversations(user.id) : console.log("no user")
//   }
//   componentDidUpdate() {
//     let user = this.props.user
//     user ? this.props.loadConversations(user.id) : console.log("no user")
//   }
//   render() {
//     return (
//       <Container d="flex" justify="center">
//         <Switch>
//           <Route path="/" component={MainContainer}></Route>
//         </Switch>
//       </Container>
//     );
//   }
// }
// const mapStateToProps = (state) => ({
//   user: state.user.currentUser,
//   loggedIn: state.user.loggedIn,
//   errors: state.user.errors
// });
// const mapDispatchToProps = (dispatch) => ({
//   checkLoggedInStatus: () => dispatch(checkLoggedInStatus()),
//   loadConversations: userId => dispatch(loadConversations(userId))
// });

// export default connect(mapStateToProps, mapDispatchToProps)(DisplayChats);