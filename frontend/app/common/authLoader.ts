import { redirect } from "react-router";
import { AxiosHelper } from "./AxiosHelper";
import { Repository } from "./Repository";
import { message } from "antd";


export async function authLoader() {
  // const token = AxiosHelper.getJwtToken();
  // if (!token || token === "undefined") {
  //   return redirect('/login');
  // }

  // try {
    await Repository.instance.validateAuth();
  // } catch (_) {
  //   message.error("Invalid token");
  // }
  // return null;
}