import Avatar from "./AvatarRoot";
import AvatarFallback from "./AvatarFallback";
import AvatarGroup from "./AvatarGroup";
import AvatarImage from "./AvatarImage";
import AvatarPresence from "./AvatarPresence";
import Initials from "./Initials";
import UserChip from "./UserChip";

Avatar.Image = AvatarImage;
Avatar.Fallback = AvatarFallback;
Avatar.Group = AvatarGroup;
Avatar.Presence = AvatarPresence;
Avatar.Initials = Initials;
Avatar.UserChip = UserChip;

export {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarImage,
  AvatarPresence,
  Initials,
  UserChip,
};

export default Avatar;
