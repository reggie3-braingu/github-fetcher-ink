import { Octokit } from "octokit";
import { ReactElement } from "react";
interface LoginProps {
    setOctokit: (octokit: Octokit) => void;
    setUserName: (userName: string) => void;
}
declare function Login({ setOctokit, setUserName }: LoginProps): ReactElement;
export default Login;
