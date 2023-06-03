// importing the necessary dependencies
import { FC } from 'react';

export interface FieldsForm {
	name: string;
	type: string;
	label: string;
	errors?: string[];
	[key: string]: any;
}

//Interface for the Form component
interface PropsForm {
	title?: string; // It's a string and it's optional
	fields: FieldsForm[]; // It's an array of FieldsForm and it's required
	onSubmit: (event: React.FormEvent<HTMLFormElement>) => void; // It's a function and it's required
	buttonText: string; // It's a string and it's required
	[key: string]: any; // It's any other prop and it's optional
}

export const Form: FC<PropsForm> = ({
	title,
	fields,
	onSubmit,
	buttonText,
	errors,
	...props
}) => {
	return (
		<form {...props} onSubmit={onSubmit}>
			{title && <h2>{title}</h2>}
			{fields?.map(({ name, type, label }, index) => {
				return (
					<div className={`inputContainer ${errors && errors[name] ? 'hasError' : ''}`} key={index}>
						<input type={type} placeholder={label} id={name} />
						{errors && errors[name] && (<span className={`error`}>{errors[name]}</span>)}
						<label htmlFor={name}>{label}</label>
					</div>
				);
			})}
			<button type='submit'>{buttonText}</button>
		</form>
	);
};
