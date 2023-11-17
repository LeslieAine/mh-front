import React from "react";
import { Div } from "atomize";
import { Link } from "react-router-dom";
import { makeNotificationLink } from "../../helpers";
import { connect } from "react-redux";
// import { updateNotification } from "../../actions/NotificationActions";

const NotificationLink = ({ user, notification, close, updateNotification }) => {
  const handleClick = () => {
    const data = {
      userId: user.id,
      notificationId: notification.id,
    };
    updateNotification(data);
  };

  return (
    <Link to={makeNotificationLink(user, notification.conversation_id)}>
      <Div
        m="3px 0"
        p="10px"
        border="1px solid"
        borderColor={notification.seen ? "gray" : "info700"}
        hoverBorderColor="info900"
        hoverBg={notification.seen ? "white" : "info700"}
        hoverTextColor={notification.seen ? "black" : "white"}
        w="100%"
        textColor={notification.seen ? "black" : "info700"}
        onClick={handleClick}
      >
        {notification.seen ? (
          <span className="seen-badge">SEEN </span>
        ) : (
          <span className="new-badge">NEW </span>
        )}
        {notification.content}
      </Div>
    </Link>
  );
}

// const mapStateToProps = (state) => ({
//   user: state.user.currentUser,
// });

// const mapDispatchToProps = (dispatch) => ({
//   updateNotification: (data) => dispatch(updateNotification(data)),
// });

// export default connect(mapStateToProps, mapDispatchToProps)(NotificationLink);





// import React from "react";

// import { Div } from "atomize";
// import { Link } from "react-router-dom";
// import { makeNotificationLink } from "../../helpers";
// import { connect } from "react-redux";
// import { updateNotification } from "../../actions/NotificationActions";

// class NotificationLink extends React.Component {
//   handleClick = () => {
//     const data = {
//       userId: this.props.user.id,
//       notificationId: this.props.notification.id,
//     };
//     this.props.updateNotification(data);
//   };
//   render() {
//     const notification = this.props.notification;
//     return (
//       <>
//         <Link
//           onClick={this.props.close}
//           to={makeNotificationLink(
//             this.props.user,
//             notification.conversation_id
//           )}
//         >
//           <Div
//             m="3px 0"
//             p="10px"
//             border="1px solid"
//             borderColor={notification.seen ? "gray" : "info700"}
//             hoverBorderColor="info900"
//             hoverBg={notification.seen ? "white" : "info700"}
//             hoverTextColor={notification.seen ? "black" : "white"}
//             w="100%"
//             textColor={notification.seen ? "black" : "info700"}
//             onClick={this.handleClick}
//           >
//             {notification.seen ? (
//               <span className="seen-badge">SEEN </span>
//             ) : (
//               <span className="new-badge">NEW </span>
//             )}
//             {notification.content}
//           </Div>
//         </Link>
//       </>
//     );
//   }
// }
// const mapStateToProps = (state) => ({
//   user: state.user.currentUser,
// });
// const mapDispatchToProps = (dispatch) => ({
//   updateNotification: (data) => dispatch(updateNotification(data)),
// });
// export default connect(mapStateToProps, mapDispatchToProps)(NotificationLink);