const Input = ({ children, type, name, onchange }) => {
    return (
        <input
            name={name}
            onChange={onchange}
            className='w-full p-2 bg-slate-50 rounded-md text-black'
            required={true}
            placeholder={children}
            type={type}
        ></input>
    );
};

export default Input;
