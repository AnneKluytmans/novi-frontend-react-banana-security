import './InputField.css'

function InputField( { label, type, id, name, register, error } ) {
    return (
        <div className="input-field">
            <label htmlFor={id}>
                {label}
                <input
                    type={type}
                    id={id}
                    {...register(name)}
                />
            </label>
            {error && <p className="form-error-message">{error.message}</p>}
        </div>
    );
}

export default InputField