"use client"
import * as React from "react";
import {useState} from "react";
import Image from "next/image";
import errorSVG from "@images/error.svg";

type creditType = {
  errorUpdate: Function;
  inputUpdate: Function;
};

const CreditInput: React.FC<creditType> = ({errorUpdate, inputUpdate}) => {
  const [cardNumber, setCardNumber] = useState<string>('');
  const [expiryDate, setExpiryDate] = useState<string>('');
  const [cvc, setCvc] = useState<string>('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [animation, setAnimation] = useState(false);

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    let name = e.target.name;
    value = value.substring(0, 16);
    const spacedValue = value.match(/.{1,4}/g)?.join(' ') || value;
    setCardNumber(spacedValue);
    inputUpdate(name, spacedValue);
    {/* reset error if input is valid */}
    setErrors({...errors, [name]:''});
  };

  const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    let name = e.target.name
    if (value.length > 4) value = value.substring(0, 4);
    if (value.length === 3 && !value.includes('/')) {
      value = `${value.substring(0, 2)}/${value.substring(2, 4)}`;
    } else if (value.length > 2) {
      value = `${value.substring(0, 2)}/${value.substring(2, 4)}`;
    }
    setExpiryDate(value);
    inputUpdate(name, value);
    {/* reset error if input is valid */}
        setErrors({...errors, [name]:''});
  };

  const handleCvcChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    let name = e.target.name;
    value = value.substring(0, 3);
    setCvc(value);
    inputUpdate(name, value);
    {/* reset error if input is valid */}
    setErrors({...errors, [name]:''});
  };

  const validate = (e:React.FormEvent<HTMLInputElement>) => {
    const name = e.currentTarget.name;
    {
      //error conditions by input name
    }
    if(name === "cardNumber") {
      if (cardNumber.replace(/\s/g, '').length !== 16) {
        setErrors({...errors, [name]:'Card number must be 16 digits.'});
      } else {setErrors({...errors, [name]:''})}
    }

    if(name === "expiryDate") {
      const expiryMatch = expiryDate.match(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/);
      if (!expiryMatch) {
        setErrors({...errors, [name]:'Expiry date must be in MM/YY format.'});
      } else {setErrors({...errors, [name]:''})}
    }

    if(name === "cvc") {
      if (cvc.length !== 3) {
        setErrors({...errors, [name]:'CVC must be 3 digits.'});
      } else {setErrors({...errors, [name]:''})}
    }
    
    errorUpdate(errors);
  };

  return (
    <div className="flex flex-row gap-[4px] lg:gap-4">
      <div className="form-control max-lg:max-w-[175px] flex-1">
        <label className="label">Card Number</label>

        <input type="text" name="cardNumber" value={cardNumber} onChange={handleCardNumberChange} onBlur={validate} className={errors?.cardNumber ? "!text-red900 input" : "input"} placeholder="1234 1234 1234 1234" maxLength={19} // 16 digits + 3 spaces 
        autoComplete="cc-number"/>   
      </div>

      <div className="form-control max-w-[84px] lg:max-w-[100px]">
        <label className="label">Expires</label>

        <input type="text" name="expiryDate" value={expiryDate} onChange={handleExpiryDateChange} onBlur={validate} placeholder="MM/YY" className={errors?.expiryDate ? "!text-red900 input max-w-[100px]" : "input max-w-[100px]"} maxLength={5} // MM/YY
        autoComplete="cc-exp"/>
      </div>

      <div className="form-control max-w-[84px] lg:max-w-[100px]">
        <label className="label">CVC</label>

        <input type="text" name="cvc" placeholder="CVC" value={cvc} onChange={handleCvcChange} onBlur={validate} className={errors?.cvc ? "!text-red900 input max-w-[100px]" : "input max-w-[100px]"} maxLength={3} // 3 digits
        autoComplete="cc-csc"/>
      </div>

    </div>
  )
}


export default CreditInput;
