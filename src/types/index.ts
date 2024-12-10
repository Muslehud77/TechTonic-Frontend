import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type TUser = {
  _id?: string;
  name: string;
  role: "admin" | "user";
  email: string;
  password?: string;
  status: "ACTIVE" | "BLOCKED";
  passwordChangedAt?: Date;
  mobileNumber?: string;
  profilePhoto?: string;
  createdAt?: Date;
  updatedAt?: Date;
  isPremium?: boolean;
  expireAt?: Date | null;
  followers?: string[];
  following?: string[];
};
