type UserMessagesProps = {
  message: string | null;
};

export function UserMessages({ message }: UserMessagesProps) {
  if (!message) return null;
  return (
    <span className="user-notifications" style={{ display: "flex" }}>
      {message}
    </span>
  );
}

export default UserMessages;
