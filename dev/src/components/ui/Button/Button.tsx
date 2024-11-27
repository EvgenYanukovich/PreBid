import { FC, ReactNode } from "react";
import classes from "./Button.module.scss";

interface Props {
	styleButton: string;
	children: ReactNode;
	onClick?: () => void;
}

const Button: FC<Props> = ({ styleButton, children, onClick }) => {
	const style =
		`${classes.button} ` +
		(styleButton === "greenButton"
			? `${classes.greenButton}`
			: `${classes.blueButton}`);

	return ( 
		<button className={style} onClick={onClick}>
			{children}
		</button>
	);
};

export default Button;
