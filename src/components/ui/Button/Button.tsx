import { FC, ReactNode } from "react";
import classes from "./Button.module.scss";

interface Props {
	styleButton: string;
	children: ReactNode;
	onClick?: () => void;
	type?: 'button' | 'submit' | 'reset';
	disabled?: boolean;
}

const Button: FC<Props> = ({ styleButton, children, onClick, type = 'button', disabled }) => {
	const style =
		`${classes.button} ` +
		(styleButton === "greenButton"
			? `${classes.greenButton}`
			: `${classes.blueButton}`);

	return ( 
		<button 
			className={style} 
			onClick={onClick}
			type={type}
			disabled={disabled}
		>
			{children}
		</button>
	);
};

export default Button;
