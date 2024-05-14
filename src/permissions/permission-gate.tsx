import React, { cloneElement } from "react";
import { useCurrentUserRole } from "@/hooks/use-user-hook";
import { PERMISSIONS } from "./permission-map";

type THasPermission = {
  permissions: string[];
  scopes: string[];
};
const hasPermission = ({ permissions, scopes } : THasPermission) => {
  const scopesMap: { [key: string]: boolean } = {};
  scopes.forEach((scope) => {
    scopesMap[scope] = true;
  });

  return permissions.some((permission) => scopesMap[permission]);
};

type TPermissionsGate = {
  children: React.ReactNode;
  scopes: string[];
};
export default function PermissionsGate({
  children,
  scopes = [],
}: TPermissionsGate) {
  const role = useCurrentUserRole();
  const permissions = PERMISSIONS[role];
  
  const permissionGranted = hasPermission({ permissions, scopes });

  if (!permissionGranted) return <></>;

  return <>{children}</>;
}
