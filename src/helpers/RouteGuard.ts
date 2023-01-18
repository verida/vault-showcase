import { NavigationGuardNext, RouteLocationNormalized } from "vue-router";
import veridaHelper from "./VeridaHelper";

const redirect = async (
  to: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  const { guest, authorized } = to.meta;
  const connected = veridaHelper.connected;

  switch (true) {
    case connected && guest:
      return next({ name: "home" });
    case !connected && authorized:
      return next({ name: "connect" });
    case !to.matched.length:
      return next("/");
    default: {
      return next();
    }
  }
};

export const RouteGuard = (
  to: RouteLocationNormalized,
  _from: RouteLocationNormalized,
  next: NavigationGuardNext
) => redirect(to, next);
