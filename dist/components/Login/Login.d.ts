import { Octokit } from "octokit";
import { ReactElement } from "react";
interface Props {
    octokit: Octokit;
}
declare function Login({ octokit }: Props): ReactElement;
export default Login;
