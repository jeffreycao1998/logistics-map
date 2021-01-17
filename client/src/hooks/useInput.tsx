import React, { useState } from 'react';
import styled from 'styled-components';
import shortid from 'shortid';

const Container = styled.div`
  display: flex;
  flex-direction: column;

  label {
    padding-bottom: 12px;
    font-size: 14px;
  }

  input {
    padding: 5px 12px;
    border: 1px solid lightgrey;
    border-radius: 3px;
    overflow: hidden;
    font-size: 14px;
    line-height: 1.35;
  }

  textarea {
    padding: 8px;
    border: 1px solid lightgrey;
    border-radius: 3px;
    overflow: hidden;
    font-size: 14px;
    line-height: 1.35;
    resize: none;
    min-height: 150px;
    overflow-y: auto;
  }
`;

type Props = {
  name: string
  type: string
  placeholder?: string
  initialValue?: string
}

const useInput = ({ name, type, placeholder, initialValue }: Props) => {
  const [value, setValue] = useState(initialValue ? initialValue : '');

  const randomId = shortid.generate();

  const input = (
    <Container>
      <label htmlFor={randomId}>{name}</label>
      <input id={randomId} value={value} onChange={e => setValue(e.target.value)} type={type} placeholder={placeholder}/>
    </Container>
  );
  
  const textarea = (
    <Container>
      <label htmlFor={name}>{name}</label>
      <textarea id={name} value={value} onChange={e => setValue(e.target.value)} placeholder={placeholder}/>
    </Container>
  );

  if (type === 'textarea') {
    return [value, textarea]
  } else {
    return [value, input]
  }
};

export default useInput;