import React from "react";

const Field = ({
	name,
	label,
	value,
	onChange,
	type = "text",
	placeholder,
	error = "",
}) => (
	<div className="form-group">
		<label htmlFor={name}>{label}</label>
		<input
			value={value}
			onChange={onChange}
			placeholder={placeholder}
			id={name}
			type={type}
			name={name}
			className={"form-control" + (error && " is-invalid")}
		/>
		{error && <p className="invalid-feedback">{error}</p>}
	</div>
);

export default Field;
