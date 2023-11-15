import { Div, Button, SideDrawer, Icon, Text } from "atomize";
// import NotificationLink from "./NotificationLink";

export default function BasicSideDrawer({
  isOpen,
  onClose,
  notifications,
  markAllAsSeen,
  user,
}) {
  return (
    <SideDrawer isOpen={isOpen} onClose={onClose}>
      <Div d="flex" m={{ b: "1rem" }}>
        <Icon name="AlertSolid" color="warning700" />
        <Text p={{ l: "0.5rem", t: "0.25rem" }}>Notifications</Text>
      </Div>
      <Div d="flex" justify="space-between">
        <Button
          onClick={onClose}
          bg="gray200"
          hoverBg="danger800"
          hoverTextColor="gray100"
          textColor="medium"
          m={{ r: "2rem", b: "1rem" }}
        >
          Close
        </Button>
      </Div>
      <Div d="flex" flexDir="column">
        {/* {notifications.map((n) => (
          <NotificationLink close={onClose} notification={n} key={n.id} />
        ))} */}
      </Div>
    </SideDrawer>
  );
}